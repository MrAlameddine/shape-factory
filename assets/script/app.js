class Shape {
    constructor(name, color) {
        this._name = name;
        this._color = color;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    getInfo() {
        return `Name: ${this._name}, Color: ${this._color}`;
    }
}

let shapeArray = [];

function createShape() {
    const shapeSelect = document.getElementById("shape-select");
    const colorSelect = document.getElementById("color-select");

    const selectedShape = shapeSelect.options[shapeSelect.selectedIndex].value;
    const selectedColor = colorSelect.options[colorSelect.selectedIndex].value;

    const shape = new Shape(selectedShape, selectedColor);
    shapeArray.push(shape);

    const shapeContainer = document.getElementById("shape-container");
    const newShape = document.createElement("div");
    newShape.classList.add("shape");
    newShape.style.backgroundColor = selectedColor;

    newShape.onclick = function() {
        alert(shape.getInfo());
    };

    shapeContainer.appendChild(newShape);
}
