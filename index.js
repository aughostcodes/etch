/*
On page load, create a grid of 16X16 squares.
Allow for prompt to change number of squares in the same total space as before.
On hover with mouse, "draw" onto the grid.
Buttons for clear. Clearing prompts for size. Have option for "default."
Have option for "click" mode, to make pixel art.
Options for RBG mode, additive color modes.
*/

'use strict';


let sheet = window.document.styleSheets[0];
let rules = sheet.cssRules;

const gridContainer = document.querySelector('.grid-container');
let defaultDivNumber = 16;
// let newDivNumber = parseInt(prompt('How big?'));

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



appendDivsToGrid(defaultDivNumber);
setGrid(defaultDivNumber);


// window.onload = appendDivsToGrid(`${defaultDivNumber}`);