let Handlebars = require('Handlebars');

type PM = (m: any, s: string, t?: Transferable[]) => void;

window.addEventListener('message', (event) => {
	if(event.data == null) return;

	let renderer = Handlebars.compile(event.data.template);
	let result: string = renderer(event.data.context)
	let data = {
		message: result
	};
	if(event.source == null) return;
	if(event.origin == null) return;
	(<PM>event.source.postMessage)(data, event.origin);
});
