import DropDown from "./dropdown/DropDown";

const test = () => {
    const dDown = new DropDown('menu', 'test', 'test2', 'test3');
    const menu = dDown.createElement();

    document.querySelector('#content').appendChild(menu);
};

test();