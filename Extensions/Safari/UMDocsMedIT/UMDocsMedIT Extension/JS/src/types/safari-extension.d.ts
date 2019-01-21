/*
 * Filename: safari-extension.d.ts
 * Author: Kevin Davis
 * Date: Jan. 21, 2019
 *
 * Description
 * Declaration file for safari browser module
 */

// ==================================================================

declare namespace safari {
	namespace extension {
		function dispatchMessage(data: any): void;
	}

	namespace self {
		type eventCallback = (event: Event) => void;
		function addEventListener(eventType: string, callback: eventCallback): void;
	}
}
