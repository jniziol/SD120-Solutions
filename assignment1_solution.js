function Item(name, code, quantity, price) {
  this.name = name;
  this.code = code;
  this.price = price;
  this.quantity = quantity;
}

function VendingMachine(items, float) {
  this.items = items;
  this.float = float;
  this.salesCount = 0;
}

VendingMachine.prototype.vend = function(code, money) {
  if (this.salesCount < 10) {
    const foundItem = items.find(item => item.code === code);

    if (foundItem !== undefined) {
      if (foundItem.quantity > 0) {
        if (money > foundItem.price) {
          const change = money - foundItem.price;
          this.float += foundItem.price;
          foundItem.quantity--;
          this.salesCount++;
          console.log(`Vending ${foundItem.name} with $${change.toFixed(2)} change.`);
        } else if(money === foundItem.price) {
          this.float += foundItem.price;
          foundItem.quantity--;
          this.salesCount++;
          console.log(`Vending ${foundItem.name}.`);
        } else {
          console.log("Not enough money!");
        }
      } else {
        console.log(`${foundItem.name}: Out of stock!`);
      }
    } else {
      console.log(`Invalid selection! : Money in vending machine = $${this.float}`)
    }
  } else {
    console.log("fnkfl38s!ERROR@893infk");
  }  
}

VendingMachine.prototype.addItems = function(item) {
  if (this.salesCount < 10) {
    const foundItem = items.find(itemElement => itemElement.code === item.code);

    if (foundItem !== undefined) {
      console.log(`Sorry, but the item ${foundItem.name} is already using that code, please pick another.`)
    } else {
      this.items.push(item);
      console.log(`New product available: ${item.name} for only $${item.price.toFixed(2)}`)
    }
  } else {
    console.log("fnkfl38s!ERROR@893infk");
  }
}

VendingMachine.prototype.reboot = function() {
  console.log("Vending Machine Successfully rebooted");
  this.salesCount = 0;
}

const items = [
  new Item("Smarties", "A01", 10, 1.60),
  new Item("Caramilk Bar", "A02", 5, 1.30),  
  new Item("Dairy Milk", "A03", 1, 1.35),
  new Item("Aero", "A04", 1, 0.25),
  new Item("Protein Bar", "B01", 6, 2.25),
  new Item("Salt & Vinager Chips", "B02", 10, 1.45),
  new Item("Ketchup Chips", "B03", 3, 1.45),
  new Item("Chocolate Cookies", "B04", 1, 0.45),
  new Item("Gummy Bears", "C02", 300, 0.01),
  new Item("Caramels", "C01", 0, 3.25),
];

const myMachine = new VendingMachine(items, 100);

myMachine.vend("A04", 0.50);
myMachine.vend("E04", 0.50);
myMachine.vend("A01", 1.10);
myMachine.vend("A01", 1.60);
myMachine.vend("B04", 10);
myMachine.vend("B04", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.vend("C02", 10);
myMachine.reboot();
myMachine.vend("C02", 10);

myMachine.addItems(new Item("Carrot Sticks", "Z01", 2, 3.20)); 
myMachine.addItems(new Item("Carrot Sticks", "Z01", 2, 3.20)); 