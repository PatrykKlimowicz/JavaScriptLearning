///////////////////////////////////////
// Coding Challenge #3

/* 
1.  Use a constructor function to implement an Electric Car (called EV) 
    as a CHILD "class" of Car. Besides a name and current speed, 
    the EV also has the current battery charge in % ('charge' property);

2.  Implement a 'chargeBattery' method which takes an argument 'chargeTo' and 
    sets the battery charge to 'chargeTo';

3.  Implement an 'accelerate' method that will increase the car's speed by 20, 
    and decrease the charge by 1%. Then log a message like this: 
    'Tesla going at 140 km/h, with a charge of 22%';

4.  Create an electric car object and experiment with calling 'accelerate', 
    'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 
    'accelerate'! 
    
    DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

// Constructor function for Car
const Car = function (name, speed) {
    this.name = name;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`FASTER! ${this.name}'s speed is now ${this.speed} km/h`);
};

Car.prototype.break = function () {
    this.speed -= 5;
    console.log(`SLOWER! ${this.name}'s speed is now ${this.speed} km/h`);
};

// Constructor function for Electric vehicle based on Car
const EV = function (name, speed, charge) {
    Car.call(this, name, speed);
    this.charge = charge;
};

// Prototypes chaining
EV.prototype = Object.create(Car.prototype);

// override the accelerate method
EV.prototype.accelerate = function () {
    this.speed += 10;
    this.charge -= 1;
    console.log(`${this.name} going at ${this.speed} km/h, with a charge of ${this.charge}%.`);
};

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
};

console.log("------------- CAR ---------------");

const regularCar = new Car("Ford", 120);
regularCar.accelerate();
regularCar.accelerate();
regularCar.break();

console.log("------------- EV ---------------");

const electricCar = new EV("Tesla", 120, 22);
electricCar.accelerate();
electricCar.accelerate(); // accelerate is overrided
electricCar.break(); // break from reguralCar prototype
electricCar.accelerate();
electricCar.accelerate();
electricCar.chargeBattery(90);
electricCar.accelerate();
