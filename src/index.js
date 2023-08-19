import {dropdown as DropDown, dropdownItem as DropDownItem} from "./dropdown/dropdown";
import {imageslider as ImageSlider, imagesliderItem as SliderItem} from "./imageslider/imageslider";
import testImg from './imageslider/test.png';

import './style.css'

const test = () => {
    const content = document.querySelector('#content');

    const testItem = new DropDownItem('test2');
    testItem.setLink('https://reddit.com');
    const dDown = new DropDown('menu', new DropDownItem('test', ()=> {window.open('https://google.com', '_self')}), testItem, 'test3');

    dDown.addItem(new DropDownItem('test', ()=>{window.open('https://github.com', '_self')}))

    content.appendChild(dDown.createElement(false));


    const dDown2 = new DropDown('mobile-menu', new DropDownItem('test', ()=> {window.open('https://google.com', '_self')}), testItem, 'test3');
    content.appendChild(dDown2.createElement(false));

    // Scale apply on dropdown object
    // font size, padding, and others apply on [class^="<name of dropdown>-item"]

    // const slider = new ImageSlider('main', new SliderItem(null, 'none', ()=> {window.open('https://google.com', '_self')}));
    const slider = new ImageSlider('main', new SliderItem(null, 'none', ()=> {window.open('https://thenounproject.com/icon/image-2059648/', '_self')}));
    slider.addItem(new SliderItem(testImg, '', ()=> {window.open('https://thenounproject.com/icon/pizza-5976864/', '_self')}))
    slider.addItem(new SliderItem(null, '', ()=> {window.open('https://thenounproject.com/icon/image-2059648/', '_self')}))
    content.appendChild(slider.createElement(true, false));
};

test();