/*
 * Filename: Background.ts
 * Author: Kevin Davis
 * Date: Dec 20, 2018
 *
 * Description
 * This file functions as the background script for the chrome web browser
 * extension
 */
//===========================================================================

chrome.runtime.onInstalled.addListener((): void => {

	let pageStateMatcherOptions: chrome.declarativeContent.PageStateMatcher = {
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
});
