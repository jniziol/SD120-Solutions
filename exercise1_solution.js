// Q0

const car1 = new Object();
car1.brand = "Chrysler";
car1.color = "Brown";
car1.price = 35000;
car1.drive = function() {
  console.log(`The ${this.color} car goes VROOOOoooom`);
}

const car2 = new Object();
car2.brand = "Toyota";
car2.color = "Purple";
car2.price = 25000;
car2.drive = function() {
  console.log(`The ${this.color} car goes VROOOOoooom`); 
}

const car3 = {
  brand: "Honda",
  color: "Red",
  price: 15000,
  drive: function() {
    console.log(`The ${this.color} car goes VROOOOoooom`); 
  },
};

const car4 = {
  brand: "Ford",
  color: "White",
  price: 5000,
  drive() {
    console.log(`The ${this.color} car goes VROOOOoooom`); 
  },
};

function changeColor(color, car) {
  car.color = color;
}

for (let car of [car1, car2, car3, car4]) {
  car.drive();
  changeColor("Blue", car);
}

// Q1

function getRandomInt(min, max) {
  // Don't worry about how this works, just trust that it
  // generates an integer between min and max.
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const die1 = {
  sides: 6,
  rolls: [],
  value: 1,
  roll() {
    this.value = getRandomInt(1, 6);
    this.rolls.push(this.value);

    return this.value;
  },
  average() {
    let sum = 0;
    this.rolls.forEach(function(number) {
      sum += number;
    });

    return sum / this.rolls.length;
  }
};

const die2 = {
  sides: 6,
  rolls: [],
  value: 1,
  roll() {
    this.value = getRandomInt(1, 6);
    this.rolls.push(this.value);

    return this.value;
  },
  average() {
    let sum = 0;
    this.rolls.forEach(function(number) {
      sum += number;
    });

    return sum / this.rolls.length;
  }
};

const dice = {
  currentTotal: 2,
  doublesCount: 0,
  allDice: [die1, die2],
  roll() {
    this.currentTotal = 0;
    for(let dice of this.allDice) {
      this.currentTotal += dice.roll();
    }

    if (die1.value === die2.value) {
      this.doublesCount++;
    }

    return this.currentTotal;
  },
  average() {
    let sum = 0;
    this.allDice.forEach(function(dice) {
      sum += dice.average();
    });

    return sum / this.allDice.length;
  }
}

console.log(dice.roll());