"use strict";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
    date = new Date();
    id = Date.now().slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // km
        this.duration = duration; // min
        this.calcPace();
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
    }

    calcPace() {
        this.pace = this.duration / this.distance;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
    }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Running([39, -12], 20, 30, 100);

// *******************************************
// ************* APP ARCHITECTURE ************
// *******************************************
class App {
    #map;
    #mapEvent;

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

        // Clear input fields
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = "";

        // Take workout coordinates
        const {
            latlng: { lat, lng },
        } = this.#mapEvent;

        // Add some style to popup
        const popupStyle = {
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
        };

        // Create and show marker on the map
        L.marker([lat, lng]).addTo(this.#map).bindPopup(L.popup(popupStyle)).setPopupContent("Running").openPopup();
    }
}

const app = new App();
