/*
 * Filename: templates.ts
 * Author: Kevin Davis
 * Date: Dec 22, 2018
 *
 * Description
 * Ports xml print templates into javascript strings for injection into the page
 */

// ==================================================================

import PatientRecord from './PatientRecord'

async function renderTemplate(context: any, template: string): Promise<string> {
	let result: Promise<string> = new Promise((resolve): void => {
		let sandbox: HTMLIFrameElement | null = <HTMLIFrameElement>document.getElementById("sandboxFrame");
		if(sandbox == null) return resolve("");
		sandbox = <HTMLIFrameElement>sandbox;
		let message = {
			command: 'render',
			context: context,
			template: template
		};
		let sandboxContentWindow: Window | null = sandbox.contentWindow;
		if (sandboxContentWindow == null) return resolve('');
		window.addEventListener('message', (event) => {
			resolve(event.data.message);
		});
		sandboxContentWindow.postMessage(message, '*');
	});

	return await result;
}

function loadContext(p: PatientRecord, labsordered: string): any {
	let timestamp: string = new Date().toLocaleDateString('en-US', {'hour12': true, 'hour': '2-digit', 'minute': '2-digit'});
	let context = {
		lastname: p.lastname,
		firstname: p.firstname,
		middleinitial: p.middleinitial,
		MRN: p.MRN,
		DOB: p.DOB,
		phonenumber: p.phonenumber,
		street: p.street,
		apartment: p.apartment,
		city: p.city,
		state: p.state,
		zip: p.zip,
		site: p.healthFair,
		sex: p.sex,
		timestamp: timestamp,
		labsordered: labsordered
	}
	return context;
}

export async function crcTemplate(p: PatientRecord, labsordered: string): Promise<string> {
	let context = loadContext(p, labsordered);
	const label_url: string = chrome.runtime.getURL('labels/crc.label');
	let request: XMLHttpRequest = new XMLHttpRequest();
	request.open('GET', label_url, false);
	request.send(null);
	if(request.status === 200) {
		let label_template_text: string = request.responseText;
		let result: string = await renderTemplate(context, label_template_text);
		return result;
	}
	else {
		return '';
	}
}

export async function femaleTemplate(p: PatientRecord, labsordered: string): Promise<string> {
	let context = loadContext(p, labsordered);
	const label_url: string = chrome.runtime.getURL('labels/female.label');
	let request: XMLHttpRequest = new XMLHttpRequest();
	request.open('GET', label_url, false);
	request.send(null);

	if(request.status === 200) {
		let label_template_text: string = request.responseText;
		let result: string = await renderTemplate(context, label_template_text);
		return result;
	}
	else {
		return '';
	}
}
