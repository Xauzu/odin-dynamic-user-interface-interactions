import img from './img.png'

// Imageslider object
export function imageslider(title, ...args) {
	this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
}

// Imageslider item object
export function imagesliderItem(src, alt, callback) {
	this.src = src;
    this.alt = alt;
	this.callback = callback;
}

// Create a dom element for the dropdown item using the data from the object
function createItem(sliderItem, classlist, index, visible) {
	const item = document.createElement('img');

	// Determine based on if a dropdownitem or string was used
	if (sliderItem instanceof imagesliderItem) {
		// eslint-disable-next-line no-unused-expressions
		sliderItem.src ? item.src = sliderItem.src : item.src = img;
        if (sliderItem.alt) item.alt = sliderItem.alt;
		if (sliderItem.callback)
			item.addEventListener('click', () => {
				sliderItem.callback();
			});
	} else {
		item.src = img;
        item.alt = "No image found";
	}
	if (classlist) item.classList.add(classlist);
	if (index !== undefined) item.setAttribute('data-id', index);
	if (visible === false) item.style.opacity = '0';

	return item;
}

function createItems(slider, title, items) {
    for (let i = 0; i < items.length; i++) {
        const item = createItem(items[0], `slider-${title}-${i}`, i, i===0);
        slider.appendChild(item);
    }
}

// Create a dom element for the imageslider
imageslider.prototype.createElement = function createElement(disableStyle) {
	const imagesliderElement = document.createElement('div');
	if (disableStyle !== true) {
		imagesliderElement.style.position = 'relative';
		imagesliderElement.style.display = 'grid';
		imagesliderElement.style.gridTemplate = '1fr / 1fr';
	}

    createItems(imagesliderElement, this.title, this.items);

	return imagesliderElement;
};