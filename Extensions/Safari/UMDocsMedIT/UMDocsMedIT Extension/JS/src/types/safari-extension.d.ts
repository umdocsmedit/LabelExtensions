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
		function dispatchMessage(messageName: string, data?: any): void;
	}

	namespace self {
		type eventCallback = (event: SafariExtensionMessageEvent) => void;
		function addEventListener(eventType: string, callback: eventCallback): void;
	}
}

interface SafariExtensionMessageEvent {
	type: string | undefined;
	name: string | undefined;
	message: any | undefined;
}
