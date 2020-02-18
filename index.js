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

function drawOnGrid() {
    gridContainer.addEventListener('mouseover', function (el) {
        el.target.classList.add('hovered');
    }, true);
};

function clickOnGrid() {
    gridContainer.addEventListener('click', function (el) {
        el.target.classList.toggle('clicked');
    }, true);
}

/******************************/

const drawMode = function () {
    drawModeButton.addEventListener('click', drawOnGrid, true);
    // gridContainer.removeEventListener('click', clickOnGrid, true);
}

const pixelMode = function () {
    pixelModeButton.addEventListener('click', clickOnGrid, true);
    gridContainer.removeEventListener('mouseover', drawOnGrid, true);
}

drawModeButton.onclick = drawMode();
pixelModeButton.onclick = pixelMode();

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

