"use strict";
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country 
ONLY based on GPS coordinates. For that, you will use a API to geocode coordinates.
Here are your tasks:

1.  Create a function 'whereAmI' which takes as inputs a latitude value (lat) 
    and a longitude value (lng) (these are GPS coordinates, examples are below).

2.  Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means 
    to convert coordinates to a meaningful location, like a city and country name. 
    Use this API to do reverse geocoding: https://geocode.xyz/api.
    The AJAX call will be done to a URL with this format: 
        https://geocode.xyz/52.508,13.381?geoit=json. 
    Use the fetch API and promises to get the data.

3.  Once you have the data, take a look at it in the console to see all the 
    attributes that you recieved about the provided location. Then, using 
    this data, log a messsage like this to the console: 
    'You are in Berlin, Germany'

4.  Chain a .catch method to the end of the promise chain and log errors 
    to the console

5.  This API allows you to make only 3 requests per second. If you reload fast, you 
    will get this error with code 403. This is an error with the request. 
    Remember, fetch() does NOT reject the promise in this case. 
    So create an error to reject the promise yourself, with a meaningful error message.

6.  Now it's time to use the received data to render a country. 
    So take the relevant attribute from the geocoding API result, 
    and plug it into the countries API:
    https://restcountries.eu/rest/v2/name/poland.

7. Render the country and catch any errors

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 3: -33.933, 18.474
*/

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (d) {
    let [data] = d;
    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} mln people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
};

const renderError = function (msg) {
    const html = `
    <article class="country">
      <div class="country__data">
        <p class="country__row">${msg}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
};

const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error occured with status: ${response.status}`);
    return response.json();
};

const findAndRenderCountry = function (lat, lng) {
    getData(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then((data) => {
            console.log(`You are in ${data.city}, ${data.country}.`);
            return getData(`https://restcountries.eu/rest/v2/name/${data.country}`);
        })
        .then((data) => renderCountry(data))
        .catch((err) => renderError(`${err.message} ${err.message.includes("403") ? "- API blocked us" : "- check Internet connection"}`))
        .finally(() => (countriesContainer.style.opacity = 1));
};

const whereAmI = function () {
    const country1 = [52.508, 13.381];
    const country2 = [19.037, 72.873];
    const country3 = [-33.933, 18.474];

    findAndRenderCountry(...country3);
    findAndRenderCountry(...country1);
    setTimeout(() => findAndRenderCountry(...country2), 3000);
};

btn.addEventListener("click", whereAmI);
