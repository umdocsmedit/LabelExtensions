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

export async function parseFrac(num: string): Promise<number> {
    let components: string[] = num.split(" ");
    if (components.length > 2) throw "parseFrac recieved more than two componetns";

    let whole: string = components[0];
    let frac: string = components.length == 1 ? "0/1" : components[1];
    let fracComps: string[] = frac.split("/");
    let fracNum: string = fracComps[0];
    let fracDem: string = fracComps[1];
    let iWhole: number = parseInt(whole);
    let iFrac: number = parseInt(fracNum) / parseInt(fracDem);
    let result: number = iWhole + iFrac;
    return result;
}

/**
 * convertLabelSize
 *
 * The string coming in is in the following format: #[ #/#]" x #[ #/#]", where
 * the square brackets indicate optional components. This is converted into #x#
 * and used to locate the label file
 * @param string labelsize - input
 * @return string - converted
 */
export async function convertLabelSize(labelsize: string): Promise<string> {
    let sizeComponents: string[] = labelsize.split(" x ");
    let widthStr: string = sizeComponents[0];
    let heightStr: string = sizeComponents[1];
    let width: number = await parseFrac(widthStr);
    let height: number = await parseFrac(heightStr);
    let result: string = `${width}x${height}`;
    return result;
}

export async function getTemplate(p: PatientRecord, labelType: string, labsordered: string, labelsize: string): Promise<string> {
	let context = loadContext(p, labsordered);
    let labelSize: string = await convertLabelSize(labelsize);
    let labelURLStr: string = `labels/${labelType}-${labelSize}.label`;
	const labelURL: string = chrome.runtime.getURL(labelURLStr);

	let request: XMLHttpRequest = new XMLHttpRequest();
	request.open('GET', labelURL, false);
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
