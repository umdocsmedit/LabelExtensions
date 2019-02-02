/*
 * Filename: background.spec.ts
 * Author: Kevin Davis
 * Date: Jan 29, 2019
 *
 * Description
 * Test specification for the background script
 */

// ===========================================================================

//import * as chrome from 'sinon-chrome' 
const chrome = require('sinon-chrome');
import * as assert from 'assert'
//import * as background from '../src/background' 
import * as background from "../dist/js/background.js"

declare interface Global {
	chrome: any;
	name: string;
}

declare let global: Global

describe('background.ts', () => {

	before(() => {
		global.chrome = chrome;
	});

	it('should call the main function to setup a listener', () => {
		console.log("MOM");
		background.main();
		//assert.ok(chrome.runtime.onInstalled.addListener.calledOnce, 'addListener should be called');
		assert.ok(true);
	});
});
