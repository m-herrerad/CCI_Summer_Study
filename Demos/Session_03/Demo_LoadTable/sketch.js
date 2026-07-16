// Source: https://beta.p5js.org/reference/p5/loadTable/

let table;

// instead of preload use async (setup) and await (both are scheduling oftions that replace preload)
async function setup() {
  // Create a 200x200 canvas
  createCanvas(200, 200);

  // Load the CSV file with a header row
  // NOTE: adjust the file path - it should start in the folder in which you are running the server
  // ideally: the main repo folder

  table = await loadTable('/Session_03/assets/air-quality.csv', ',', 'header');

  // Get the second row (index 1)
  //let row = table.getRow(1);

  let col = table.getColumn(1);
  let maxVal = max(col);
  let minVal = min(col);

  //console.log(row);

  // Set text properties
  //fill(0);       // Set text color to black
  //textSize(16);  // Adjust text size as needed

  // Display each column value in the row on the canvas.
  // Using an offset for y-position so each value appears on a new line.
  
  background (220);
  for (let r = 0; r < table.getRowCount(); r++) {
    let red = map(col[r], minVal, maxVal, 0, 255);
    fill(red, 255, 255);
    circle(30 + r * 10, 100, 10)
    //text(col[r], 10, 30 + r * 20);
  }
}

function draw() {
    // background(220);
}
