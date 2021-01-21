class File {
  constructor(fullName, contents) {
    let splitFullname = fullName.split('.');  
    this.fullName = fullName;
    this.contents = contents;
    this.extension = splitFullname.pop();
    this.filename = splitFullname.join(".");

    this._getsCounter = 0;
    this._getcCounter = 0;
  }

  getContents() {
    return this.contents;
  }

  write(newContent) {
    if (this.contents.length > 0) {
      this.contents += ("\n" + newContent);
    } else {
      this.contents += newContent;
    }    
  }

  gets() {
    let line = this.contents.split('\n')[this._getsCounter];
    this._getsCounter++;
    return line;
  }

  getc() {
    let char = this.contents.split('')[this._getcCounter]; 
    this._getcCounter++;
    return char;
  }
}

const myFile = new File("hello.txt", "Hello World");
console.log(myFile.fullName); // hello.txt

const file1 = new File("hello_world.txt", "Hello World");
console.log(file1.filename); // "hello_world"

const file2 = new File("class.phptester.php", "<?php /* Some PHP code here */ ?>");
console.log(file2.filename); // "class.phptester"

const fileWithComplexName = new File("alpha.beta.gamma.delta.txt", "alpha beta gamma delta");
console.log(fileWithComplexName.extension); // "txt"

const myFile2 = new File("hello.txt", "Hello World\nHello World");
console.log(myFile2.getContents()); // "Hello World\nHello World"

let myFile3 = new File("example.txt", "");
console.log(myFile3.getContents()); // ""
myFile3.write("Line 1");
console.log(myFile3.getContents()); // "Line 1"
myFile3.write("Line 2");
console.log(myFile3.getContents()); // "Line 1\nLine 2"
myFile3.write("Line 3");
console.log(myFile3.getContents()); // "Line 1\nLine 2\nLine 3"

let myFile4 = new File("example.txt", "Line 1\nLine 2\nLine 3\nLine 4\nLine 5");
console.log(myFile4.gets()); // "Line 1"
console.log(myFile4.gets()); // "Line 2"
console.log(myFile4.gets()); // "Line 3"
console.log(myFile4.gets()); // "Line 4"
console.log(myFile4.gets()); // "Line 5"
console.log(myFile4.gets()); // undefined
console.log(myFile4.gets()); // undefined
console.log(myFile4.gets()); // undefined

let myFile5 = new File("Lorem Ipsum.txt", "Lorem ipsum dolor sit amet, adispicing eu.");
console.log(myFile5.getc()); // "L"
console.log(myFile5.getc()); // "o"
console.log(myFile5.getc()); // "r"
console.log(myFile5.getc()); // "e"
console.log(myFile5.getc()); // "m"
console.log(myFile5.getc()); // " "
console.log(myFile5.getc()); // "i"
console.log(myFile5.getc()); // "p"