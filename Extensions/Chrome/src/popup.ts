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

	let labsordered: number = getLabsOrdered();
	printButton.onclick = async (): Promise<void> => {

		labsordered = getLabsOrdered();
		labsordered;

		let currentTabID: number = await getCurrentTabID();
		let scriptOptions: chrome.tabs.InjectDetails = {
			file: "./js/contentScript.js"
		};

		await chrome.tabs.executeScript(currentTabID, scriptOptions);
	};

	chrome.runtime.onMessage.addListener((request): void => {
		let patientRecord: PatientRecord = request.data;
		PrintLabel.frameworkInitShim(patientRecord, labsordered);
	});

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

function getLabsOrdered(): number {
	let result: number = 0;

	let labsOrderedInput: HTMLInputElement | null = document.body.querySelector("[name='labsordered']");
	if(labsOrderedInput == null) {
		console.error("Failed to get the number of labs ordered");
		return result;
	}

	result = parseInt(labsOrderedInput.value);
	return result;
}

init();
