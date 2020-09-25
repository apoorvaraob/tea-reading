
//our tea reading javascript

let teaText = "Lorem ipsum blah blah blah...";
function setup() {
    var canvas = createCanvas(1100, 600);
   
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('p5-tea-box');
    background(255, 255, 255);

    textFont("Helvetica");
}

function draw(){
    text(teaText, 100,100);
}