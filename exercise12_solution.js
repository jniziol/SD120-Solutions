class Dice {
  constructor(allDice) {
    this.allDice = allDice; // this is of type...array
    this.quintuples = 0;
    this.rolls = 1;
  }

  roll() {
    console.log(`Roll #${this.rolls++}`);

    this.allDice.forEach(function(die, index) {
      const value = die.roll();
      console.log(`Dice #${index + 1} was ${value}`);
    });

    if (this.allDice.length >= 5) {
      const counterObj = {};
      for(const die of this.allDice) {
        if (counterObj[die.value] === undefined) {
          counterObj[die.value] = 1;
        } else {
          counterObj[die.value]++;
        }
      }

      for(const key of Object.keys(counterObj)) {
        if (counterObj[key] >= 5) {
          this.quintuples++;
        }
      }
    }
  }

  autoroll(howMany) {
    for(let x = 0; x < howMany; x++) {
      this.roll();
    }
  }

  report() {
    console.log(`The dice were rolled ${this.rolls - 1} times.`);
    console.log(`You rolled ${this.quintuples} quintuples.`);
      
    this.allDice.forEach(function(die, index) {
      console.log(`Dice #${index + 1} Total is ${die.total()}`);
    });
  }
}

class Die {
  constructor(sides) {
    this.sides = sides;
    this.rolls = [];
    this.value = 0;
  }
  
  roll() {
    this.value = Math.floor(Math.random() * this.sides) + 1;
    this.rolls.push(this.value);
    return this.value;
  }

  total() {
    let sum = 0;
    this.rolls.forEach(function(roll) {
      sum += roll;
    });

    return sum;
  }
}

const dice = new Dice([new Die(6), new Die(6),new Die(6),new Die(6),new Die(6),new Die(6),new Die(6)]);
dice.autoroll(3000);
dice.report();