// Q0

function convertObj(obj) {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push([key, value]);
  }
  
  return arr;
}

const obj = {
  a: 1,
  b: true,
  c: function() {

  },
  d: [1,2,3],
}

const myArray = convertObj(obj);
console.log(myArray) // [["a", 1], ["b", true], ["c", function() {}], ["d", [1,2,3]]]

// Q1

function isEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const [key, value] of Object.entries(obj1)) {
   if (!(key in obj2) || obj2[key] !== value) {
     return false;
   }
  }
  
  return true;
}

const obj1 = {
  a: 1,
  b: true,
  c: "javaScript",
}

const obj2 = {
  a: 1,
  b: true,
}

const obj3 = {
  a: 1,
  b: true,
  d: "javaScript",
}

const obj4 = {
  a: 1,
  b: true,
  c: "javaScript",
}

console.log(isEqual(obj1, obj2)) // false (not the same amount of keys/values)
console.log(isEqual(obj1, obj3)) // false (keys are not the same)
console.log(isEqual(obj1, obj4)) // true (same keys and values)

// Q2

function without(obj, key) {
  const newObj = Object.assign({}, obj);
  delete newObj[key];
  return newObj;
}

const obj1 = {
  a: 1,
  b: true,
  c: "javaScript",
}

console.log(without(obj1, "c")); // returns a new object {a: 1, b: true}

// Q3

function copy(objToClone) {
  const newObj = {};

  for (let key of Object.keys(objToClone)) {
    newObj[key] = objToClone[key];
  }

  return newObj;
}

const obj1 = {
  a: 1,
  b: true,
  c: "javaScript",
}

console.log(copy(obj1)); // returns a new object {a: 1, b: true, c: "javaScript"}

// Q4 BONUS

const obj1 = {
  data: 5,
  setNext: function(obj) {
    this.next = obj;
  },  
  setPrev: function(obj) {
    this.prev = obj;
  },
};

const obj2 = {
  data: 4,
  setNext: function(obj) {
    this.next = obj;
  },  
  setPrev: function(obj) {
    this.prev = obj;
  },
};

const obj3 = {
  data: 10,  
  setNext: function(obj) {
    this.next = obj;
  },  
  setPrev: function(obj) {
    this.prev = obj;
  },
};

obj1.setNext(obj2);
obj1.setPrev(obj3);

obj2.setNext(obj3);
obj2.setPrev(obj1);

obj3.setNext(obj1);
obj3.setPrev(obj2);

obj1.next.next.next.next.next.next.next.next.next;