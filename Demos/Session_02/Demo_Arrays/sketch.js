let cities = [
    'Bogota', 
    'Houston', 
    'London',
]

function setup() {
    createCanvas(400, 400);

    //Access an element from an array
    //This is Indexing = getting an element
    let firstElement = cities[0];

    //Add an element to an array
    cities.push('Detroit');

    let lastIndex = cities.length - 1;
    let lastElement = cities[lastIndex];

    console.log(lastElement);

}

function draw() {
    background(220);
}

