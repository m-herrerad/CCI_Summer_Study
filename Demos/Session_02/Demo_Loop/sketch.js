let cities = [
    'Bogota', 
    'Houston', 
    'London',
    'Detroit',
]

function setup() {
    createCanvas(400, 400);

    for (let i = 0; i < cities.length; i++){

        let currentCity = cities[i];
        console.log(currentCity);

    }
}

function draw() {
    background(220);
}

