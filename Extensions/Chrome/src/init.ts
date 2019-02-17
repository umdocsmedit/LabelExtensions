/*
 * Filename: init.ts
 * Author: Kevin Davis
 * Date: Feb 17, 2019
 *
 * Description
 * In order to create propert test modules, we'll split apart the background js functions here
 */

// ==================================================================

export function loadExtension(): void {
	
	// check url's that match redcap.miami.edu
	let pageStateMatcherOptions: chrome.declarativeContent.PageStateMatcherProperties = {
		pageUrl: {
			hostEquals: 'redcap.miami.edu'
		}
	};

	// add a rule that uses our match (aka redcap.miami.edu) and ensure our extension only
	// runs when visiting this page
	let pageRestrictionRule: chrome.events.Rule = {
		conditions: [
			new chrome.declarativeContent.PageStateMatcher(pageStateMatcherOptions)
		],
		actions: [ new chrome.declarativeContent.ShowPageAction() ]
	};

	// add the rule to our list of rules
	let rules: chrome.events.Rule[] = [pageRestrictionRule];
	chrome.declarativeContent.onPageChanged.addRules(rules);

	return;
}

export function start(): void {
	chrome.runtime.onInstalled.addListener(loadExtension);
}

module.exports = {loadExtension, start};
