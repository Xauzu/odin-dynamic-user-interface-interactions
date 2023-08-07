import {dropdown as DropDown, dropdownItem as DropDownItem} from "./dropdown/dropdown";

const test = () => {
    const testItem = new DropDownItem('test2');
    testItem.setLink('https://reddit.com');
    const dDown = new DropDown('menu', new DropDownItem('test', ()=> {window.open('https://google.com', '_self')}), testItem, 'test3');

    dDown.addItem(new DropDownItem('test', ()=>{window.open('https://github.com', '_self')}))

    document.querySelector('#content').appendChild(dDown.createElement());
};

test();