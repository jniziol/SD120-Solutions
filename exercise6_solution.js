
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
  return this.cards.splice((this.cards.length - 1) - howMany, howMany);
}

function Player(name) {
  this.name = name;
  this.hand = [];
}

Player.prototype.score = function() {
  let score = 0;
  for (let card of this.hand) { 
    if (card.suit === "Spade" || card.suit === "Club") {
      score -= card.rank;
    } else {
      score += card.rank;
    }
  }
  
  return score;  
}

function Game(players) {
  this.deck = new Deck();
  this.deck.shuffle();
  this.players = players;
}

Game.prototype.play = function() { 
    
  while (this.deck.count() > 0) {
    for (let player of this.players) {
      let card = this.deck.draw(1)[0];
      if (card !== undefined) {
        player.hand.push(card);
      }      
    }
  } 
  
  console.log(this.scoresToString())

  let winner = this.players[0];

  for (let player of this.players) {
    if (player.score() > winner.score()) {
      winner = player;
    }
  }

  console.log(`${winner.name} is the winner`);
}

Game.prototype.scoresToString = function() {
  let scoreString = "";

  for (let player of this.players) {
    scoreString += `${player.name}: ${player.score()}\n`;
  }

  return scoreString;  
}

const player1 = new Player("John");
const player2 = new Player("Candice");
const player3 = new Player("Maisie");
const game = new Game([player1, player2, player3]);

game.play(); 



