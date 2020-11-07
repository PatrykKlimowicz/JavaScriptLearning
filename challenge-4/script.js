/* 
1.  Use a ES6 classes to implement an Electric Car (called EV) 
    as a CHILD "class" of Car. Besides a name and current speed, 
    the EV also has the current battery charge in % ('charge' property);

2.  Make the 'charge' property private;

2.  Implement a 'chargeBattery' method which takes an argument 'chargeTo' and 
    sets the battery charge to 'chargeTo';

3.  Implement an 'accelerate' method that will increase the car's speed by 20, 
    and decrease the charge by 1%. Then log a message like this: 
    'Tesla going at 140 km/h, with a charge of 22%';

3.  Implement the ability to chain the 'accelerate' 
    and 'chargeBattery' methods of this class, and 
    also update the 'brake' method in the 'CarCl' class. 
    
4.  Create an electric car object and experiment with calling 'accelerate', 
    'brake' and 'chargeBattery'. Then experiment with chining.
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
        console.log(`SLOWER! ${this.name}'s speed is now ${this.speed} km/h`);
        return this;
    }
}

class EV extends Car {
    #charge;

    constructor(name, speed, charge) {
        super(name, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }

    accelerate() {
        this.speed += 10;
        this.#charge--;
        console.log(`${this.name}'s speed is now ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }
}

const tesla = new EV("Tesla", 140, 30);

tesla.accelerate();
tesla.break();
tesla.chargeBattery(50);

// Chaining
console.log("-------------------------------------------------------");
tesla.accelerate().accelerate().chargeBattery(90).accelerate().break();
