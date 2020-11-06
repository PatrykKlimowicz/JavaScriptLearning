"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const sectionFeatures = document.getElementById("section--1");
const pageTitle = document.querySelector("h1");
const navigationLinks = document.querySelectorAll(".nav__link");

const openModal = function (e) {
    e.preventDefault();

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

btnScrollTo.addEventListener("click", function (e) {
    const s1coords = sectionFeatures.getBoundingClientRect();

    // For older browser
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: "smooth",
    // });

    // For newer browsers
    sectionFeatures.scrollIntoView({ behavior: "smooth" });
});

// *********************************
// ********** NAVIGATION ***********
// *********************************

// navigationLinks.forEach(function (el) {
//     el.addEventListener("click", function (e) {
//         e.preventDefault();

//         const id = this.getAttribute("href");
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     });
// });

// In this way the Event Delegation is implemented. This is more efficient
// Because one listener is created instead of four
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");

        // prevent error while clicking on button
        id !== "#" && document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// *********************************
// ********* TAB COMPONENT *********
// *********************************

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
    e.preventDefault();

    // get the button even if clicked on number which is truly span element
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;

    // remove active class from all tabs and then add to clicked one
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");

    // Select tab which belongs to the button, remove visibility of others
    tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

// ****************************************
// ********* MENU HOVER ANIMATION *********
// ****************************************
const handleHover = function (e) {
    if (!e.target.classList.contains("nav__link")) return;

    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
        if (el !== link) {
            el.style.opacity = this;
            logo.style.opacity = this;
        }
    });
};

const nav = document.querySelector(".nav");

// Use bind to set this keyword as our desired opacity
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// ****************************************
// ********** STICKY NAVIGATION ***********
// ****************************************

// Not a good way
// window.addEventListener("scroll", function () {
//     const s1coords = sectionFeatures.getBoundingClientRect();

//     if (window.scrollY > s1coords.top) {
//         nav.classList.add("sticky");
//     } else {
//         nav.classList.remove("sticky");
//     }
// });

// The Intersection Observer API -- better way of above code
const stickyNavCb = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};

const navHeight = nav.getBoundingClientRect().height;
const obsOpts = {
    root: null,
    threshold: 0, // percentage of element view port height visible to call cb
    rootMargin: `-${navHeight}px`,
};

const header = document.querySelector(".header");
const headerObserver = new IntersectionObserver(stickyNavCb, obsOpts);
headerObserver.observe(header);

// ****************************************
// ************ SHOW SECTIONS *************
// ****************************************
const allSections = document.querySelectorAll(".section");
const showSectionsCb = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");

    // there is no need to observe section that was shown already
    observer.unobserve(entry.target);
};

const showSectionsOps = {
    root: null,
    threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(showSectionsCb, showSectionsOps);

allSections.forEach((sec) => {
    sectionObserver.observe(sec);
    sec.classList.add("section--hidden");
});

// ****************************************
// ********* LAZY LOADING IMAGES **********
// ****************************************
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImgCb = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // Replace small img with desired one
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () => entry.target.classList.remove("lazy-img"));

    // there is no need to observe loaded img
    observer.unobserve(entry.target);
};

const loadImgOps = {
    root: null,
    threshold: 0,
    rootMargin: "200px",
};

const imgObserver = new IntersectionObserver(loadImgCb, loadImgOps);
imgTargets.forEach((img) => imgObserver.observe(img));

// ****************************************
// ********** SLIDER COMPONENT ************
// ****************************************
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");
let currSlide = 0;
let maxSlide = slides.length;

// Chose the next slide to move on
const nextSlide = function () {
    if (currSlide === maxSlide - 1) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
    activateDot(currSlide);
};

// Chose the previous slide to move on
const prevSlide = function () {
    if (!currSlide) currSlide = maxSlide - 1;
    else currSlide--;

    goToSlide(currSlide);
    activateDot(currSlide);
};

// Move to choosed slide
const goToSlide = function (slideNum) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slideNum)}%)`));
};

// Create dots under slides
const createDots = function () {
    slides.forEach((_, indx) => {
        const el = `<button class="dots__dot" data-slide="${indx}""></button>`;
        dotsContainer.insertAdjacentHTML("beforeend", el);
    });
};

// Activate dot function
const activateDot = function (dotNum) {
    // Deactivate all dots
    const allDots = document.querySelectorAll(".dots__dot");
    allDots.forEach((d) => d.classList.remove("dots__dot--active"));

    // Active one that represents the visible slide
    const dotActive = document.querySelector(`.dots__dot[data-slide="${dotNum}"]`);
    dotActive.classList.add("dots__dot--active");
};

// Init the sliders functionality
const init = function () {
    // Put slides side by side
    slides.forEach((s, indx) => (s.style.transform = `translateX(${100 * indx}%)`));

    // Create dots marks
    createDots();

    // Start on middle slide
    currSlide = Math.trunc(maxSlide / 2);
    goToSlide(currSlide);

    // Activate dot accordingly
    activateDot(currSlide);
};
init();

// EVENT LISTENERS
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
        const slideNum = e.target.dataset.slide;
        goToSlide(slideNum);
    }
});
