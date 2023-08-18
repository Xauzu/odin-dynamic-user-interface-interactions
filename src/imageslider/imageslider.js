import img from './img.png';

// Imageslider object
export function imageslider(title, ...args) {
	this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
	this.currentIndex = 0;
	this.left = function left() {
		if (this.items.length > 0) {
			this.currentIndex += 1;

			if (this.currentIndex > this.items.length - 1) this.currentIndex = 0;
			// todo
		}
	}
}

// Imageslider item object
export function imagesliderItem(src, alt, callback) {
	this.src = src || img;
	this.alt = alt;
	this.callback = callback;
}

// Create a dom element for the dropdown item using the data from the object
function createItem(slider, sliderItem, classlist, index, visible, disableStyle) {
	const item = document.createElement('img');

	if (disableStyle !== true) {
		item.style.width = `100%`;
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
			slider,
			items[i],
			`slider-${title}-item-${i}`,
			i,
			i === 0,
			disableStyle,
		);
		item.style.flex = '1 100%';
		item.style.width = '100%';

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
		navDiv.style.gridTemplateColumns = `repeat(${items.length+2}, 1fr)`;
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

function createImageContainer(title, items) {
	const imageElement = document.createElement('div');
	imageElement.classList.add(`${title}-slider-imagecontainer`);
	imageElement.style.display = 'flex';
	imageElement.style.alignItems = 'center';
	imageElement.style.justifyItems = 'center';
	imageElement.style.overflow = 'hidden';

	createItems(imageElement, title, items);

	return imageElement;
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

	const imageElement = createImageContainer(this.title, this.items);
	imagesliderElement.appendChild(imageElement);


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

imageslider.prototype.addItem = function addItem(item) {
	this.items.push(item);
}
imageslider.prototype.removeItem = function removeItem(index) {
	this.items.splice(index, 1);
};