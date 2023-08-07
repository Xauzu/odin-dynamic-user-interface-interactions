export default function dropDown(title, ...args) {
    this.title = title;
	this.items = [];
	args.forEach((a) => {
		this.items.push(a);
	});
}

function createItem(type, text, classlist, index, visible) {
	const item = document.createElement(type);
	if (text) item.textContent = text;
	if (classlist && classlist instanceof Array)
		item.classList.add(...classlist);
	else item.classList.add(classlist);
	if (index !== undefined) item.classList.add(`menu-${index}`);
	if (visible === false) item.style = "opacity: 0";

	return item;
}

dropDown.prototype.createElement = function createElement() {
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
			`${this.items[i]}`,
			`drop-down-item-${this.items[i]}`,
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

dropDown.prototype.getItems = function getItems() {
	return this.items;
};
dropDown.prototype.addItem = function addItem(item) {
	this.items.push(item);
};
dropDown.prototype.removeItem = function removeItem(index) {
	this.items.splice(index, 1);
};

dropDown.prototype.getCurrentIndex = function getCurrentIndex() {
	return this.index;
};
