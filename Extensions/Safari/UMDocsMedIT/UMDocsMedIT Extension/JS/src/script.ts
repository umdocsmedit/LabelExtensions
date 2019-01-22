/*
 * Filename: script.ts
 * Author: Kevin Davis
 * Date: Jan. 21, 2019
 *
 * Description
 * Script for communication between page and extension
 */

/// <reference path="./types/safari-extension.d.ts" />

// ==================================================================

import PatientRecord from "./PatientRecord"

document.addEventListener("DOMContentLoaded", (): void => {
	safari.extension.dispatchMessage("Hello, World!");
});

safari.self.addEventListener("message", (event: SafariExtensionMessageEvent): void => {
	switch(event.name) {
		case "getPatientData":
			sendPatientData();
			break;
		default:
			console.log(`${event.name} unrecognized message name`);
	}
});

function sendPatientData(): PatientRecord {

	let patientData: PatientRecord;

	try {
		patientData = new PatientRecord();
	} catch(e) {
		patientData = new PatientRecord(true);
	}

	safari.extension.dispatchMessage("patientData", {data: patientData});

	return patientData;
}
