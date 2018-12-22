/*
 * Filename: patientRecord.d.ts
 * Author: Kevin Davis
 * Date: Dec 21, 2018
 *
 * Description
 * Declaration file for patient records
 */
// ==================================================================

interface PatientRecord {
	healthFair: Healthfair;
	firstname: string | null;
	lastname: string | null;
	middleinitial: string | null;
	DOB: string | null;
	MRN: number;
	sex: string | null; 
	street: string | null;
	appartment: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
	phonenumber: string | null;
}
