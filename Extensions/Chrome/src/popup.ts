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

import * as PrintLabel from './PrintLabel'
import PatientRecord from './PatientRecord'
import * as popup from './popupModule'

async function init(): Promise<void> {

	popup.loadAppropriateFramework();

	let printButton: HTMLInputElement | null = <HTMLInputElement>document.getElementById('print');
	let numLabelsField: HTMLInputElement | null = <HTMLInputElement>document.body.querySelector("[name='numlabels']");
	let labsOrderedField: HTMLSelectElement | null = <HTMLSelectElement>document.getElementById('labsordered');
    let labelSizeField: HTMLSelectElement | null = <HTMLSelectElement>document.getElementById('labelsize');

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

    if (labelSizeField == null) {
        alert("Cannot locate the label size field");
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

    labelSizeField.onblur = (e: Event): void => {
        if (e == null) return;
        let element: HTMLInputElement = <HTMLInputElement>e.target;
        store('labelsize', element);
    }

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

    let labelSize: string = await new Promise((resolve) => {
        chrome.storage.sync.get(['labelsize'], (res) => {
            if (res.labelsize == undefined) resolve(getLabelSize());
            else resolve(res.labelsize);
        });
    });

	// Set fields
	setNumLabels(numLabels);
	setLabsOrdered(getLabsOrderedStringIndex(labsOrdered));
    setLabelSize(getLabelSizeStringIndex(labelSize));

	let patientData: PatientRecord = await getPatientData();

	printButton.onclick = (): void => {
		numLabels = getNumLabels();
		labsOrdered = getLabsOrdered();
        labelSize = getLabelSize();
		PrintLabel.frameworkInitShim(patientData, numLabels, labsOrdered, labelSize);
	};

	listPatient(patientData);

	// Enable the print button
	if(patientData.firstname != null) {
		printButton.disabled = false;
		printButton.className = "btn btn-success";
	}

	return;
}

function listPatient(patientRecord: PatientRecord): void {

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
        let injectionTarget: chrome.scripting.InjectionTarget = {
            tabId: currentTabID
        };
		let scriptOptions: chrome.scripting.ScriptInjection<any, void> = {
			files: ["./js/contentScript.js"],
            target: injectionTarget
		};

		chrome.scripting.executeScript(scriptOptions);
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

function getLabelSize(): string {
    let result: string = "";
    let labelSizeInput: HTMLSelectElement | null = document.body.querySelector("[name='labelsize']");
    if (labelSizeInput == null) {
        console.error("Failed to get the value of the label size element");
        return result;
    }

    result = labelSizeInput.value;
    return result;
}

function getLabelSizeStringIndex(label: string): number {
	let result: number = 0;
	let labelSizeInput: HTMLSelectElement | null = document.body.querySelector("[name='labelsize']");
	if (labelSizeInput == null) {
		console.error("Failed to get the value of the label size element index");
		return result;
	}

	for(let i = 0; i < labelSizeInput.options.length; i++) {
		let curValue: string = labelSizeInput.options[i].value;
		if(curValue == label) result = i;
	}

	return result;
}

function setLabelSize(selectIndex: number): void {

	let labelSizeInput: HTMLSelectElement | null = document.body.querySelector("[name='labelsize']");
	if (labelSizeInput == null) {
		console.error("Failed to get the value of the label size element");
		return;
	}

	labelSizeInput.selectedIndex = selectIndex;
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
