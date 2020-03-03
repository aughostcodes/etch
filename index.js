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
}

function setGrid(size) {
    gridContainer.setAttribute('style',
        `grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);`);
}

function removeGridKids() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function generateRandomColor() {
    let randomColor = `#` + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    return randomColor;
}

function drawOnGrid(event) {
    console.log('drawing on grid', event);

    if (event.target.classList.contains('box')) {
        event.target.classList.add('hovered');
    }
}

function clickOnGrid(event) {
    console.log('clicking on grid', event);

    if (event.target.classList.contains('box')) {
        event.target.classList.toggle('clicked');
    }
}

function colorOnGrid(event) {
    console.log('coloring on grid', event);

    if (event.target.classList.contains('box')) {
        event.target.style.background = generateRandomColor();
    }
}

const drawMode = function () {
    console.log('setting draw mode');

    gridContainer.addEventListener('mouseover', drawOnGrid);
    gridContainer.removeEventListener('click', clickOnGrid);
    gridContainer.removeEventListener('mouseover', colorOnGrid);
}

const pixelMode = function () {
    console.log('setting pixel mode');

    gridContainer.addEventListener('click', clickOnGrid);
    gridContainer.removeEventListener('mouseover', drawOnGrid);
    gridContainer.removeEventListener('mouseover', colorOnGrid);
}

const colorMode = function () {
    console.log('setting rgb color mode');

    gridContainer.addEventListener('mouseover', colorOnGrid);
    gridContainer.removeEventListener('mouseover', drawOnGrid);
    gridContainer.removeEventListener('mouseover', clickOnGrid);
}

drawModeButton.addEventListener('click', drawMode);
pixelModeButton.addEventListener('click', pixelMode);
colorModeButton.addEventListener('click', colorMode);

clearButton.addEventListener('click', function () {
    removeGridKids();
    if (newDivNumber === 0) {
        appendDivsToGrid(defaultDivNumber);
        setGrid(defaultDivNumber);
    } else {
        appendDivsToGrid(newDivNumber);
        setGrid(newDivNumber);
    }
});

defaultButton.addEventListener('click', function () {
    removeGridKids();
    appendDivsToGrid(defaultDivNumber);
    setGrid(defaultDivNumber);
});

changeSizeButton.addEventListener('click', function () {
    newDivNumber = parseInt(prompt('Enter a number of squares.'));
    removeGridKids();
    appendDivsToGrid(newDivNumber);
    setGrid(newDivNumber);
});

appendDivsToGrid(defaultDivNumber);
setGrid(defaultDivNumber);
drawMode();