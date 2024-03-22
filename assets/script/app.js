'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

import author, { Shape } from "./shape.js";

const buttonCreate = select('.create');
const optionShape = select('.shape');
const optionColor = select('.color');
const containerGrid = select('.grid-container');
const infoFactory = select('.factory-info');
const MAX_STORAGE = 24;
let shapeArray = [];
let shapeCount = 0;

function getOptionText(element) {
    if (element.selectedIndex !== -1) {
        return element.options[element.selectedIndex].text;
    }
}

function generateShapeObject() {
    let colorText = getOptionText(optionColor);
    let newShape = new Shape(optionShape.value, colorText);
    shapeArray.push(newShape);
}

function generateShape() {
    shapeCount++;

    let newShape = create('div');
    if (optionShape.value == "circle") {
        newShape.classList.add('circle');
    }
    newShape.style.backgroundColor = `#${optionColor.value}`;
    newShape.classList.add(`item-${shapeCount}`);
    containerGrid.appendChild(newShape);
}

function areOptionsValid() {
    if (optionShape.value !== "" && optionColor.value !== "") {
        return true;
    } else {
        infoFactory.innerText = `Please, select a shape and a color`;
        return false;
    }
}

onEvent('click', buttonCreate, () => {
    clearOnClick();
    if (shapeArray.length < MAX_STORAGE && areOptionsValid()) {
        generateShapeObject();
        generateShape();
    } else if (shapeArray.length === MAX_STORAGE) {
        clearAll();
        infoFactory.innerText = `Storage is full!`;
    }
});

function getShapeUnit(element) {
    let className = element[element.length - 1];
    let classArray = className.split('-');
    let unit = classArray[classArray.length - 1];
    return unit;
}

function displayInfo(unit, info) {
    infoFactory.innerText = `Unit ${unit}: ${info}`;
}

onEvent('click', window, (event) => {
    if (containerGrid.hasChildNodes()) {
        containerGrid.childNodes.forEach(node => {
            if (node.contains(event.target)) {
                let unit = getShapeUnit(node.classList);
                let info = shapeArray[unit - 1].getInfo();
                displayInfo(unit, info);
            }
        });
    }
});

function clearAll() {
    buttonCreate.classList.add('clear');
    buttonCreate.value = 'Clear';
}

function clearOnClick() {
    if (buttonCreate.value == 'Clear') {
        location.reload();
    }
}
