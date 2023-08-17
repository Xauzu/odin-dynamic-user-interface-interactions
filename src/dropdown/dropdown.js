// Dropdown menu object
export function dropdown(title, ...args) {
	this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
}

// Dropdown item object
export function dropdownItem(text, callback) {
	this.text = text;
	this.callback = callback;
}

// Hyperlink on click
dropdownItem.prototype.setLink = function setLink(link, openInNewTab) {
	this.callback = () => {
		if (openInNewTab) window.open(link);
		else window.open(link, '_self');
	};
};

// Create a dom element for the dropdown item using the data from the object
function createItem(type, menuItem, classlist, index, visible) {
	const item = document.createElement(type);

	// Determine based on if a dropdownitem or string was used
	if (menuItem instanceof dropdownItem) {
		if (menuItem.text) item.textContent = menuItem.text;
		if (menuItem.callback)
			item.addEventListener('click', () => {
				menuItem.callback();
			});
	} else {
		item.textContent = menuItem;
	}
	if (classlist) item.classList.add(classlist);
	if (index !== undefined) item.setAttribute('data-id', index);
	if (visible === false) item.style.opacity = '0';

	return item;
}

// Create a dom element for the menu
dropdown.prototype.createElement = function createElement(disableStyle) {
	const dropDownElement = createItem('div', null, `${this.title}`);
	if (disableStyle !== true) {
		dropDownElement.style.position = 'relative';
		dropDownElement.style.display = 'grid';
		dropDownElement.style.gridTemplate = '1fr / auto';
	}

	// Default display when inactive
	const menuDisplayItem = createItem(
		'button',
		this.title,
		`${this.title}-item-display`,
	);
	dropDownElement.appendChild(menuDisplayItem);

	for (let i = 0; i < this.items.length; i++) {
		const dropDownItem = createItem(
			'button',
			this.items[i],
			`${this.title}-item-${this.items[i].text || this.items[i]}`,
			i,
			false,
		);

		// Styling to create a dropdown
		if (disableStyle !== true) {
			dropDownItem.style.position = 'absolute';
			dropDownItem.style.zIndex = '10';
			dropDownItem.style.display = 'none';
		}

		dropDownElement.appendChild(dropDownItem);
	}

	// Displaying and hiding of the dropdown menu
	menuDisplayItem.addEventListener('mouseenter', () => {
		const nodes = dropDownElement.childNodes;
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];

			const paddingTop = window
				.getComputedStyle(node.parentNode, null)
				.getPropertyValue('padding-top');
			const borderTop = window
				.getComputedStyle(node.parentNode, null)
				.getPropertyValue('border-top-width');
			const paddingLeft = window
				.getComputedStyle(node.parentNode, null)
				.getPropertyValue('padding-left');
			const borderLeft = window
				.getComputedStyle(node.parentNode, null)
				.getPropertyValue('border-left-width');

			const offsetTop =
				parseInt(paddingTop.split('px')[0], 10) +
				parseInt(borderTop.split('px')[0], 10);
			const offsetLeft =
				parseInt(paddingLeft.split('px')[0], 10) +
				parseInt(borderLeft.split('px')[0], 10);

			if (!node.classList.contains(`${this.title}-item-display`)) {
				node.style.transform = `translate(${offsetLeft}px, calc(${
					i * 100
				}% + ${offsetTop}px))`;
				node.style.width = `${menuDisplayItem.offsetWidth}px`;
				node.style.opacity = '1';
				node.style.display = 'inline';
			}
		}
	});
	dropDownElement.addEventListener('mouseleave', () => {
		const nodes = dropDownElement.childNodes;
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			if (!node.classList.contains(`${this.title}-item-display`)) {
				node.style.opacity = '0';
				node.style.display = 'none';
			}
		}
	});

	return dropDownElement;
};

// Accessor and mutators
dropdown.prototype.getItems = function getItems() {
	return this.items;
};
dropdown.prototype.addItem = function addItem(item) {
	this.items.push(item);
};
dropdown.prototype.removeItem = function removeItem(index) {
	this.items.splice(index, 1);
};

dropdown.prototype.getCurrentIndex = function getCurrentIndex() {
	return this.index;
};
