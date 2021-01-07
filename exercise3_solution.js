// Q0

function getRandomInt(min, max) {
  // Don't worry about how this works, just trust that it
  // generates an integer between min and max.
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function Die(sides) {
  this.sides = sides;
  this.rolls = [];
  this.value;
  
  this.roll = function() {
    this.value = getRandomInt(1, this.sides);
    this.rolls.push(this.value);

    return this.value;
  };
  
  this.average = function() {
    let sum = 0;
    this.rolls.forEach(function(number) {
      sum += number;
    });

    return sum / this.rolls.length;
  };
}

function Dice(die1, die2) {
  this.currentTotal;
  this.doublesCount = 0;
  this.allDice = [die1, die2];

  this.roll = function() {
    this.currentTotal = 0;
    for(let dice of this.allDice) {
      this.currentTotal += dice.roll();
    }

    if (this.allDice[0].value === this.allDice[1].value) {
      this.doublesCount++;
    }

    return this.currentTotal;
  };

  this.average = function() {
    let sum = 0;
    this.allDice.forEach(function(dice) {
      sum += dice.average();
    });

    return sum / this.allDice.length;
  };
}

const die1 = new Die(6);
const die2 = new Die(6);
const dice = new Dice(die1, die2);

console.log(dice.roll());

// Q1

const Team = function(name) {
  this.name = name;
  this.goalsFor = 0;
  this.goalsAgainst = 0;
  this.wins = 0;
  this.losses = 0;
  this.draws = 0;

  this.add = function(game) {
    if (game[0][0] === this.name) {
      us =  game[0];
      them = game[1];
    } else {
      us =  game[1];
      them = game[0];
    }
    
    if(us[1] > them[1]) {
      this.wins++;
    } else if (us[1] < them[1]) {
      this.losses++;
    } else {
      this.draws++;
    }

    this.goalsFor += us[1];
    this.goalsAgainst += them[1];
  };

  this.getPoints = function() {
    return this.wins * 3 + this.draws;
  };

  this.getGoalDifference = function() {
    return this.goalsFor - this.goalsAgainst;
  }

  this.getRecord = function() {
    return `${this.wins} - ${this.losses} - ${this.draws}`;
  }
}

const winnipeg = new Team("Winnipeg");
const edmonton = new Team("Edmonton");

winnipeg.add([["Winnipeg", 3], ["Edmonton", 0]]);
edmonton.add([["Winnipeg", 3], ["Edmonton", 0]]);

console.log(winnipeg.goalsFor); // 3
console.log(edmonton.goalsFor); // 0
console.log(edmonton.getPoints()); // 0
console.log(edmonton.getGoalDifference()); // -3

winnipeg.add([["Winnipeg", 1], ["Edmonton", 1]]);
edmonton.add([["Winnipeg", 1], ["Edmonton", 1]]);

console.log(winnipeg.goalsFor); // 4
console.log(winnipeg.getPoints()); // 4
console.log(edmonton.getPoints()); // 1