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

/// <reference path="./types/healthFair.d.ts" />
/// <reference path="./types/patientRecord.d.ts" />
/// <reference path="./types/dymo.d.ts" />

// ===========================================================================

import * as templates from "./templates"

export function frameworkInitShim(patientRecord: PatientRecord, numlabels: number, labsordered: string): void {
	let startupCode: () => void = (): void => {
		print(patientRecord, numlabels, labsordered);
	};
	dymo.label.framework.init(startupCode);
}

export function print(patientRecord: PatientRecord, numlabels: number, labsordered: string): void {

	let printers: dymo.Printer[] = dymo.label.framework.getPrinters();
	if(printers.length == 0) {
		throw alert("No printers found");
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
		throw alert("No Printers connected");
	}

	let labelXml: string = templates.labelTemplate(patientRecord, labsordered);
	let nameXml: string = templates.nameTemplate(patientRecord);

	let label: dymo.Label = dymo.label.framework.openLabelXml(labelXml);
	let label2: dymo.Label = dymo.label.framework.openLabelXml(nameXml);

	//label.print(chosenPrinter.name);
	//label2.print(chosenPrinter.name);

	for(let i = 0; i < numlabels; i++) {
		label.print(chosenPrinter.name);
		label2.print(chosenPrinter.name);
	}

	return;
}
