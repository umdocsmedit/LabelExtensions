/*
 * Filename: gatherData.spec.ts
 * Author: Kevin Davis
 * Date: February 19, 2019
 *
 * Description
 * Specification test for the gatherData script
 */

// ==================================================================

import * as chrome from 'sinon-chrome' 
import * as assert from 'assert'
import * as gd from '../src/gatherData';

// Add Chrome to Global scope for proper testing
declare interface Global {
	chrome: any;
}

declare let global: Global;

describe('gatherData', () => {

	before(() => {
		global.chrome = chrome;
	});

	it('should call the chrome runtime sendmessage function', () => {
		gd.gatherData();
		assert.ok(chrome.runtime.sendMessage.calledOnce);
	});
});
