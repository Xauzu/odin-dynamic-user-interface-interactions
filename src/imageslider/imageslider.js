import img from './img.png';

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
function createItem(sliderItem, classlist, index, visible, disableStyle) {
	const item = document.createElement('img');
	item.classList.add(`${sliderItem.title}-slider`);

	if (disableStyle !== true) {
		item.style.width = '100%';
		item.style.height = '100%';
	}

	// Determine based on if a dropdownitem or string was used
	if (sliderItem instanceof imagesliderItem) {
		// eslint-disable-next-line no-unused-expressions
		sliderItem.src ? (item.src = sliderItem.src) : (item.src = img);
		if (sliderItem.alt) item.alt = sliderItem.alt;
		if (sliderItem.callback)
			item.addEventListener('click', () => {
				sliderItem.callback();
			});
	} else {
		item.src = img;
		item.alt = 'No image found';
	}
	if (classlist) item.classList.add(classlist);
	if (index !== undefined) item.setAttribute('data-id', index);
	if (visible === false) item.style.opacity = '0';

	return item;
}

function createItems(slider, title, items, disableStyle) {
	for (let i = 0; i < items.length; i++) {
		const item = createItem(
			items[0],
			`slider-${title}-${i}`,
			i,
			i === 0,
			disableStyle,
		);
		slider.appendChild(item);
	}
}

// Position being left or right
function createButton(slider, position, text, disableStyle) {
	const newButton = document.createElement('button');
	newButton.classList.add(`${slider.title}-slider-${position}button`);

	if (disableStyle !== true) {
		newButton.style.position = 'absolute';
		newButton.style[`${position}`] = '2vw';
		newButton.style.fontSize = 'xx-large';
		newButton.style.fontWeight = 'bolder';
		newButton.style.opacity = 0;
		newButton.style.transition = 'opacity 0.5s';
	}

	slider.addEventListener('mouseenter', () => {
		const parentWidth = parseInt(
			window
				.getComputedStyle(slider, null)
				.getPropertyValue('width')
				.split('px')[0],
			10,
		);
		const newWidth = parentWidth / 20;

		const parentHeight = parseInt(
			window
				.getComputedStyle(slider, null)
				.getPropertyValue('height')
				.split('px')[0],
			10,
		);
		const newHeight = parentHeight / 3;

		newButton.style.padding = `${newHeight}px ${newWidth}px`;

		newButton.style.opacity = 1;
	});

	slider.addEventListener('mouseleave', () => {
		newButton.style.opacity = 0;
	});

	newButton.textContent = text;

	return newButton;
}

function createNavButton(slider, id, disableStyle) {
	const navButton = document.createElement('button');
	navButton.classList.add(`${slider.title}-slider-nav-${id}`);

	if (disableStyle !== true) {
		navButton.style.borderRadius = '50%';
		navButton.style.padding = '16px';
	}

	slider.addEventListener('mouseenter', () => {
		const parentWidth = parseInt(
			window
				.getComputedStyle(slider, null)
				.getPropertyValue('width')
				.split('px')[0],
			10,
		);
		const padding = parentWidth / 40;

		navButton.style.padding = `${padding}px`;
	});

	return navButton;
}

function createNav(slider, items, disableStyle) {
	const navDiv = document.createElement('div');
	navDiv.classList.add(`${slider.title}-slider-nav`);

	if (disableStyle !== true) {
		navDiv.style.position = 'absolute';
		navDiv.style.bottom = '2vw';
		navDiv.style.display = 'grid';
		navDiv.style.gridTemplateColumns = 'repeat(auto-fit, 1fr)';
		navDiv.style.opacity = '0';
		navDiv.style.transition = 'opacity 0.5s';
	}

	const count = items.length;
	for (let i = 0; i < count + 2; i++) {
		if (i === 0 || i === count + 1) {
			navDiv.appendChild(document.createElement('div'));
			navDiv.classList.add(`${slider.title}-slider-nav-spacing`);
		} else navDiv.appendChild(createNavButton(slider, i - 1, disableStyle));
	}

	slider.addEventListener('mouseenter', () => {
		navDiv.style.opacity = '1';
	});
	slider.addEventListener('mouseleave', () => {
		navDiv.style.opacity = '0';
	});

	return navDiv;
}

// Create a dom element for the imageslider
imageslider.prototype.createElement = function createElement(disableStyle) {
	const imagesliderElement = document.createElement('div');
	imagesliderElement.classList.add(`${this.title}-slider`);
	
	if (disableStyle !== true) {
		imagesliderElement.style.position = 'relative';
		imagesliderElement.style.display = 'grid';
		imagesliderElement.style.gridTemplate = '1fr / 1fr';
		imagesliderElement.style.alignItems = 'center';
		imagesliderElement.style.justifyItems = 'center';
		imagesliderElement.style.overflow = 'auto';
	}

	createItems(imagesliderElement, this.title, this.items);

	imagesliderElement.appendChild(
		createButton(imagesliderElement, 'left', '<'),
	);
	imagesliderElement.appendChild(
		createButton(imagesliderElement, 'right', '>'),
	);

	imagesliderElement.appendChild(
		createNav(imagesliderElement, this.items, disableStyle),
	);

	return imagesliderElement;
};
