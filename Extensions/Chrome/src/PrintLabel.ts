/*
 * Filename: PrintLabel.ts
 * Author: Unkown
 * Edited: Kevin Davis
 * Date: Dec 21, 2018
 *
 * Description
 * Functions for obtaining data from the RedCap website and porting it to the
 * DYMO labeler
 */

/// <reference path="./types/dymo.d.ts" />

// ===========================================================================

import * as templates from "./templates"
import PatientRecord from "./PatientRecord"

export function frameworkInitShim(patientRecord: PatientRecord, numlabels: number, labsordered: string, labelsize: string): void {
	let startupCode: () => void = (): void => {
		print(patientRecord, numlabels, labsordered, labelsize);
	};
	dymo.label.framework.init(startupCode);
}

export async function print(patientRecord: PatientRecord, numlabels: number, labsordered: string, labelsize: string): Promise<void> {

	let printers: dymo.Printer[] = dymo.label.framework.getPrinters();
	if(printers.length == 0) {
		throw alert("No printers found: Could not connect to DYMO web service");
	}

	let chosenPrinter: dymo.Printer | null = null;
	for(let n: number = 0; n < printers.length; n++) {
		let printer: dymo.Printer = printers[n];
		if(printer.isConnected) {
			chosenPrinter = printer;
			break;
		}
	}

	if(chosenPrinter == null) {
		throw alert("No Printers connected, but connected to DYMO web service");
	}

	let labelXml: string = "";
	if(labsordered != 'Pap smear') {
		labelXml = await templates.getTemplate(patientRecord, "crc", labsordered, labelsize);
	}
	else {
		labelXml = await templates.getTemplate(patientRecord, "female", labsordered, labelsize);
	}

	//let label: dymo.Label = dymo.label.framework.openLabelXml(labelXml);
	let label: dymo.Label = dymo.label.framework.openLabelXml(labelXml);

	for(let i = 0; i < numlabels; i++) {
		label.print(chosenPrinter.name);
	}

	return;
}
