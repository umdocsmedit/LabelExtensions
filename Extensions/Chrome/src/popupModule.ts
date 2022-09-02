/*

 * Author: Kevin Davis
 * Date: February 20, 2019
 *
 * Description
 * This module separates out the functions of the popup file
 */

/// <reference types="./types/dymo" />

// ==================================================================

declare let dymo: any;

/**
 * loadScript
 *
 * Loads the given javascript file into the DOM of the popup
 * @param string src - The path to the script
 * @return object - the dymo object from the DYMO library
 */
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

/**
 * loadAppropriateFramework
 *
 * DYMO label printer comes with a javascript library for dynamically accessing
 * the DYMO printer over local TCP/IP ports. By default, the library attempts
 * to connect to the printer using the localhost url. However, some operating
 * systems and computers do not recognize localhost, but using the numerical
 * equivlent of "localhost" (i.e., 127.0.0.1) works. This function probes the
 * user's computer to determine which URL is appropriate.
 */
export async function loadAppropriateFramework(): Promise<void> {

	// localhost library
	let dymoScript1: string = "../js/DYMO.Label_.Framework.2.0.2.js";
	// 127.0.0.1 library
	let dymoScript2: string = "../js/DYMO.Label_.Framework.2.0.2r.js";

	let _frameworkSet: Promise<number> = new Promise((resolve): void => {
		chrome.storage.sync.get(['frameworkSet'], (res: any): void => {
			if(res.frameworkSet == undefined) 
				resolve(0);
			else 
				resolve(res.frameworkSet);
		});
	});

	let frameworkSet: number = await _frameworkSet;
	console.log(`FrameworkSet = ${frameworkSet}`);

	if(frameworkSet == 0) {
        console.log("No framework preference set");

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
		chrome.storage.sync.set({'frameworkSet': frameworkSet}, ()=>{
			console.log(`Framework SET = ${frameworkSet}`)
		});
	}	
	else if(frameworkSet == 1) {
		dymo = await loadScript(dymoScript1);
		console.log("Connected to localhost from stroage.")
	}
	else if(frameworkSet == 2) {
		dymo = await loadScript(dymoScript2);
		console.log("Connected to 127.0.0.1 from stroage.")
	}
	return;
}
