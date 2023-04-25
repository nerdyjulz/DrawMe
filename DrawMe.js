/* Step 1: Create a webpage with a 16x16 grid of square divs (grid sqaures should go inside a container div) */
let divName = "divSquare";
const welcomeDiv = document.createElement ('div');
const gridDiv = document.createElement ('div');
const gridSquare = document.createElement ('div');
const gridButton = document.createElement ('button');
const resetButton = document.createElement ('button');
var satCounter = 0;
var userrows = 5;
var usercols = 5;
var mousetracker = 0;

function welcome() {
    welcomeDiv.className = "welcome";
    welcomeDiv.innerText = "ETCH-A-SKETCH";
    gridButton.innerText = "Generate Grid";
    document.body.appendChild(welcomeDiv);
    welcomeDiv.insertAdjacentElement('afterend', gridButton);
}

function getGrid() {
    gridButton.addEventListener('click', () => {
        userrows = prompt("Now the number of rows:", 4);
        while (isNaN(userrows)){
            userrows = prompt("Invalid input - enter the NUMBER of columns you'd like:", 4);
        }
        usercols = prompt("Please enter number of columns you'd like for the grid:", 4);
        while (isNaN(usercols)){
            usercols = prompt("Invalid input - enter the NUMBER of rows you'd like:", 4);
        }
        resetGrid();
        createGrid(userrows, usercols);
        hover();
    });
}

/* Step 3: Add a button to the top of the screen that will send the user a popup asking for the number of squares per side for the new grid. This should render a new div, with size apportioned to that of their request (set limit of 100px for each square). 2 methods - button tags in HTML & prompts. You should be able to enter 64 and have a brand new 64x64 grid pop up without changing the total amount of pixels used. */

function createGrid(gridrow, gridcol) {
    gridDiv.className = "grid";
    gridSquare.className = "gridsquare";
    gridButton.insertAdjacentElement('afterend', gridDiv);
    gridDiv.insertAdjacentElement('afterbegin', gridSquare);
    //generate grid based on the size specified by user
    for (let i=0; i<gridrow; i++) {
        let pixelDivRow = document.createElement ('div');
        pixelDivRow.className = "gridrow";
        gridSquare.insertAdjacentElement('beforeend', pixelDivRow);
        for (let j=0; j < gridcol; j++){
            let pixelDivCol = document.createElement ('div');
            pixelDivCol.className = "pixel";
            pixelDivRow.insertAdjacentElement('beforeend', pixelDivCol);
        }
    }
    gridDiv.insertAdjacentElement('afterend', resetButton);
    resetButton.innerText = "Reset View";
}

/* Step 2: Set up a hover effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) trail through your grid like a pen would. (2 methods - adding a new class to the div; or change the div’s background color using JavaScript) */
function hover() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((div) => {
        div.addEventListener("mousedown", (event) => {
            mousetracker = 1;
            console.log("mousetracker:" + mousetracker);
        });
        div.addEventListener("mouseup", (event) => {
            mousetracker = 0;
            console.log("mousetracker:" + mousetracker);
        });
        /*while(mousetracker === 1){ */
            div.addEventListener("mouseenter", (event) => {
                if (mousetracker ===1){
                    let tempString = "";
                    var randHue = Math.random() * 360;
                    //get current background color from div
                    let tempBG = div.getAttribute("style","background-color");
                    console.log(tempBG);
                    // if first time mouseover - generate new random colour
                    if (tempBG === null){
                        div.setAttribute("style", "background-color: hsl(" + randHue + ",10% ,60%);");
                        let satCounter = 10;
                    /* Step 4: Instead of just changing the color of a square from black to white (for example), have each pass through with the mouse change it to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black. */
                    } else {
                        //isolate background color properties
                        bgArray = tempBG.split(",");
                        console.log(bgArray[0]);
                        console.log(bgArray[1]);
                        console.log(bgArray[2]);
                        //get hue value and increment
                        tempString = bgArray[1];
                        tempString = tempString.substring(0,tempString.length-2);
                        satCounter = +tempString;
                        if (satCounter === 100) { 
                            satCounter = 100;
                        } else {
                            satCounter += 10;
                        }
                        //assign new hue value to div
                        bgArray[1] = satCounter + "% ";
                        tempBG = bgArray[0] +","+ bgArray[1] +","+ bgArray[2];
                        div.setAttribute("style",tempBG);
                    }
                    console.log("TempBG: "+ tempBG);
                }
            });
        //}
    });
}

//reset grid size by removing all child nodes
function resetGrid(){
    let grid = document.getElementsByClassName("gridsquare");
    console.log("Grid:" + grid);
    while (grid[0].hasChildNodes()){
        grid[0].removeChild(grid[0].firstChild);
    }
}

//reset grid view by re-generating grid div
function resetView(){
    const squares = document.querySelectorAll('.pixel');
    resetButton.addEventListener("click", (event) => {
        resetGrid();
        createGrid(userrows, usercols);
        hover();
    });
}

welcome();
getGrid();
createGrid(userrows, usercols);
hover();
resetView();