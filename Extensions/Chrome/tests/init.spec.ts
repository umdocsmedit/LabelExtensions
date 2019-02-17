/*
 * Filename: init.spec.ts
 * Author: Kevin Davis
 * Date: Jan 29, 2019
 *
 * Description
 * Test specification for the init methods for the background script
 */

// ===========================================================================

import * as chrome from 'sinon-chrome' 
import * as assert from 'assert'
import * as init from '../src/init'

declare interface Global {
	chrome: any;
	name: string;
}

declare let global: Global

describe('init.ts', () => {

	before(() => {
		global.chrome = chrome;
	});

	it('should call the start function to setup a listener', () => {
		init.start();
		assert.ok(chrome.runtime.onInstalled.addListener.calledOnce, 'addListener should be called');
		assert.ok(true);
	});
});
