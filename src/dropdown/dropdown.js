export function dropdown(title, ...args) {
	this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
}

export function dropdownItem(text, callback) {
	this.text = text;
	this.callback = callback;
}

dropdownItem.prototype.setLink = function setLink(link, openInNewTab) {
	this.callback = () => {
		if (openInNewTab) window.open(link);
		else window.open(link, '_self');
	};
};

function createItem(type, menuItem, classlist, index, visible) {
	const item = document.createElement(type);
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

dropdown.prototype.createElement = function createElement(disableStyle) {
	const dropDownElement = createItem('div', null, `${this.title}`);
	if (disableStyle !== true) {
		dropDownElement.style.position = 'relative';
		dropDownElement.style.display = 'grid';
		dropDownElement.style.gridTemplate = '1fr / auto';
	}

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

		if (disableStyle !== true) {
			dropDownItem.style.position = 'absolute';
			dropDownItem.style.width = '100%';
			dropDownItem.style.transform = `translate(0, ${(i + 1)*100}%)`;
			dropDownItem.style.zIndex = '10';
            dropDownItem.style.opacity = '0';
            dropDownItem.style.display = 'none';
		}

		dropDownElement.appendChild(dropDownItem);
	}

	menuDisplayItem.addEventListener('mouseenter', () => {
		dropDownElement.childNodes.forEach((node) => {
			if (!node.classList.contains(`${this.title}-item-display`)) {
				// eslint-disable-next-line no-param-reassign
				node.style.opacity = '1';
				// eslint-disable-next-line no-param-reassign
				node.style.display = 'inline';
			}
		});
	});
	dropDownElement.addEventListener('mouseleave', () => {
		dropDownElement.childNodes.forEach((node) => {
			if (!node.classList.contains(`${this.title}-item-display`)) {
				// eslint-disable-next-line no-param-reassign
				node.style.opacity = '0';
				// eslint-disable-next-line no-param-reassign
				node.style.display = 'none';
			}
		});
	});

	return dropDownElement;
};

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
