let printButton = document.getElementById('print');
let color = '#3aa757';

printButton.onclick = function(element) {
	let queryOptions = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryOptions, function(tabs) {
		let currentTab = tabs[0];
		let scriptOptions = {
			file: './PrintLabel.js'
		};
		chrome.tabs.executeScript(currentTab.id, scriptOptions);
	});
};
