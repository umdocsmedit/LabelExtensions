/*
 * Filename: gatherData.ts
 * Author: Kevin Davis
 * Date: Febrary, 17, 2019
 *
 * Description
 * Used hold the functions used by the contentScript.ts
 */

// ==================================================================

import PatientRecord from './PatientRecord'

export function gatherData(): void {
	let patientRecord: PatientRecord;
	try {
		patientRecord = new PatientRecord();
		console.log('done');
	} catch(e) {
		console.error(`Failed to get patient Data: ${e}`)
		patientRecord = new PatientRecord(true);
	}
	console.log(patientRecord);

	chrome.runtime.sendMessage({data: patientRecord}, ()=>{});
}
