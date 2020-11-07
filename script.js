"use strict";

// // Constructor function
// const Person = function (name, birthYear) {
//     this.name = name;
//     this.birthYear = birthYear;
// };

// // 1. New empty obj is created
// // 2. this keyword is new obj
// // 3. obj is linked to prototype
// // 4. function automatically return the obj
// const patryk = new Person("Patryk", 1998);

// console.log(patryk);
// console.log(patryk instanceof Person);

// // Prototypes of objects not Person. One method
// // for all objects. All objects will inherit this method.
// Person.prototype.calcAge = function () {
//     console.log(2020 - this.birthYear);
// };

// patryk.calcAge(); // 22
// console.log(patryk.__proto__); // print patryk prototype. Created in step 3
// console.log(patryk.__proto__.__proto__); // prototype chaining Object.prototype
// console.log(patryk.__proto__.__proto__.__proto__); // null, Object.prototype is typically on top of prototype chain scope

// const arr = [2, 43, 56, 3, 2, 6, 7, 7, 6, 4];
// const arr2 = [2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 56, 56, 56, 56, 128];
// console.log(arr.__proto__);

// // Adding method to Array.prototype
// // This is not a good idea to use this in real life
// Array.prototype.unique = function () {
//     return [...new Set(this)];
// };

// console.log(arr.unique());
// console.log(arr2.unique());

// // ES6 class
// class PersonES6 {
//     constructor(name, birthYear) {
//         this.name = name;
//         this.birthYear = birthYear;
//     }

//     // This will be placed in PersonES6.prototype
//     calcAge() {
//         console.log(2020 - this.birthYear);
//     }

//     greet() {
//         console.log(`Hello, I'm ${this.name}!`);
//     }
// }

// const dawid = new PersonES6("Dawid", 1993);
// dawid.calcAge(); // 27
// dawid.greet();

// // ***************************************
// // ***************************************
// // ***************************************

// const account = {
//     owner: "patryk",
//     movements: [100, -20, 2999],

//     get latest() {
//         return this.movements.slice(-1).pop();
//     },

//     // set needs to have exactly 1 parameter
//     set latest(mov) {
//         this.movements.push(mov);
//     },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.latest);

// // ***************************************
// // ***************************************
// // ***************************************
// class Person2 {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName; // here the set will be call
//         this.birthYear = birthYear;
//     }

//     // This will be placed in PersonES6.prototype
//     calcAge() {
//         console.log(2020 - this.birthYear);
//     }

//     greet() {
//         console.log(`Hello, I'm ${this.name}!`);
//     }

//     set fullName(name) {
//         this._fullName = name; // avoid max call stack error with underscore
//     }

//     get fullName() {
//         return this._fullName; // get the property that exist
//     }
// }

// const julia = new Person2("Julia Soroko", 2001);
// console.log(julia);
// console.log(julia.fullName); // This will return _fullName acctually

// // ********************************
// // ********************************
// // ********************************

// // Constructor function
// const PersonWithStatic = function (name, birthYear) {
//     this.name = name;
//     this.birthYear = birthYear;
// };

// PersonWithStatic.prototype.calcAge = function () {
//     console.log(2020 - this.birthYear);
// };

// // This is static method
// PersonWithStatic.hey = function () {
//     console.log("HELLO HELLO HELLO!");
// };

// PersonWithStatic.hey();
// const patryk2 = new PersonWithStatic("Patryk", 1998);

// console.log(patryk2);
// console.log(patryk2 instanceof PersonWithStatic);

// class ClassWithStatic {
//     constructor(name) {
//         this.name = name;
//     }

//     // this wont be add to object prototype
//     static hey() {
//         console.log("HELLO HELLO HELLO from static CLASS!");
//     }
// }

// ClassWithStatic.hey();

// // ****************************************
// // ****************************************
// // ****************************************

// const PersonProto = {
//     calcAge() {
//         console.log(2020 - this.birthYear);
//     },

//     init(firstName, birthYear) {
//         this.name = firstName;
//         this.birthYear = birthYear;
//     },
// };

// const steven = Object.create(PersonProto); // empty obj link to the created prototype
// steven.name = "Steven";
// steven.birthYear = 1990;
// steven.calcAge();
// console.log(steven.__proto__ === PersonProto); // true

// const sarah = Object.create(PersonProto);
// sarah.init("Sarah", 1995);
// sarah.calcAge();

// // ****************************************************
// // ********** INHERITANCE BETWEEN "CLASSES" ***********
// // *************** CONTRUCTOR FUNCTIONS ***************
// // ****************************************************

// const PersonInheritance = function (firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// };

// PersonInheritance.prototype.calcAge = function () {
//     console.log(2020 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//     PersonInheritance.call(this, firstName, birthYear); // Inherit from person
//     this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(PersonInheritance.prototype);

// Student.prototype.hello = function () {
//     console.log(`Hi! I'm ${this.firstName} and I'm studying ${this.course}.`);
// };

// const patryko = new Student("Patryk", 1998, "ICT");
// patryko.hello();
// patryko.calcAge();

// // ****************************************************
// // ********** INHERITANCE BETWEEN "CLASSES" ***********
// // ******************** ES6 SYNTAX ********************
// // ****************************************************

// class Person {
//     constructor(name, birthYear) {
//         this.name = name;
//         this.birthYear = birthYear;
//     }

//     // This will be placed in Person.prototype
//     calcAge() {
//         return 2020 - this.birthYear;
//     }

//     greet() {
//         console.log(`Hello, I'm ${this.name}!`);
//     }

//     set name(name) {
//         this._name = name;
//     }

//     get name() {
//         return this._name;
//     }

//     static hey() {
//         console.log("HELLO from static method!");
//     }
// }

// class Student extends Person {
//     constructor(name, birthYear, course) {
//         // call parent contructor, must be first call!
//         super(name, birthYear);
//         this.course = course;
//     }

//     greet() {
//         console.log(`My name is ${this.name}, I'm ${this.calcAge()} y.o and I'm studying ${this.course}.`);
//     }
// }

// const patryk = new Student("Patryk Klimowicz", 1998, "ICT");
// patryk.greet();

// class Account {
//     constructor(owner, currency, pin) {
//         this.owner = owner;
//         this.currency = currency;
//         this.locale = navigator.locale;

//         // protected properties
//         this._pin = pin;
//         this._movements = [];

//         console.log(`Thanks for opening an account ${this.owner}!`);
//     }

//     get movements() {
//         return this._movements;
//     }

//     deposit(val) {
//         this._movements.push(val);
//     }

//     withdraw(val) {
//         this.deposit(-val);
//     }

//     _approveLoan(val) {
//         // some logic for checking if loan can be approved
//         return true;
//     }

//     requestLoan(val) {
//         if (this._approveLoan(val)) this.deposit(val);
//     }
// }

// const acc = new Account("Patry Klimowicz", "PLN", 1111);
// acc.deposit(10000);
// acc.requestLoan(200);
// console.log(acc.movements);

// Encapsulation
class Account {
    // Public fields
    locale = navigator.locale;

    // Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        console.log(`Thanks for opening an account ${this.owner}!`);
    }

    // Public methods
    get movements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        return this.deposit(-val);
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved!`);
            return this;
        }
    }

    // Private methods
    #approveLoan(val) {
        // some logic for checking if loan can be approved
        return true;
    }
}

const acc = new Account("Patry Klimowicz", "PLN", 1111);
acc.deposit(10000);
acc.requestLoan(200);
acc.requestLoan(2020);

console.log(acc.movements);
acc.deposit(100).deposit(3000).withdraw(120).requestLoan(20390).withdraw(12000);
console.log(acc.movements);
