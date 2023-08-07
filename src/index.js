import {dropdown as DropDown, dropdownItem as DropDownItem} from "./dropdown/dropdown";

import './style.css'

const test = () => {
    const content = document.querySelector('#content');

    const testItem = new DropDownItem('test2');
    testItem.setLink('https://reddit.com');
    const dDown = new DropDown('menu', new DropDownItem('test', ()=> {window.open('https://google.com', '_self')}), testItem, 'test3');

    dDown.addItem(new DropDownItem('test', ()=>{window.open('https://github.com', '_self')}))

    content.appendChild(dDown.createElement(false, true));


    const dDown2 = new DropDown('mobile-menu', new DropDownItem('test', ()=> {window.open('https://google.com', '_self')}), testItem, 'test3');
    content.appendChild(dDown2.createElement(false, false));

    // Scale apply on dropdown object
    // font size, padding, and others apply on [class^="<name of dropdown>-item"]
};

test();