/*
 * Filename: popup.ts
 * Author: Kevin Davis
 * Date: Dec 21, 2018
 *
 * Description
 * Script to control the extension popup
 */

/// <reference types="./types/dymo" />

//===============================================================================

declare let dymo: any;


import * as PrintLabel from './PrintLabel'
import PatientRecord from './PatientRecord'

async function init(): Promise<void> {
	let dymoScript1: string = "../js/DYMO.Label_.Framework.2.0.2.js";
	let dymoScript2: string = "../js/DYMO.Label_.Framework.2.0.2r.js";

	// start with first script
	dymo = await loadScript(dymoScript1);

	let frameworkSet: number = await checkConnection();

	// TODO: don't use magic numbers, change this to an enumeration or something
	if(frameworkSet == 2) {
		dymo = await loadScript(dymoScript2);
	}

	let printButton: HTMLInputElement | null = <HTMLInputElement>document.getElementById('print');
	let numLabelsField: HTMLInputElement | null = <HTMLInputElement>document.body.querySelector("[name='numlabels']");
	let labsOrderedField: HTMLSelectElement | null = <HTMLSelectElement>document.getElementById('labsordered');

	if(printButton == null) {
		alert("Cannot locate print button");
		return;
	}

	if(numLabelsField == null) {
		alert("Cannot located num label field");
		return;
	}

	if(labsOrderedField == null) {
		alert("Cannot locate labs ordered field");
		return;
	}

	numLabelsField.onblur = (e: Event):void =>{
		if(e == null) return;
		let element: HTMLInputElement = <HTMLInputElement>e.target;
		store('numlabel', element);
	};

	labsOrderedField.onblur = (e: Event): void => {
		if(e == null) return;
		let element: HTMLInputElement = <HTMLInputElement>e.target;
		store('labsordered', element);
	};

	// Check storage
	let numLabels: number = await new Promise((resolve) => {
		chrome.storage.sync.get(['numlabel'], (res)=>{
			if(res.numlabel == undefined) resolve(getNumLabels());
			else resolve(res.numlabel); 
		});
	});

	let labsOrdered: string = await new Promise((resolve) => {
		chrome.storage.sync.get(['labsordered'], (res)=>{
			if(res.labsordered == undefined) resolve(getLabsOrdered());
			else resolve(res.labsordered);
		});
	});

	// Set fields
	setNumLabels(numLabels);
	setLabsOrdered(getLabsOrderedStringIndex(labsOrdered));

	let patientData: PatientRecord = await getPatientData();

	printButton.onclick = (): void => {
		numLabels = getNumLabels();
		labsOrdered = getLabsOrdered();
		PrintLabel.frameworkInitShim(patientData, numLabels, labsOrdered);
	};

	listPatient(patientData);

	// Enable the print button
	if(patientData.firstname != null) {
		printButton.disabled = false;
		printButton.className = "btn btn-success";
	}

	return;
}

async function loadScript(src: string): Promise<any> {
	let output: HTMLElement | null = document.getElementById("output");
	
	let scriptObj: Promise<any> = new Promise((resolve): void => {
		if(output == null) return;
		let newScript: HTMLScriptElement | null = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.innerHTML = "";
		newScript.src = src;
		newScript.onload = () => {
			console.log(`HEY: ${dymo}`)
			resolve(dymo);
		};
		output.innerHTML = "";
		output.appendChild(newScript);
	});

	return await scriptObj;
}

async function checkConnection(): Promise<number> {
	console.log("N");
	let port: number = 0;
	const startingTestPort: number = 41951;
	const endingTestPort: number = 41960;

	for(let curTestPort: number = startingTestPort; curTestPort <= endingTestPort; curTestPort++) {
		let result: boolean = await testServer(true, curTestPort);
		if(result) {
			port = curTestPort;
			break;
		}
	}

	console.log(port);

	if(port != 0) return 1;

	for(let curTestPort: number = startingTestPort; curTestPort <= endingTestPort; curTestPort++) {
		let result: boolean = await testServer(false, curTestPort);
		if(result) {
			port = curTestPort;
			break;
		}
	}

	console.log(port);
	if(port != 0) return 2;

	return 0;
}

async function testServer(localhostFlag: boolean, port: number): Promise<boolean> {

	const host: string = localhostFlag ? "localhost" : "127.0.0.1";

	let result: Promise<boolean> = new Promise((resolve): void => {
		let connectionXHR: XMLHttpRequest = new XMLHttpRequest();
		let connectionURL: string = `https://${host}:${port}/DYMO/DLS/Printing/StatusConnected`;
		connectionXHR.onreadystatechange = function() {
			if(this.readyState == 4) {
				resolve(this.status == 200);
			}
		};
		connectionXHR.open("GET", connectionURL, true);
		try {
			connectionXHR.send();
		}
		catch(e) {
			resolve(false);
		}
	}); 

	return await result;
}

function listPatient(patientRecord: PatientRecord): void {
	console.log("PatientRECORDS");

	let patientFound: boolean = patientRecord.firstname != null;
	let displayText: string = patientFound?`${patientRecord.firstname} ${patientRecord.lastname}`:"No patient data found";
	let patientLabel: HTMLElement | null = document.getElementById("patientName");
	if(patientLabel == null) {
		console.error("Failed to find the patient label");
		return;
	}

	patientLabel.innerHTML += ` ${displayText}`;
	return;
}

async function getCurrentTabID(): Promise<number> {
	let queryOptions: chrome.tabs.QueryInfo = {
		active: true,
		currentWindow: true
	};

	let result: Promise<number> = new Promise((resolve): void => {
		chrome.tabs.query(queryOptions, (tabs): void => {
			let currentTab = tabs[0];
			if(currentTab.id == undefined) {
				resolve(-1);
			}
			resolve(currentTab.id);
		});
	});

	return await result;
}

async function getPatientData(): Promise<PatientRecord> {

	// generate the listen fuction
	let promiseFunction: (x: any, y: any)=> Promise<void> = async function(resolve, reject): Promise<void> {

		chrome.runtime.onMessage.addListener((request): void => {
			let patientRecord: PatientRecord = request.data;
			let err: string = request.err;
			resolve(patientRecord);
			if(err != "") {
				reject(err);
			}
		});

		// Inject script
		let currentTabID: number = await getCurrentTabID();
		let scriptOptions: chrome.tabs.InjectDetails = {
			file: "./js/contentScript.js"
		};

		chrome.tabs.executeScript(currentTabID, scriptOptions);
	};

	let result: Promise<PatientRecord> = new Promise(promiseFunction);
	
	return await result;
}

function getNumLabels(): number {

	let result: number = 0;

	let numLabelsInput: HTMLInputElement | null = document.body.querySelector("[name='numlabels']");
	if(numLabelsInput == null) {
		console.error("Failed to get the number of lables to print");
		return result;
	}

	result = parseInt(numLabelsInput.value);
	return result;
}

function setNumLabels(numLabels: number): void {
	
	let numLabelsInput: HTMLInputElement | null = document.body.querySelector("[name='numlabels']");
	if(numLabelsInput == null) {
		console.error("Failed to get the number of labels to print");
		return;
	}

	numLabelsInput.value = numLabels.toString();
	return;
}

function getLabsOrdered(): string {
	let result: string = "";
	let labsOrderedInput: HTMLSelectElement | null = document.body.querySelector("[name='labsordered']");
	if(labsOrderedInput == null) {
		console.error("Failed to get the value of the labs ordered element");
		return result;
	}

	result = labsOrderedInput.value;
	return result;
}

function getLabsOrderedStringIndex(label: string): number {
	let result: number = 0;
	let labsOrderedInput: HTMLSelectElement | null = document.body.querySelector("[name='labsordered']");
	if(labsOrderedInput == null) {
		console.error("Failed to get the value of the labs ordered element 2");
		return result;
	}

	for(let i = 0; i < labsOrderedInput.options.length; i++) {
		let curValue: string = labsOrderedInput.options[i].value;
		if(curValue == label) result = i;
	}

	return result;
}

function setLabsOrdered(selectIndex: number): void {

	let labsOrderedInput: HTMLSelectElement | null = document.body.querySelector("[name='labsordered']");
	if(labsOrderedInput == null) {
		console.error("Failed to get the value of the labs ordered element");
		return;
	}

	labsOrderedInput.selectedIndex = selectIndex;
	return;
}

function store(varName: string, e: HTMLInputElement): void {
	let value: any = e.value;
	let storage: any = {};
	storage[varName] = value;
	chrome.storage.sync.set(storage, ()=>{
		console.log(`${value} set`);
	});

	return;
}

init();
