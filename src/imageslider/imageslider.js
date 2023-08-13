// Imageslider object
export function imageslider(title, ...args) {
	this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
}

// Imageslider item object
export function imagesliderItem(text, callback) {
	this.text = text;
	this.callback = callback;
}