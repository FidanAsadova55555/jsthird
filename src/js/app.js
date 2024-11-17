"use strict";

let lastScrollTop = 0; 

window.addEventListener("scroll", function() {
  const header = document.querySelector(".header");
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    header.classList+=" hidden";
  } else {
    header.classList.remove("hidden");
    header.classList.add("scrolled"); 
  }

   if (currentScroll === 0) {
    header.classList.remove("scrolled");
  }

  lastScrollTop = currentScroll; 
});
