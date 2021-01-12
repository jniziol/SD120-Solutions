// Q0

function Video(title, uploader, seconds) {
  this.title = title;
  this.uploader = uploader;
  this.seconds = seconds;
}

Video.prototype.play = function() {
  console.log("You played the video!");
}

Video.prototype.watch = function() {
  console.log("You watched every cat video on the internet!");
}

Video.prototype.pause = function() {
  console.log("You paused the video!");
}

const video1 = new Video("A Cats Life", "KittyMcgee", 999); // Instantiation

console.log(video1.__proto__ === Object.getPrototypeOf(video1));
console.log(Video.prototype === Object.getPrototypeOf(video1));

Video.prototype = {
  // methods here
  // It doesnt even have that link back to the constructor
};

const video2 = new Video("A Doggs Life", "Snoop", 123); // Instantiation // uses the prototype declared on line 26

video1.pause(); // Keeps its old, original prototype, so this still works.
video2.pause(); // Does not work, because of line 26

// Q1

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.faceCard = this.rank > 10;   
  
  switch(this.rank) {
    case 1:
      this.commonName = "Ace";
      break; 
    case 11: 
      this.commonName = "Jack";
      break;
    case 12:
      this.commonName = "Queen";
      break; 
    case 13:
      this.commonName = "King";
      break; 
    default:
      this.commonName = this.rank;
  }

}

Card.prototype.toString = function() {
  console.log(`${this.commonName} of ${this.suit}s`)
}

function Deck() {
  this.cards = [];

  for(let suit of ["Diamond", "Heart", "Club", "Spade"]) {
    for(let rank = 1; rank <= 13; rank++) {
      this.cards.push(new Card(rank, suit));
    }
  }
}

Deck.prototype.count = function() {
  return this.cards.length;
}

Deck.prototype.shuffle = function() {
  this.cards.sort(() => Math.random() - 0.5);
}

Deck.prototype.draw = function(howMany) {
  return this.cards.splice((this.cards.length - 1) - howMany, howMany); // index
}

const deck = new Deck();
deck.shuffle();

const cards = deck.draw(3);

console.log(cards);
console.log(deck.count());

cards.forEach(function(card) {
  card.toString();
})


