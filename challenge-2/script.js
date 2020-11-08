"use strict";
///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading on screen functionality.
Tasks are not super-descriptive this time,
so that you can figure out some stuff on your own. 

1.  Create a function 'createImage' which receives imgPath as an input. 
    This function returns a promise which creates a new image 
    (use document.createElement('img')) and sets the .src attribute to the 
    provided image path. When the image is done loading, append it to the 
    DOM element with the 'images' class, and resolve the promise. 
    The fulfilled value should be the image element itself. 
    In case there is an error loading the image ('error' event), reject the promise.

2.  Comsume the promise using .then and also add an error handler;

3.  After the image has loaded, pause execution for 2 seconds using the 
    wait function we created earlier;

4.  After the 2 seconds have passed, hide the current image (set display to 'none'), 
    and load a second image 
    HINT: Use the image element returned by the createImage promise to hide the current image. 
    You will need a global variable for that 

5.  After the second image has loaded, pause execution for 2 seconds again;

6.  After the 2 seconds have passed, hide the current image.

TEST DATA:  Images in the img folder. Test the error handler by passing a wrong image path. 
            Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise 
            images load too fast.
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

const imgsPath = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg", "asdasdasd"];
let currentImg;

createImage(imgsPath[0])
    .then((res) => {
        currentImg = res;
        return wait(3);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage(imgsPath[1]);
    })
    .then((res) => {
        currentImg = res;
        return wait(3);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage(imgsPath[2]);
    })
    .then((res) => {
        currentImg = res;
        return wait(3);
    })
    .then(() => {
        currentImg.style.display = "none";
        return createImage(imgsPath[3]);
    })
    .then((res) => {
        currentImg = res;
        return wait(3);
    })
    .catch((err) => console.error(err.message));
