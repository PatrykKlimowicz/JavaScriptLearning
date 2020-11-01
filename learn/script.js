"use strict";

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    [weekdays[4]]: {
        open: 11,
        close: 23,
    },
    // ES6 allows us to calculate the properity name
    [weekdays[5]]: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

const restaurant = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
    starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
    mainMenu: ["Pizza", "Pasta", "Risotto"],

    // ES6 enhanced object literals, this obj is outside of this obj
    // before ES6 openingHours: openingHours ---> same name, more to change in case of
    // outsider's name is change
    openingHours,

    // ES6 enchanced method declaring, before ES6: order: function (....) {....};
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
        console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },

    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`);
    },

    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
    },
};

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// for (const item of menu) console.log(item);

// for (const [index, item] of menu.entries()) console.log(`At position ${index + 1} is ${item}`);

// // Optonal Chaining .?
// console.log(restaurant.openingHours.mon); // undefined
// // console.log(restaurant.openingHours.mon.open); // error

// // avoid errors
// if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// // in case that opening hours are optional as well
// if (restaurant.openingHours && restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// // BETTER WAY - this will give us closed instead of undefined
// console.log(restaurant.openingHours?.mon?.open ?? "closed");

// const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// for (const day of days) {
//     const open = restaurant.openingHours[day]?.open ?? "closed";
//     console.log(`On ${day} we are open at ${open}`);
// }

// // Method
// console.log(restaurant.order?.(0, 1) ?? "Method does not exist!");
// console.log(restaurant.greetings?.(0, 1) ?? "Method does not exist!"); // No such method

// // LOOPING through properties
// let properties = Object.keys(openingHours); // array with 3 elements
// let infoStr = `We are open on ${properties.length} days: `;

// for (const day of properties) console.log((infoStr += `${day}, `));

// // LOOPING through values
// let values = Object.values(openingHours); // array with 3 elements
// console.log(values); // array of 3 objects which are values from openingHours

// // LOOPIN through entire obj
// const entries = Object.entries(openingHours);
// // console.log(entries);
// for (const [day, { open, close }] of entries) {
//     console.log(`On ${day} we are open at ${open} and close at ${close}`);
// }

// // ****************************
// // SETS - collection of a unique values
// // ****************************
// const orderSet = new Set(["Patryk", "Dawid", "Bernard", "Patryk", "Marek"]);
// console.log(orderSet);
// console.log(orderSet.size);
// console.log(orderSet.has("Patryk"));
// orderSet.add("Matylda");
// console.log(orderSet);
// orderSet.delete("Matylda");
// console.log(orderSet);
// // orderSet.clear()

// // Example
// const numbers = [1, 1, 2, 3, 4, 5, 6, 3, 4, 6, 87, 2, 25, 6, 3, 1, 3, 6, 7, 9, 0, 7, 9, 6];

// const numbersUnique = new Set(numbers);
// console.log(numbersUnique);

// // How many different names in my name?
// console.log(new Set("patrykklimowicz").size); // 13

// // ****************************
// MAPS - data structure to maps keys to values. Keys can be of any type
// // ****************************

// const rest = new Map();
// rest.set("name", "Clasico Italiano");
// rest.set(1, "Firenze Italy");
// console.log(rest.set(2, "Gryfino"));

// rest.set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//     .set("open", 11)
//     .set("close", 23)
//     .set(true, "We are open!")
//     .set(false, "We are closed...");

// console.log(rest.get("name"));
// console.log(rest.get(true));

// const time = 21;

// console.log(rest.get(rest.get("open") < time && rest.get("close") > time)); // We are open!
// rest.has("categories"); // true
// console.log(rest.size); // 8
// rest.delete(2);
// console.log(rest.size); // 7

// const question = new Map([
//     ["question", "Which programming language is best?"],
//     [1, "C"],
//     [2, "Java"],
//     [3, "JS"],
//     ["correct", 3],
//     [true, "correct!"],
//     [false, "Try again!"],
// ]);
// console.log(question);

// // Convert object to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Iterate through map
// console.log(question.get("question"));
// for (const [key, value] of question) {
//     if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
// }
// let answer = 3; //prompt("Your answer:");
// console.log(question.get(question.get(question.get("correct")) === answer));
// let numAnswer = Number(answer);
// console.log(question.get(question.get("correct") === numAnswer));

// // MAP to Array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// ****************************
// STRINGS
// ****************************

const airline = "PLT - Polskie Linie Lotnicze";
const plane = "B737";

console.log(airline.length);
console.log(airline.lastIndexOf("r")); // no such character
console.log(airline.lastIndexOf("o")); // 21
console.log(airline.indexOf("o")); // 7
console.log(airline.indexOf("Linie")); // 14
console.log(airline.slice(14, 19)); // Linie

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(1, -1)); // Remove fist and last charackter

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = "PaTrYk";
const passenger2 = "anna";
const passenger3 = "MichaL";

const fixName = function (name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
};

console.log(fixName(passenger));
console.log(fixName(passenger2));
console.log(fixName(passenger3));

// Comparig emails
const email = "patryk@gmail.com";
const emailLogin = "  PaTryk@GMAIL.coM \n";

const normalizeEmailLogin = emailLogin.toLowerCase().trim();

console.log(normalizeEmailLogin === email);

// replacing
const priceBG = "298,56R";
const correctPrice = priceBG.replace(",", ".").replace("R", "$");
console.log(correctPrice);

const info = "Please go to the door 3. To the door 3!";
console.log(info.replace(/door/g, "gate"));

console.log(info.includes("go") ? "Is there" : "What????");
console.log(info.includes("XD") ? "Is there" : "What????");

console.log("p=a=t=r=y=k=k=l=i=m=o=w=i=c=z".split("="));
const [firstName, secondName] = "Patryk Klimowicz".split(" ");
console.log(firstName, secondName);

const newName = ["Hey", firstName, secondName].join("!!!!!!!");
console.log(newName);
