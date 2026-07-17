// ARTWORK USING DATA

// Variables

let table;

// Names of the causes to be extracted from the table
let causes = ["Diseases of Heart", "Malignant Neoplasms", "Covid", "Self-Harm", "Assault"];
let causeColor = [];
let causeLaneY = [450, 450, 450, 450, 450];
let years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
let edges = [];
let loadError = null;

async function setup() {
  createCanvas(1400, 900);

  causeColor = [
    'red',
    'magenta',
    'orange',
    'green',
    'lightblue'
  ];

  // load csv

  table = await loadTable('assets/New_York_City_Leading_Causes_of_Death_20260701.csv', ',', 'header');

  // Get the total number of deaths per cause depending on the year
  let totals = {};

  for (let c = 0; c < causes.length; c++) {
    totals[c] = {};
    for (let y of years) totals[c][y] = 0;
  }

  for (let r = 0; r < table.getRowCount(); r++) {
    let row = table.getRow(r);
    let causeText = row.get('Leading Cause');
    let year = Number(row.get('Year'));
    let deaths = Number(row.get('Deaths'));
    if (isNaN(deaths)) continue; //If there is no imnformation continue

    for (let c = 0; c < causes.length; c++) {
      if (causeText.includes(causes[c])) {
        totals[c][year] += deaths;
      }
    }
  }

  for (let c = 0; c < causes.length; c++) {
    let pointsByYear = {};

    for (let y of years) {
      let n = Math.max(1, Math.round(totals[c][y] / 150)); //I didn't know why functions like "round", "cos", "atan2", "floor", etc., where not working, so Claude sugested using the "math." option
      let x = map(y, 2007, 2021, 0, width);
      let pts = [];
      for (let i = 0; i < n; i++) {
        pts.push({ x: x, y: causeLaneY[c] + random(-380, 380) });
      }
      pointsByYear[y] = pts;
    }

    for (let yi = 0; yi < years.length - 1; yi++) {
      let ptsA = pointsByYear[years[yi]];
      let ptsB = pointsByYear[years[yi + 1]];
      let countA = ptsA.length;
      let countB = ptsB.length;

      if (countB >= countA) {
        for (let j = 0; j < countB; j++) {
          let i = Math.floor(j * countA / countB);
          edges.push({ c: c, a: ptsA[i], b: ptsB[j] });
        }
      } else {
        for (let i = 0; i < countA; i++) {
          let j = Math.floor(i * countB / countA);
          edges.push({ c: c, a: ptsA[i], b: ptsB[j] });
        }
      }
    }
  }
}

//Drawing the points and joining them with bezier curves that mouve with the position of the mouse

function draw() {
  background(0);

  for (let e of edges) {
    stroke(causeColor[e.c]);
    strokeWeight(0.6);
    noFill();

    let midX = (e.a.x + e.b.x) / 2;
    let midY = (e.a.y + e.b.y) / 2;

    let d = dist(mouseX, mouseY, midX, midY);
    let windStrength = constrain(map(d, 0, 250, 60, 0), 0, 60);
    let angle = Math.atan2(midY - mouseY, midX - mouseX);
    let windX = Math.cos(angle) * windStrength;
    let windY = Math.sin(angle) * windStrength;

    bezier(
      e.a.x, e.a.y,
      midX + windX, e.a.y + windY,
      midX + windX, e.b.y + windY,
      e.b.x, e.b.y
    );
  }
}