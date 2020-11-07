"use strict";

class Workout {
    date = new Date();
    id = Date.now();

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // km
        this.duration = duration; // min
    }

    _setDescription() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDay()}`;
    }
}

class Running extends Workout {
    type = "running";

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
    }
}

class Cycling extends Workout {
    type = "cycling";

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
    }
}

// *******************************************
// ************* APP ARCHITECTURE ************
// *******************************************
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        this._getPosition();

        // Event listeners
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationForm.bind(this));
    }

    _getPosition() {
        navigator.geolocation?.getCurrentPosition(this._loadMap.bind(this), () => alert("Please allow geo location!"));
    }

    _loadMap(pos) {
        const {
            coords: { latitude, longitude },
        } = pos;
        const coords = [latitude, longitude];

        // map is leaflet object
        this.#map = L.map("map").setView(coords, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));
    }

    _showForm(e) {
        this.#mapEvent = e;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _toggleElevationForm(e) {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    _newWorkout(e) {
        e.preventDefault();

        // helper functions
        const dataIsValid = (...data) => data.every((val) => Number.isFinite(val));
        const dataIsPositive = (...data) => data.every((val) => val > 0);
        const clearInputs = () => (inputDistance.value = inputCadence.value = inputElevation.value = inputDuration.value = "");

        // get common data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        // variables needed in function
        const {
            latlng: { lat, lng },
        } = this.#mapEvent;
        let workout;

        // check workout type
        if (type === "running") {
            const cadence = +inputCadence.value;

            // check if data are valid
            if (!dataIsValid(distance, duration, cadence) || !dataIsPositive(distance, duration, cadence)) {
                clearInputs();
                return alert("Inputs must be positive numbers!");
            }

            // process the data - create running obj
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // check workout type
        if (type === "cycling") {
            const elevGain = +inputElevation.value;

            // check if data are valid
            if (!dataIsValid(distance, duration, elevGain) || !dataIsPositive(distance, duration)) {
                clearInputs();
                return alert("Inputs must be positive numbers!");
            }

            // process the data - create cycling object
            workout = new Cycling([lat, lng], distance, duration, elevGain);
        }

        // clear inputs and hide form
        clearInputs();
        form.classList.add("hidden");

        // add new obj to the workouts arr
        this.#workouts.push(workout);

        // render workout on map as marker
        this._renderWorkoutMarker(workout);

        // render workout on list
        this._renderWorkoutLabel(workout);
    }

    _renderWorkoutMarker(workout) {
        // add some style to popup based on workout type
        const popupStyle = {
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
        };

        // create and show workout marker on the map
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(L.popup(popupStyle))
            .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
            .openPopup();
    }

    _renderWorkoutLabel(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>`;

        if (workout.type === "running") {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>`;
        } else if (workout.type === "cycling") {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>`;
        }

        form.insertAdjacentHTML("afterend", html);
    }
}

const app = new App();
