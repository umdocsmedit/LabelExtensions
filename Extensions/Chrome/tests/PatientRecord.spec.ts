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

	describe('getGenericValue', () => {
		it('should give us back the value of an input identifier of the given named element', () => {
			let input: string = 'first_name';
			let expectedOutput: string = 'Maria';
			let observedOutput: string | null = pr.getGenericValue(input);

			assert.equal(expectedOutput, observedOutput);
		});
	});

});
