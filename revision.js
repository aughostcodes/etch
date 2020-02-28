/*
On page load, create a grid of 16X16 squares.
Allow for prompt to change number of squares in the same total space as before.
On hover with mouse, "draw" onto the grid.
Buttons for clear and resize. Have option for "default."
Have option for "click" mode, to make pixel art.
Options for RBG and additive color modes.
*/

'use strict';

const gridContainer = document.getElementById('grid-container');
const clearButton = document.getElementById('clear-button');
const defaultButton = document.getElementById('default-button');
const changeSizeButton = document.getElementById('change-size-button');
const drawModeButton = document.getElementById('draw-mode-button');
const pixelModeButton = document.getElementById('pixel-mode-button');
const colorModeButton = document.getElementById('color-mode-button');
const defaultDivNumber = 16;
let newDivNumber = 0;

function appendDivsToGrid(num) {
    for (let i = 0; i < num * num; i++) {
        let createdDiv = document.createElement('div');
        createdDiv.classList.add('colored');
        createdDiv.classList.add('box');
        gridContainer.appendChild(createdDiv);
    }
};

function setGrid(size) {
    gridContainer.setAttribute('style',
        `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);`);
};

function removeGridKids() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

// don't need to add another event listener inside this one, it can just do stuff itself
function drawOnGrid(event) {
    console.log('drawing on grid', event);

    // mouseover fires on the element (grid) itself and all child elements being moused over
    // in this case we only care when a child element ('.box') is moused over
    // so we do this extra check here
    if (event.target.classList.contains('box')) {
        event.target.classList.add('hovered');
    }
};

// don't need to add another event listener inside this one, it can just do stuff itself
function clickOnGrid(event) {
    console.log('clicking on grid', event);

    // this check is not technically needed for click in this case, but feels safer to me
    if (event.target.classList.contains('box')) {
        event.target.classList.toggle('clicked');
    }
}

/******************************/

const drawMode = function () {
    console.log('setting draw mode');

    // notice I'm adding/removing the event listeners directly on the grid
    gridContainer.addEventListener('mouseover', drawOnGrid);
    gridContainer.removeEventListener('click', clickOnGrid);
}

const pixelMode = function () {
    console.log('setting pixel mode');

    // notice I'm adding/removing the event listeners directly on the grid
    gridContainer.addEventListener('click', clickOnGrid);
    gridContainer.removeEventListener('mouseover', drawOnGrid);
}

// set click handler to be a function, not the result of a function -- no () after
// this was causing trouble previously because it would execute drawMode() and pixelMode() immediately
// could also use .addEventListener('click', function) here instead
drawModeButton.addEventListener('click', drawMode);
pixelModeButton.addEventListener('click', pixelMode);

/*****************************/

clearButton.addEventListener('click', function () {
    removeGridKids();
    if (newDivNumber === 0) {
        appendDivsToGrid(defaultDivNumber);
        setGrid(defaultDivNumber);
    } else {
        appendDivsToGrid(newDivNumber);
        setGrid(newDivNumber);
    }
})

defaultButton.addEventListener('click', function () {
    removeGridKids();
    appendDivsToGrid(defaultDivNumber);
    setGrid(defaultDivNumber);
})

changeSizeButton.addEventListener('click', function () {
    newDivNumber = parseInt(prompt('Enter a number of squares.'));
    removeGridKids();
    appendDivsToGrid(newDivNumber);
    setGrid(newDivNumber);
})


colorModeButton.addEventListener('click', function () {
    console.log('color mode clicked')
})


appendDivsToGrid(defaultDivNumber);
setGrid(defaultDivNumber);