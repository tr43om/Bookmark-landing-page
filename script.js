"use strict";

/* NAVIGATION MENU */
const navigation = document.querySelector(".navigation__nav");
const hamburger = document.querySelector(".navigation__hamburger");
const iconOpened = document.querySelector(".navigation__hamburger--opened");
const iconClosed = document.querySelector(".navigation__hamburger--closed");

const toggleNavigation = (_) => {
  if (navigation.classList.contains("navigation__nav--opened")) {
    navigation.classList.remove("navigation__nav--opened");
    iconClosed.style.display = "none";
    iconOpened.style.display = "block";
  } else {
    navigation.classList.add("navigation__nav--opened");
    iconClosed.style.display = "block";
    iconOpened.style.display = "none";
  }
};

hamburger.addEventListener("click", toggleNavigation);
