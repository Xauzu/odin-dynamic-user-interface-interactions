export function dropdown(title, ...args) {
    this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
};

export function dropdownItem(text, callback) {
	this.text = text;
	this.callback = callback;
};

dropdownItem.prototype.setLink = function setLink(link, openInNewTab) {
	this.callback = () => {
		if (openInNewTab)
			window.open(link);
		else
			window.open(link, '_self');
	}
}

function createItem(type, menuItem, classlist, index, visible) {
	const item = document.createElement(type);
	console.log(menuItem);
	if (menuItem instanceof dropdownItem) {
		if (menuItem.text) item.textContent = menuItem.text;
		if (menuItem.callback) item.addEventListener('click', () => {menuItem.callback()});
	}
	else {
		item.textContent = menuItem;
	}
	if (classlist) item.classList.add(classlist);
	if (index !== undefined) item.setAttribute('data-id', index);
	if (visible === false) item.style = "opacity: 0";

	return item;
}

dropdown.prototype.createElement = function createElement() {
	const dropDownElement = createItem("div", null, "drop-down");
	dropDownElement.setAttribute(
		"style",
		"display: grid; grid-template: 1fr / auto;"
	);

	const menuDisplayItem = createItem("button", this.title, `drop-down-display`);
    dropDownElement.appendChild(menuDisplayItem);

	for (let i = 0; i < this.items.length; i++) {
		const dropDownItem = createItem(
			"button",
			this.items[i],
			`${this.title}-item-${this.items[i].text || this.items[i]}`,
			i,
			false
		);
		dropDownElement.appendChild(dropDownItem);
	}


    menuDisplayItem.addEventListener('mouseenter', () => {
        dropDownElement.childNodes.forEach(node => {
            if (!node.classList.contains('drop-down-display'))
                // eslint-disable-next-line no-param-reassign
                node.style.opacity = '1';
        });
    });
    dropDownElement.addEventListener('mouseleave', () => {
        dropDownElement.childNodes.forEach(node => {
            if (!node.classList.contains('drop-down-display'))
                // eslint-disable-next-line no-param-reassign
                node.style.opacity = '0';
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