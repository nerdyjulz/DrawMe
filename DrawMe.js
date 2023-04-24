/* Step 1: Create a webpage with a 16x16 grid of square divs (grid sqaures should go inside a container div) */
let divName = "divSquare";
const welcomeDiv = document.createElement ('div');
const gridDiv = document.createElement ('div');
const gridSquare = document.createElement ('div');


function welcome() {
    welcomeDiv.className = "welcome";
    welcomeDiv.innerText = "Etch-A-Sketch";
    document.body.appendChild(welcomeDiv);
}

function createGrid(gridcol, gridrow) {
    gridDiv.className = "grid";
    //gridDiv.innerText = "test";
    gridSquare.className = "gridsquare";
    welcomeDiv.insertAdjacentElement('afterend', gridDiv);
    gridDiv.insertAdjacentElement('afterbegin', gridSquare);
    //generate grid based on the 
    for (let i=0; i<gridcol; i++) {
        tempString1 = 'divRow' + (i+1);
        eval('var ' + tempString1 + ' = document.createElement(\'div\');');
        eval(tempString1 + '.className = \'divcol' + (i+1) + '\';');
        gridSquare.insertAdjacentElement('beforeend', eval(tempString1));
        for (let j=0; j < gridrow; j++){
            tempString2 =  'divSquareCol'+(j+1)+'Row'+(i+1);
            eval('var ' + tempString2 + ' = document.createElement(\'div\');');
            eval(tempString2 + '.className = \'divsquarerow' + (j+1) + 'col' + (i+1) + '\';');
            eval(tempString2 + '.innerText = \'X\'');
            console.log(eval(tempString2));
            eval(tempString1 + '.insertAdjacentElement(\'beforeend\', eval(tempString2))');
            
        }
    }
}

welcome();
createGrid(3, 4);


/* bodySection = document.getElementsByTagName("body");
console.log(bodySection); 
bodySection.appendChild(welcomeDiv); */
//const welcomeDiv = bodySection.createElement("div");

/* Step 2: Set up a hover effect so that the grid divs change color when your mouse passes over them, leaving a (pixelated) trail through your grid like a pen would. (2 methods - adding a new class to the div; or change the div’s background color using JavaScript) */

/* Step 3: Add a button to the top of the screen that will send the user a popup asking for the number of squares per side for the new grid. This should render a new div, with size apportioned to that of their request (set limit of 100px for each square). 2 methods - button tags in HTML & prompts. You should be able to enter 64 and have a brand new 64x64 grid pop up without changing the total amount of pixels used. */

/* Step 4: Instead of just changing the color of a square from black to white (for example), have each pass through with the mouse change it to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black. */