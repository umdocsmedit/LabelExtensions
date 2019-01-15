/*
 * Filename: popup.ts
 * Author: Kevin Davis
 * Date: Dec 21, 2018
 *
 * Description
 * Script to control the extension popup
 */
//===============================================================================

import * as PrintLabel from './PrintLabel'

async function init(): Promise<void> {

	let printButton: HTMLElement | null = document.getElementById('print');

	if(printButton == null) {
		alert("Cannot locate print button");
		return;
	}

	let numLabels: number = getNumLabels();
	let labsordered: string = getLabsOrdered();
	setNumLabels(numLabels*2);
	setLabsOrdered(0);

	labsordered;
	
	printButton.onclick = (): void => {
		alert("NOICE");
	};

	PrintLabel;

	let patientData: PatientRecord = await getPatientData();

	listPatient(patientData);

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

function setLabsOrdered(selectIndex: number): void {

	let labsOrderedInput: HTMLSelectElement | null = document.body.querySelector("[name='labsordered']");
	if(labsOrderedInput == null) {
		console.error("Failed to get the value of the labs ordered element");
		return;
	}

	labsOrderedInput.selectedIndex = selectIndex;
	return;
}

init();
