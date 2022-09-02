/*
 * Filename: PatientRecord.ts
 * Author: Kevin Davis
 * Date: January 20, 2019
 * 
 * Description
 * This file is an object that will get the patient data
 */

// ==================================================================

interface Indexable {
    [key: string]: any
}

class PatientRecord {
	
	healthFair: PatientRecord.Healthfair | null = null;
	firstname: string | null = null;
	lastname: string | null = null;
	middleinitial: string | null = null;
	DOB: string | null = null;
	MRN: number | null = null;
	sex: string | null = null; 
	street: string | null = null;
	apartment: string | null = null;
	city: string | null = null;
	state: string | null = null;
	zip: string | null = null;
	phonenumber: string | null = null;

	constructor(blank: boolean = false) {
		if(blank) return;
		const hf: PatientRecord.Healthfair = this.convertArmToHealthFairName(this.getArm());

		this.healthFair = hf;
		this.firstname = this.getGenericValue("first_name");
		this.lastname = this.getGenericValue("last_name");
		this.middleinitial = this.getGenericValue("mi");
		this.DOB = this.getGenericValue("birthday");
		this.MRN = this.getMRN();
		this.sex = this.getSex();
		this.street = this.getGenericValue("street");
		this.apartment = this.getGenericValue("apartment");
		this.city = this.getGenericValue("city");
		this.state = this.getState();
		this.zip = this.getGenericValue("zip_code");
		this.phonenumber = this.getGenericValue("phone_number");

		this.filterUnderscores();
	}

    public getProperty(propertyName: string): any {
        return (this as Indexable)[propertyName];
    }

    public setProperty(propertyName: string, value: any): void {
        (this as Indexable)[propertyName] = value;
    }

	convertArmToHealthFairName(armNumber: number): PatientRecord.Healthfair {
		let result: PatientRecord.Healthfair = PatientRecord.Healthfair.LHHF; 
		switch (armNumber) {
			case 1:
				result = PatientRecord.Healthfair.LHHF;
				break;
			case 2:
				result = PatientRecord.Healthfair.HHF;
				break;
			case 3:
				result = PatientRecord.Healthfair.SDHF;
				break;
			case 4:
				result = PatientRecord.Healthfair.UKHF;
				break;
			case 5:
				result = PatientRecord.Healthfair.MTHF;
				break;
			case 6:
				result = PatientRecord.Healthfair.BPKHF;
				break;
			case 7:
				result = PatientRecord.Healthfair.KWHF;
				break;
			case 8:
				result = PatientRecord.Healthfair.JJHF;
				break;
			case 9:
				result = PatientRecord.Healthfair.LCHF;
				break;
			case 10:
				result = PatientRecord.Healthfair.LOW;
				break;
			case 11:
				result = PatientRecord.Healthfair.WKHF;
				break;
		}
		return result;
	}

	getArm(): number {
		let contextMsgElement: HTMLElement | null = document.body.querySelector("#contextMsg");
		if(contextMsgElement == null) {
			console.error("Failed to obtain arm: failed to get contextMsgElement");
			return -1;
		}

		let yellowElement: HTMLElement | null = contextMsgElement.querySelector(".yellow");
		if(yellowElement == null) {
			console.error("Failed to retreive an arm: failed to get yellowElement");
			return -1;
		}

		let potentialMatch: RegExpMatchArray | null = yellowElement.innerHTML.match(/\(Arm ([0-9]+):/i);
		if( (potentialMatch == null) || (potentialMatch.length < 2)) {
			console.error("Failed to match to the arm name: no match");
			return -1;
		}

		let armNumber: number = parseInt(potentialMatch[1]);

		return armNumber;
	}

	getGenericValue(valueName: string): string | null {
		let genericElement: HTMLInputElement | null = document.body.querySelector(`[name='${valueName}']`);
		if(genericElement != null) return genericElement.value;

		let potentialPipeElement: HTMLElement | null = document.body.querySelector(`[class$=${valueName}]`);
		if(potentialPipeElement != null) return potentialPipeElement.innerHTML; 

		let potentialPipeElement2: HTMLElement | null = document.body.querySelector(`[class$=${valueName}-label]`);
		if(potentialPipeElement2 != null) return potentialPipeElement2.innerHTML; 
		
		return null;
	}

	getState(): string | null {
		let stateSelector: HTMLSelectElement | null = document.body.querySelector("[name='state']");
		if(stateSelector == null) {
			let genericAttempt: string | null = this.getGenericValue("state");
			if(genericAttempt != null) return genericAttempt;
			console.error("Failed to get state: could not get the stateSelector");
			return null;
		}

		let stateNumString: string | null = stateSelector.value;
		if(stateNumString == null) {
			console.error("Failed to get state: could not get the current value of the stateSelector");
			return null;
		}

		let stateOptions: HTMLCollection | null = stateSelector.children;
		if(stateOptions == null) {
			console.error("Failed to get state: could not get child nodes of stateSelector");
			return null;
		}

		let stateNum: number = parseInt(stateNumString);
		let stateStringElement: Element | null = stateOptions[stateNum];
		if(stateStringElement == null) {
			console.error("Failed to get state: could not state string");
			return null;
		}

		let stateString: string | null = stateStringElement.innerHTML;
		let state: string = "";
		switch (stateString.toUpperCase()) {
			case "ALABAMA":
				state = "AL";
				break;
			case "ALASKA":
				state = "AK";
				break;
			case "ARIZONA":
				state = "AZ";
				break;
			case "ARKANSAS":
				state = "AR";
				break;
			case "CALIFORNIA":
				state = "CA";
				break;
			case "COLORADO":
				state = "CO";
				break;
			case "CONNECTICUT":
				state = "CT";
				break;
			case "DELAWARE":
				state = "DE";
				break;
			case "DISTRICT OF COLUMBIA":
				state = "DC";
				break;
			case "FLORIDA":
				state = "FL";
				break;
			case "GEORGIA":
				state = "GA";
				break;
			case "HAWAII":
				state = "HI";
				break;
			case "IDAHO":
				state = "ID";
				break;
			case "ILLINOIS":
				state = "IL";
				break;
			case "INDIANA":
				state = "IN";
				break;
			case "IOWA":
				state = "IA";
				break;
			case "KANSAS":
				state = "KS";
				break;
			case "KENTUCKY":
				state = "KY";
				break;
			case "LOUISIANA":
				state = "LA";
				break;
			case "MAINE":
				state = "ME";
				break;
			case "MARYLAND":
				state = "MD";
				break;
			case "MASSACHUSETTS":
				state = "MA";
				break;
			case "MICHIGAN":
				state = "MI";
				break;
			case "MINNESOTA":
				state = "MN";
				break;
			case "MISSISSIPPI":
				state = "MS";
				break;
			case "MISSOURI":
				state = "MO";
				break;
			case "MONTANA":
				state = "MT";
				break;
			case "NEBRASKA":
				state = "NE";
				break;
			case "NEVADA":
				state = "NV";
				break;
			case "NEW HAMPSHIRE":
				state = "NH";
				break;
			case "NEW JERSEY":
				state = "NJ";
				break;
			case "NEW MEXICO":
				state = "NM";
				break;
			case "NEWYORK":
				state = "NY";
				break;
			case "NORTHCAROLINA":
				state = "NC";
				break;
			case "NORTHDAKOTA":
				state = "ND";
				break;
			case "OHIO":
				state = "OH";
				break;
			case "OKLAHOMA":
				state = "OK";
				break;
			case "OREGON":
				state = "OR";
				break;
			case "PENNSYLVANIA":
				state = "PA";
				break;
			case "RHODE ISLAND":
				state = "RI";
				break;
			case "SOUTH CAROLINA":
				state = "SC";
				break;
			case "SOUTH DAKOTA":
				state = "SD";
				break;
			case "TENNESSEE":
				state = "TN";
				break;
			case "TEXAS":
				state = "TX";
				break;
			case "UTAH":
				state = "UT";
				break;
			case "VERMONT":
				state = "VT";
				break;
			case "VIRGINIA":
				state = "VA";
				break;
			case "WASHINGTON":
				state = "WA";
				break;
			case "WEST VIRGINIA":
				state = "WV";
				break;
			case "WISCONSIN":
				state = "WI";
				break;
			case "WYOMING":
				state = "WY";
				break;
			case "OTHER":
				state = " ? ";
				break;
		}

		return state;
	}

	getInstrumentPage(): string {
		let blogImage: HTMLImageElement | null = document.body.querySelector("img[src*='blog.png']");
		if(blogImage == null) throw "Failed to get instrument page name element";

		let parentElement: HTMLElement | null = blogImage.parentElement;
		if(parentElement == null) throw "Failed to get parent element of blog image for instrument page";

		let namePotential: HTMLElement | null = parentElement.querySelector("[data-mlm=form-name]");
		if(namePotential == null) throw "Failed to match an instrument name";

		let name: string = namePotential.innerText;
		return name;
	}

	getMRN(): number {
		let potentialMRN: string = '';
		let mrn: number = 0;
		let instrumentPage: string = this.getInstrumentPage();
		if(instrumentPage.includes('Initial')) {
			let contextMsgElement: HTMLElement | null = document.body.querySelector("#contextMsg");
			if(contextMsgElement == null) throw "Failed to get MRN: Could not find contextMsg";

			let MRNElement: HTMLElement | null = contextMsgElement.querySelector("b");
			if(MRNElement == null) throw "Failed to get MRN: Could not find bold selector";

			potentialMRN = MRNElement.innerHTML;
		}
		else {
			let recordIDElement: HTMLElement | null = document.body.querySelector("[sq_id='record_id']");
			if(recordIDElement == null) throw "Failed to get the record ID element to determine the MRN";

			let textMatch: RegExpMatchArray | null = recordIDElement.innerText.match(/[0-9]+$/gi);
			if(textMatch == null) throw "Failed to find the MRN within the data";

			potentialMRN = textMatch[0];
		}
		try { 
			mrn = parseInt(potentialMRN);
		}
		catch(e) {
			console.error("Failed to get mrn");
			throw "Failed to get MRN: Could not parse the integer";
		}
		return mrn;
	}

	getSex(): string {
		let sex: string | null = "NA";
		try {
			sex = this.getSexFromRadio();
			console.log(`RADIO: ${sex}`);
			return sex;
		}
		catch(e) {
			sex = this.getGenericValue("sex");
			if(sex == null) sex = "NA";
			if(this.isParsable(sex)) sex = this.getSexFromNum(parseInt(sex));
			console.log(`NON: ${sex}`);
			return sex;
		}
		return <string>sex;
	}

	getSexFromRadio(): string {
		let sexElement: HTMLInputElement | null = document.body.querySelector("[name='sex___radio']:checked");
		if(sexElement == null) throw "Failed to get sex: could not find sexElement";

		let result: number = 0;
		try {
			result = parseInt(sexElement.value);
		}
		catch(e) {
			throw "Failed to get sex: couldn't parse value";
		}

		let sex: string = this.getSexFromNum(result);
		return sex;
	}

	getSexFromNum(n: number): string {
		let sex: string = "NA";
		switch(n) {
			case 1:
				sex = "M";
				break;
			case 2:
				sex = "F";
				break;
			case 3:
				sex = "Other";
				break;
			default:
				sex = "NA";
				break;
		}
		return sex;
	}

	isParsable(val: any): boolean {
		try {
			parseInt(val);
			return true;
		}
		catch(e) {
			return false;
		}
		return false;
	}

	filterUnderscores(): void {
		let thisKeys: string[] = Object.keys(this);
		this
		thisKeys.forEach((key) => {
			let value: any = this.getProperty(key);

			if(value == null) this.setProperty(key, "");
			
			if(typeof(value) != 'string') return;
			let strValue: string = <string>value;

			if(strValue.includes("_")) this.setProperty(key, "");
		});
	}

}

module PatientRecord {
	export enum Healthfair {
		LHHF = 'LHHF',
			HHF = 'HHF',
			SDHF = 'SDHF',
			UKHF = 'UKHF',
			MTHF = 'MTHF',
			BPKHF = 'BPKHF',
			KWHF = 'KWHF',
			JJHF = 'JJHF',
			LCHF = 'LCHF',
			LOW = 'LOW',
			WKHF = 'WKHF'
	}
}

export default PatientRecord;

