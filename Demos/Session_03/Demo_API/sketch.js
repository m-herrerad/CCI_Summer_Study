let tflData;

function setup() {
    createCanvas(800, 600);

    //const appId = 'YOUR_API_ID'; // insert your obtained API ID here
    //const apiKey = 'YOUR_API_KEY'; // insert your obtained API key here

    // get status of all tube trains
    tflData = fetch(`https://api.tfl.gov.uk/Line/Mode/tube`)
        .then(response => response.json())
        .then(data => console.log('STATUS', data));

}

function draw() {
    background(220);
}
