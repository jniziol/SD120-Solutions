const WhiteZombieCleric = function(power, armour, attackSpeed, name) {
 power, armour, attackSpeed, name
};

WhiteZombieCleric.prototype = Object.create(Fighter.prototype);
WhiteZombieCleric.prototype.constructor = WhiteZombieCleric;

WhiteZombieCleric.prototype.attack = function(opponent) {
  const damagePotential = this.getDamage();
  console.log(`${this.name} attacks ${opponent.name} for ${damagePotential} potential damage`);
  return damagePotential;
}

WhiteZombieCleric.prototype.defend = function(damagePotential) {
  const totalDamage = this.blockDamage(damagePotential);
  console.log(`${this.name} blocked ${damagePotential - totalDamage} damage of ${damagePotential}`);
  return totalDamage;
}

WhiteZombieCleric.prototype.loseLife = function(totalDamage) {
  this.life -= totalDamage;
  console.log(`${this.name} has ${this.life} remaining`);
}

const wzc = new WhiteZombieCleric(40, 5, 5, "Rob Zombie");

Character.multibattle(wzc, grandius, 10);

