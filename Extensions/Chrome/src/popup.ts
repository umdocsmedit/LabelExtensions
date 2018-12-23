/*
 * Filename: popup.ts
 * Author: Kevin Davis
 * Date: Dec 21, 2018
 *
 * Description
 * Script to control the extension popup
 */
//===============================================================================

async function init(): Promise<void> {

	let printButton: HTMLElement | null = document.getElementById('print');

	if(printButton == null) {
		alert("Cannot locate print button");
		return;
	}

	printButton.onclick = async (): Promise<void> => {
		let labsordered: number = getLabsOrdered();
		let injectableCode: string = await getInjectableCode();
		injectableCode = injectableCode.replace("//--INJECT--//", `PrintLabel.print(${labsordered})`);
		let currentTabID: number = await getCurrentTabID();
		let scriptOptions: chrome.tabs.InjectDetails = {
			code: injectableCode
		};

		await chrome.tabs.executeScript(currentTabID, scriptOptions);
	};

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

async function getInjectableCode(): Promise<string> {
	let result: Promise<string> = new Promise((resolve): void => {
		fetch('../js/inject.js').then((response) => {
			resolve(response.text());
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
