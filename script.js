"use strict";

// Elements in HTML
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// // *****************************
// // The old way - XMLHttpRequest
// // *****************************
// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
//     request.addEventListener("load", function (e) {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln people</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//         </article>
//     `;

//         countriesContainer.insertAdjacentHTML("beforeend", html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// // the order is not strict
// // getCountryData("poland");
// // getCountryData("portugal");
// // getCountryData("usa");

// // **********************************************
// // XMLHttpRequest that depends on another request
// // **********************************************
// const getCountryAndNeighbour = function (country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
//     request.addEventListener("load", function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country 1
//         renderCountry(data);

//         // Get neighbour country
//         const [neighbour] = data.borders;

//         // This is not the good way
//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();

//         // request inside another request's cb function is not good idea
//         request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         request2.send();
//         request2.addEventListener("load", function () {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, "neighbour");
//         });
//     });
// };
// // getCountryAndNeighbour("poland");

// // **********************************************
// // Promises - new way of asynchronous tasks
// // **********************************************

// // HELPER FUNCTION:
const renderCountry = function (data, className = "") {
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
};

// const getJSON = function (url, errorMsg = "Something went wrong") {
//     return fetch(url).then((response) => {
//         if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//         return response.json();
//     });
// };

// const getCountryDataNew = function (country) {
//     // Try to get country form API
//     getJSON(`https://restcountries.eu/rest/v2/name/${country}`, "Country not found")
//         // in case of success
//         .then((data) => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];
//             if (!neighbour) throw new Error("No neighbour found!");

//             // Try to get neoghbour from API
//             return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, "Country not found");
//         })
//         .then((data) => renderCountry(data, "neighbour"))

//         // in case of error, no need to distiguish
//         .catch((err) => {
//             renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//         })

//         // no matter if there was error or not - show HTML element on page
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// };

// // With this the offline state can be simulated
// btn.addEventListener("click", function () {
//     getCountryDataNew("poland");
// });

// console.log("test start"); // 1
// setTimeout(() => console.log("0 sec timer"), 0); // 2
// Promise.resolve("Resolved promise 1").then((res) => console.log(res)); // 3

// Promise.resolve("Resolved promise 2").then((res) => {
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log(res);
// });
// console.log("test end"); // 4
// ORDER: 1, 4, 3, 2
// After adding Promise with long microtask the callback queue will be blocked

// // Building promises
// const lottery = new Promise(function (resolve, reject) {
//     console.log("Lottery draw is happening...");
//     setTimeout(() => {
//         if (Math.random() >= 0.5) {
//             resolve("You win lottery!");
//         } else {
//             reject(new Error("You lose..."));
//         }
//     }, 2000);
// });

// lottery.then((res) => console.log(res)).catch((err) => console.log(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, seconds * 1000);
//     });
// };

// console.log("Wait...");
// wait(2).then(() => console.log("wait finish"));

// wait(3)
//     .then(() => {
//         console.log("wait finish 3s");
//         return wait(4);
//     })
//     .then(() => console.log("wait finish 4 s"));

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => resolve(position),
        //     (err) => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// getPosition()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// **********************************
// **********************************
// ES6 PROMISES
// **********************************
// **********************************

// const whereAmI = async function () {
//     try {
//         // geolocation
//         const pos = await getPosition();
//         const { latitude: lat, longitude: lng } = pos.coords;

//         // obtain country based on location
//         const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//         if (!resGeo.ok) throw new Error("Problem getting location!");
//         const dataGeo = await resGeo.json();

//         // get info and render card
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
//         const data = await res.json();
//         renderCountry(data[0]);

//         return `You are in ${dataGeo.city}, ${dataGeo.country}.`;
//     } catch (err) {
//         renderError(err.message);

//         // rethrowing an error
//         throw err;
//     }
// };

// // async IIFE
// // To grab string which was returned in whereAmI
// (async function () {
//     console.log(`1: Start getting location.`);
//     try {
//         let city = await whereAmI();
//         console.log(`2: ${city}`);
//     } catch (error) {
//         console.log(`2: ${error}`);
//     }
//     console.log(`3: Finished getting location.`);
// })();

// **********************************
// **********************************
// RUNNING PROMISES IN PARALLEL
// **********************************
// **********************************
const getJSON = function (url, errorMsg = "Something went wrong") {
    return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    });
};

const get3Countries = async function (c1, c2, c3) {
    try {
        // One promise reject will reject Promise.all
        const data = await Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
        ]);

        //console.log(data.map((d) => d[0].capital));
    } catch (error) {
        //console.error(error);
    }
};

get3Countries("poland", "canada", "tanzania");

// **************************************************************
// **************************************************************
// PROMICE RACE - get the fastest request fullfilled or rejected
// **************************************************************
// **************************************************************
(async function () {
    const [data] = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/italy`),
        getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
        getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    ]);

    // console.log(data);
})();

const timeout = function (sec) {
    return new Promise(function (_, reject) {
        setTimeout(() => reject(new Error("Reject wins")), sec * 1000);
    });
};

Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/poland`), timeout(0.1)]).then((res) => console.log(res));

// **************************************************************
// **************************************************************
// PROMICE allSettled - return all results of all promises
// **************************************************************
// **************************************************************

Promise.allSettled([Promise.resolve("succes1"), Promise.resolve("succes2"), Promise.resolve("succes3"), Promise.reject("error1")]).then((res) =>
    console.log(res)
);

// **************************************************************
// **************************************************************
// PROMICE ANY - return FIRST FULFILL promise
// **************************************************************
// **************************************************************
Promise.any([Promise.resolve("succes1"), Promise.resolve("succes2"), Promise.resolve("succes3"), Promise.reject("error1")]).then((res) => console.log(res));
