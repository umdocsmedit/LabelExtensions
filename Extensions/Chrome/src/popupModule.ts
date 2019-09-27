/*
 * Filename: popupModule.ts
 * Author: Kevin Davis
 * Date: February 20, 2019
 *
 * Description
 * This module separates out the functions of the popup file
 */

/// <reference types="./types/dymo" />

// ==================================================================

declare let dymo: any;

export async function loadScript(src: string): Promise<any> {
	let output: HTMLElement | null = document.getElementById("output");
	
	let scriptObj: Promise<any> = new Promise((resolve): void => {
		if(output == null) return;
		let newScript: HTMLScriptElement | null = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.innerHTML = "";
		newScript.src = src;
		newScript.onload = () => {
			resolve(dymo);
		};
		output.innerHTML = "";
		output.appendChild(newScript);
	});

	return await scriptObj;
}

export async function testServer(host: string, port: number): Promise<boolean> {

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

export async function checkConnection(): Promise<number> {


	console.log(`Proping the test server for a port on `);
	let connectionEstablished: boolean = await determinePort("localhost");
	if(connectionEstablished) return 1;

	connectionEstablished = await determinePort("127.0.0.1");
	if(connectionEstablished) return 2;

	console.error('Failed to establish a connection to the DYMO Web server!');
	return 0;
}

export async function determinePort(host: string): Promise<boolean> {

	let port: number = 0;
	const startingTestPort: number = 41951;
	const endingTestPort: number = 41960;
	for(let curTestPort: number = startingTestPort; curTestPort <= endingTestPort; curTestPort++) {
		let result: boolean = await testServer(host, curTestPort);
		if(result) {
			port = curTestPort;
			break;
		}
	}
	
	return port != 0;
}

export async function loadAppropriateFramework(): Promise<void> {

	// localhost
	let dymoScript1: string = "../js/DYMO.Label_.Framework.2.0.2.js";
	// 127.0.0.1
	let dymoScript2: string = "../js/DYMO.Label_.Framework.2.0.2r.js";

	// start with first script
	// dymo is a global var
	dymo = await loadScript(dymoScript1);

	// test current frameork
	let frameworkSet: number = await checkConnection();

	if(frameworkSet == 1) console.log("Successfully check connection at http://localhost/")
	//
	// TODO: don't use magic numbers, change this to an enumeration or something
	if(frameworkSet == 2) {
		console.log("Successfully check connection at http://127.0.0.1/")
		dymo = await loadScript(dymoScript2);
	}

	return;
}
