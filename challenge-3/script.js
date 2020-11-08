"use strict";

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, 
this time using async/await (only the part where the promise is consumed). 
Compare the two versions, think about the big differences, and see which one you 
like more.

Don't forget to test the error handler, 
and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1.  Create an async function 'loadAll' that receives an array of image paths 'imgArr';

2.  Use .map to loop over the array, to load all the images with the 
    'createImage' function (call the resulting array 'imgs')

3.  Check out the 'imgs' array in the console! Is it like you expected?

4.  Use a promise combinator function to actually get the images from the array

5.  Add the 'parallel' class to all the images.

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. 
To test, turn off the 'loadNPause' function.

*/

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        let img = document.createElement("img");
        img.src = imgPath;

        // success
        img.addEventListener("load", function () {
            imgContainer.append(img);
            resolve(img);
        });

        // error
        img.addEventListener("error", function () {
            reject(new Error("Image not found"));
        });
    });
};

// Promisifying setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const imgsPath = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];
let currentImg;

const loadNPause = async function () {
    try {
        // first img
        let img = await createImage(imgsPath[0]);
        await wait(2);

        // second img
        img.style.display = "none";
        img = await createImage(imgsPath[1]);
        await wait(2);

        // third img
        img.style.display = "none";
        img = await createImage(imgsPath[2]);
        await wait(2);
    } catch (error) {
        console.log(error);
    }
};
//loadNPause();

const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async (p) => await createImage(p));

        const imgsEl = await Promise.all(imgs);
        imgsEl.forEach((img) => img.classList.add("parallel"));
    } catch (error) {
        console.log(error);
    }
};

const imgArr = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];
loadAll(imgArr);
