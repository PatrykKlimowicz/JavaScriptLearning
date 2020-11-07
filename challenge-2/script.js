"use strict";

///////////////////////////////////////
// Coding Challenge #2

/* 
1.  Use a ES6 class to implement a Car. 
    A car has a make and a speed property. 
    The speed property is the current speed of the car in km/h;

2.  Implement an 'accelerate' method that will increase the car's
    speed by 10, and log the new speed to the console;

3.  Implement a 'brake' method that will decrease the car's speed 
    by 5, and log the new speed to the console;

4.  Add a getter called 'speedUS' which returns the current speed 
    in mi/h (divide by 1.6);    

5.  Add a setter called 'speedUS' which sets the current speed in 
    mi/h (but converts it to km/h before storing the value, by 
    multiplying the input by 1.6);

6.  Create a car object and experiment with calling 'accelerate'
    and 'brake' and set get accestor

DATA CAR 1: 'Ford' going at 120 km/h
*/

class Car {
    constructor(name, speed) {
        this.name = name;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`FASTER! ${this.name}'s speed is now ${this.speed} km/h`);
    }

    break() {
        this.speed -= 5;
        console.log(`SLOW DOWN! ${this.name}'s speed is now ${this.speed} km/h`);
    }

    get speedUS() {
        console.log(`Speed in US is ${this.speed / 1.6} mi/h`);
        return this.speed / 1.6;
    }

    set speedUS(speedMih) {
        this.speed = speedMih * 1.6;
    }
}

const ford = new Car("Ford", 120);
ford.accelerate();
ford.accelerate();
ford.break();
ford.break();

let currSpeedInUSA = ford.speedUS;
console.log(currSpeedInUSA);

ford.speedUS = 500;
currSpeedInUSA = ford.speedUS;
console.log(currSpeedInUSA);
ford.accelerate();
