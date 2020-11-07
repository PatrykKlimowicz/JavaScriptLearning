///////////////////////////////////////
// Coding Challenge #1

/* 
1.  Use a constructor function to implement a Car. 
    A car has a mark and a speed property. 
    The speed property is the current speed of the car in km/h;

2.  Implement an 'accelerate' method that will increase the car's speed by 10,
    and log the new speed to the console;

3.  Implement a 'brake' method that will decrease the car's speed by 5,
    and log the new speed to the console;

4.  Create 2 car objects and experiment with calling 'accelerate'
    and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/

const Car = function (name, speed) {
    this.name = name;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.name}'s speed is now ${this.speed}`);
};

Car.prototype.break = function () {
    this.speed -= 5;
    console.log(`${this.name}'s speed is now ${this.speed}`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 90);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
console.log(bmw.speed);
bmw.break();
bmw.break();
bmw.break();
bmw.break();
console.log(bmw.speed);

mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
console.log(mercedes.speed);
mercedes.break();
mercedes.break();
mercedes.break();
mercedes.break();
console.log(mercedes.speed);
