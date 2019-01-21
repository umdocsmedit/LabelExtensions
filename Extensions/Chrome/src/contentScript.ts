import PatientRecord from './PatientRecord';

(function(){
	let patientRecord: PatientRecord;
	try {
		patientRecord = new PatientRecord();
	} catch(e) {
		patientRecord = new PatientRecord(true);
	}

	chrome.runtime.sendMessage({data: patientRecord}, ()=>{});

})();
