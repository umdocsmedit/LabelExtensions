/*
 * Filename: Background.ts
 * Author: Kevin Davis
 * Date: Dec 20, 2018
 *
 * Description
 * This file functions as the background script for the chrome web browser
 * extension
 */

/// <reference types="sinon-chrome" />

//===========================================================================

//declare interface Global {
	//chrome: any;
	//name: string;
//}

//declare let global: Global;

export function loadExtension(): void {
	let pageStateMatcherOptions: chrome.declarativeContent.PageStateMatcherProperties = {
		pageUrl: {
			hostEquals: 'redcap.miami.edu'
		}
	};

	let pageRestrictionRule: chrome.events.Rule = {
		conditions: [
			new chrome.declarativeContent.PageStateMatcher(pageStateMatcherOptions)
		],
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	};

	let rules: chrome.events.Rule[] = [pageRestrictionRule];

	chrome.declarativeContent.onPageChanged.addRules(rules);
	return;
}

export function main(): void {
	chrome.runtime.onInstalled.addListener(loadExtension);
}

main();

module.exports = {loadExtension, main};
