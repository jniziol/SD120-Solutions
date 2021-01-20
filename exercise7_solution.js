// Q0
function Bird() { // constructor functions
  this.legs = 2;
  this.wings = 2;
  this.flying = false;
  this.flies = true;
}

Bird.prototype.fly = function() {
  if (this.flying) {
    this.flying = false;
    console.log("I'm landing...");
  } else {
    this.flying = true;
    console.log("I'm flying...");
  }
}

function Chicken(color, name, species) {
  Bird.call(this);
  this.color = color;
  this.name = name;
  this.species = species;
  this.flies = false;
}

Chicken.prototype = Object.create(Bird.prototype);
Chicken.prototype.constructor = Chicken;

Chicken.prototype.fly = function() {
  console.log("flaps its wings and clucks.");
}

const chicken = new Chicken("blue", "pekkle", "prairie");
chicken.fly();
const bird1 = new Bird();
bird1.fly();

// Q1

function Video(title, uploader, seconds) { //undefined
  this.title = title;
  this.uploader = uploader;
  this.seconds = seconds;
}

Video.prototype.watch = function() {
  console.log("You watched the video");
}

Video.prototype.play = function() {
  console.log("You played the video");
}

function MusicVideo(artist, uploader, title, seconds) {
  Video.call(this, title, uploader, seconds);
  this.artist = artist;
}

MusicVideo.prototype.watch = function() {
  console.log("Played most popular music videos of the century");
}

MusicVideo.prototype = Object.create(Video.prototype);
MusicVideo.prototype.constructor = MusicVideo;

const newVideo = new MusicVideo("john", "john", "funny things", 123);

// Q2

function Cuboid(w, h, l) {
  this.width = w;
  this.height = h;
  this.length = l;
}

Cuboid.prototype.surfaceArea = function() {
  return (this.width * this.height * 2) + (this.width * this.length * 2) + (this.height * this.length * 2)
}

Cuboid.prototype.volume = function() {
  return this.height * this.length * this.width;
}

function Cube(side) {
  Cuboid.call(this, side, side, side);
}

Cube.prototype = Object.create(Cuboid.prototype);
Cube.prototype.constructor = Cube;