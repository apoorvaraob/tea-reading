
let palette = ["#A42900","#DE7301","#FFA901","#BEB095","#4B5822"];
let movers = [];
let movers_num = 50;

let songLyrics = ["DO YOU REMEMBER", "21ST NIGHT OF SEPTEMBER", "love was changing the mind of pretenders", "while chasing the clouds away", "our hearts were ringing", "in the key that our souls were singing", "as we danced in the night", "remember, how the stars stole the night away", "YEA", "YEA", "YEAAAAEAAEEAA", "HEY", "HEY", "HEY", "bA De yA", "say do you remember ?", "dancing in", "~ S E P T E M B E R ~"];

let img;

let vid;
var playing = false;
var completion;

function preload(){
  vid = createVideo("earth-wind-fire-september_110031.mp4");
}

function setup() {
  createCanvas(620, 620);
  frameRate(10);
  textFont('Helvetica');
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
  
	for (let i = 0; i < movers_num; i++) {
		let x = random(width);
		let y = random(height);
		mover = new Mover(x, y, 0, random(palette));
		movers.push(mover);
	} 
}

function draw() {
  background(0, 0, 80);
  if(playing){
    background(random(palette));
 
    for (let mover of movers) {
      mover.update();
      mover.display();
    }

    for(let i = 0; i < songLyrics.length; i++){
      let d = songLyrics[i];

      if(i === songLyrics.length-1){
          // ~ SEPTEMBER ~
        fill(random(palette));
        textSize(50);
        text(d, width/2-250, height/2);
          
      } else{ 
        // set text color using data
        fill(random(palette));
        let s = random(50);
        textSize(s);
        
        // place text at a random place
        text(d, random(width), random(height));
      }
    }
  }
  vid.size(250, 200);
  image(vid, mouseX-100, mouseY-100);
  
}

class Mover {
	constructor(x, y, r, c) {
		this.init(x, y, r, c);
	}
	init(x, y, r, c) {
		this.color = color(c);
		this.center = createVector(x, y);
		this.rDirection = random(100) > 50 ? -1 : 1;
		this.r = r; //radius
		this.angle = random(180); //angle to turn;
		this.points = [];
		this.step = random(10, 30);
		this.rStep = random(0.01, 0.03) / 2;
		this.angleStep = random(0.5, 2);
		this.pointMax = 500;
		random(500, 1500);
	}
	update() {
		this.checkEdge(this.points);
		for (let i = 0; i < this.step; i++) {
			this.r += this.rStep * this.rDirection;
			this.angle += this.angleStep;
			let x = this.center.x + sin(this.angle) * this.r;
			let y = this.center.y + cos(this.angle) * this.r;
			this.points.push(createVector(x, y));
			if (this.points.length > this.pointMax) {
				this.points.shift();
			}
			if (random(100) < 0.1) {
				let angle = this.angle;
				let len = random(max(this.r * 2, 200), min(this.r * 4, 400));
				let nx = this.center.x + cos(angle) * len;
				let ny = this.center.y + sin(angle) * len;
				this.center = createVector(nx, ny);
				this.rDirection *= -1;
			}
		}
	}
	checkEdge(points) {
		for (let p of points) {
			if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
				return;
			}
		}
		this.init(random(width), random(height), 0, random(palette));
	}
	display() {
		stroke(this.color);
  
		noFill();
		beginShape();
		for (let p of this.points) {
			vertex(p.x, p.y);
      vertex(p.x+5, p.y+5);
      vertex(p.x-5, p.y-5);
		}
		endShape();
	}
}

function mousePressed() {
  if (!playing) {
    vid.play();
    vid.time((mouseX/width) * vid.duration());
    playing = true;
  }
  else {
    vid.pause();
    playing = false;
  }
}