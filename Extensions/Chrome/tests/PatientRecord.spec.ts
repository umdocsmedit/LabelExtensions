/*
 * Filename: PatientRecord.spec.ts
 * Author: Kevin Davis
 * Date: February 17, 2019
 *
 * Description
 * Test file for the PatientRecord object
 */

// ==================================================================

import * as chrome from 'sinon-chrome' 
import * as assert from 'assert'
import PatientRecord from '../src/PatientRecord'
import * as fs from 'fs'

// LOAD THE DOM FOR TESTING
let domFilePath: string = './tests/testIHA.html';
let domHTML: string = fs.readFileSync(domFilePath).toString();
require('jsdom-global')(domHTML);

describe('PatientRecord', () => {

	chrome;

	let pr: PatientRecord = new PatientRecord(true);
	
	describe('constructor', () => {
		it('should full construct the PatientRecord from the current page', () => {
			// Dependant on convertArmToHealthFairName
		});
	});

	describe('convertArmToHealthFairName', () => {
		it('should convert 1 to a healthFair identifier that represents the LHHF', () => {
			let input: number = 1;
			let expectedOutput: PatientRecord.Healthfair = PatientRecord.Healthfair.LHHF;
			let observedOutput: PatientRecord.Healthfair = pr.convertArmToHealthFairName(input);

			assert.equal(observedOutput, expectedOutput);
		});

		it('should convert 10 to LOW', () => {
			let input: number = 10;
			let expectedOutput: PatientRecord.Healthfair = PatientRecord.Healthfair.LOW;
			let observedOutput: PatientRecord.Healthfair = pr.convertArmToHealthFairName(input);

			assert.equal(observedOutput, expectedOutput)
		});
	});

	describe('getArm', () => {
		it('should return the number corresponding to the current arm of the current patient', () => {
			let expectedOutput: number = 11;
			let observedOutput: number = pr.getArm();
			assert.equal(observedOutput, expectedOutput);
		});
	});

	describe('getGenericValue', () => {
		it('should give us back the value of an input identifier of the given named element', () => {
			let input: string = 'first_name';
			let expectedOutput: string = 'Cornelius';
			let observedOutput: string | null = pr.getGenericValue(input);

			assert.equal(expectedOutput, observedOutput);

			input = 'last_name';
			expectedOutput = 'Buffoon';
			observedOutput = pr.getGenericValue(input);
			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getMRN', () => {
		it('should return the MRN for the current patient being viewed', () => {
			let expectedOutput: number = 23606;
			let observedOutput: number = pr.getMRN();

			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getState', () => {
		it('should return the appropriate state letters when supplied with the state name', () => {
			let expectedOutput: string = "FL";
			let observedOutput: string | null = pr.getState();
			assert.equal(expectedOutput, observedOutput);
		});
	});

	describe('getSex', () => {
		it('should return the letter respresentation for the patient\'s sex', () => {
			let expectedOutput: string = 'F';
			let observedOutput: string = pr.getSex();
			assert.equal(expectedOutput, observedOutput);
		});
	});
});
