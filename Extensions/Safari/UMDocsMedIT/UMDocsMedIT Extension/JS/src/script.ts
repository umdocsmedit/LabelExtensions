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

document.addEventListener("DOMContentLoaded", (): void => {
	safari.extension.dispatchMessage("Hello, World!");
});

safari.self.addEventListener("message", (): void => {
	// DO SOMETHING!
});
