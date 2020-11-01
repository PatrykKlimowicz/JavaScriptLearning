"use strict";

// Default parameters

// const bookings = [];

// const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
//     // ES5 works this way with default parameters
//     // numPassengers = numPassengers || 1;
//     // price = price || 199;

//     const booking = {
//         flightNum,
//         numPassengers,
//         price,
//     };

//     console.log(booking);
//     bookings.push(booking);
// };

// createBooking("LH123"); // LH123, 1, 199
// createBooking("LH123", 4, 1234123);
// createBooking("LT456", 12); // price is calculated
// createBooking("ASV5", undefined, 6700); // skip numPassengers parameter

// const fligh = "ASD344";
// const patryk = {
//     name: "Patryk Klimowicz",
//     passport: 235324534,
// };

// const checkIn = function (flightNum, passengers) {
//     flightNum = "GG44";
//     passengers.name = passengers.name + "-Kowalski";

//     if (passengers.passport === 235324534) {
//         console.log("Checked in!");
//     } else {
//         console.log("Wrong passport");
//     }
// };

// checkIn(fligh, patryk);

// console.log(fligh);
// console.log(patryk); // the obj itself is changed as well! There is no passing by reference

// const oneWord = function (str) {
//     return str.replace(/ /g, "").toLowerCase();
// };

// const upperFirstWord = function (str) {
//     const [first, ...others] = str.split(" ");
//     return [first.toUpperCase(), ...others].join(" ");
// };

// // higher order function
// const transformer = function (str, fn) {
//     console.log(`Transform by ${fn.name}:`);
//     return fn(str);
// };

// let a = transformer("JavaScript is the best!", upperFirstWord);
// console.log(a);

// let b = transformer("JavaScript is the best!", oneWord);
// console.log(b);

// // FUNCTION return a function
// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     };
// };

// const greeterHey = greet("Hey!");
// greeterHey("Patryk");
// greeterHey("Dawid");

// greet("Hello")("Adam!");

// const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
// greetArrow("Hi")("there!");

// const lufthansa = {
//     airLine: "LuftHansa",
//     iataCode: "LH",
//     bookings: [],
//     book(flightNum, passengerName) {
//         console.log(`${passengerName} booked a seat on ${this.airLine} flight ${this.iataCode}${flightNum}`);
//         this.bookings.push({ flight: `${this.iataCode}${flightNum}`, passengerName });
//     },
// };

// lufthansa.book(123, "Patryk");
// lufthansa.book(112353, "Dawid");

// const eurowings = {
//     airLine: "EuroWings",
//     iataCode: "EW",
//     bookings: [],
// };

// const book = lufthansa.book;
// book.call(eurowings, 23, "Patryk Klimowicz");
// console.log(eurowings);

// const flightData = [5843, "Adam Nicpon"];
// book.apply(eurowings, flightData);
// book.call(eurowings, ...flightData);

// // The BIND method
// const bookEW = book.bind(eurowings);
// bookEW(124, "Adam Hopkins");

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23("Nikola Tesla");

// // Bind With Eventlisteners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//     console.log(this);
//     this.planes++;
//     console.log(this.planes);
// };

// // Without bind it wont work as this keyword is button element
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(200));

// ***************************************
// Immediately Invoked Function Expression - IFFE
// ***************************************

// (function () {
//     console.log("This will never be called again!");
// })();

// (() => console.log("This will ALSO never be called again!"))();

// ***************************************
// ************ CLOSURES *****************
// ***************************************

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(passengerCount);
    };
};

const booker = secureBooking();
booker();
booker();
booker();

// console.dir(booker);

let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};

const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    };
};

g();
f();
h();
f();
console.dir(f);

const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passenger`);
        console.log(`There are 3 groups of ${perGroup} passenger`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 10000; // will be used if in boardPassengers this is not defined
boardPassengers(180, 3);
