"use strict";
const tabsContainer = document.querySelector(".tabs");
const navigation = document.querySelector(".navigation__nav");
const navigationBtn = document.querySelector(".navigation__button");
/* TAB COMPONENT */

tabsContainer.addEventListener("click", (e) => {
  // Buttons
  const tabsBtns = document.querySelectorAll(".tabs__tab");
  // Content
  const tabs = document.querySelectorAll(".tabs__content");
  // current element
  const tabContent = document.querySelector(
    `.tabs__content--${e.target.dataset.tab}`
  );

  // Delete all CONTENT active classes
  tabs.forEach((tab) => tab.classList.remove("tabs__content--active"));
  // Add active class to CONTENT
  tabContent.classList.add("tabs__content--active");
  // Delete all BTNS active classes
  tabsBtns.forEach((btn) => btn.classList.remove("tabs__tab--active"));
  // Add active class to BUTTONS
  e.target.classList.add("tabs__tab--active");
});

/* FAQ COMPONENT */
const faqContainer = document.querySelector(".faq__items");

faqContainer.addEventListener("click", (e) => {
  e.preventDefault();
  // current elements
  const clicked = e.target;

  // guard clause
  if (!clicked) return;

  if (clicked.classList.contains("faq__question")) {
    clicked.parentElement.classList.toggle("active");
  }
});

/* ANIMATION SCROLL */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// All elements that have scroll animation
const scrollElements = document.querySelectorAll(".js-scroll");

// Checking if the element in view
const elementInView = (el) => {
  const elTop = el.getBoundingClientRect().top;
  return (
    elTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (100 / 100) &&
    elTop > -(window.innerHeight || document.documentElement.clientHeight) * 0.4
  );
};

// Map for slide animations. I did it so I can remove and class with animation
const scrollAnimationsMap = new Map();
scrollElements.forEach((el) => {
  scrollAnimationsMap.set(
    document.querySelector(`.${el.classList[0]}`),
    `${[...el.classList].find((name) => name.includes("slide")) || ""}`
  );
});

// If scroll element doesn't have animation class, delete it
for (const [el, animation] of scrollAnimationsMap)
  if (animation === "") scrollAnimationsMap.delete(el);

// Display element
const displayScrollElement = (element, animation) => {
  element.classList.add("scrolled", animation);
};

// Hide element
const hideScrollElement = (element, animation) => {
  element.classList.remove("scrolled", animation);
};

// Displaying element if it's in view and hide it if it's not
const handleScrollAnimation = () => {
  scrollAnimationsMap.forEach((animation, el) => {
    if (elementInView(el)) {
      displayScrollElement(el, animation);
    } else {
      hideScrollElement(el, animation);
    }
  });
};

let throttleTimer = false;
const throttle = (callback, time) => {
  // don't run the function while throttle timer is true
  if (throttleTimer) return;

  // first set throttle timer to true so the function doesn't run
  throttleTimer = true;

  setTimeout(() => {
    //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed
    callback();
    throttleTimer = false;
  }, time);
};

//Initialize function for first screen
handleScrollAnimation();
// Animation on scroll
window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 300);
});

/* MENU FADE ANIMATION */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleHover = function (e) {
  if (e.target.classList.contains("navigation__link")) {
    const link = e.target;
    const siblings = link.closest("nav").querySelectorAll(".navigation__link");
    const logo = link.closest("nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navigation.addEventListener("mouseover", handleHover.bind(0.5));

navigation.addEventListener("mouseout", handleHover.bind(1));

/* STICKY NAV */
const intro = document.querySelector(".intro");
const navHeight = document
  .querySelector(".navigation")
  .getBoundingClientRect().height;
console.log(navHeight);
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky-nav");
    navigationBtn.classList.add("sticky-btn");
  } else {
    navigationBtn.classList.remove("sticky-nav");
    navigationBtn.classList.remove("sticky-btn");
  }
};
const observer = new IntersectionObserver(stickyNav, options);

observer.observe(intro);
