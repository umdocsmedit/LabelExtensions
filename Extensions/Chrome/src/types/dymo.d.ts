/*
 * Filename: dymo.d.ts
 * Author: Kevin Davis
 * Date: Dec 22,2018
 *
 * Description
 * Declaration file for dymo
 */
// ==================================================================

declare namespace dymo {
	namespace label {
		namespace framework {
			function getPrinters(): dymo.Printer[];
			function openLabelXml(xml: string): dymo.Label;
			function init(callback: () => void): void;
		}
	}

	class Label {
		print(printerName: string): void;
	}

	class Printer {
		isConnected: boolean;
		name: string;
	}
}
