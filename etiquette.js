const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const overlay = document.getElementById("menu-overlay");

navToggle.addEventListener("click", () => {
  const isVisible = primaryNav.hasAttribute("data-visible");

  if (isVisible) {
    primaryNav.removeAttribute("data-visible");
    overlay.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  } else {
    primaryNav.setAttribute("data-visible", "");
    overlay.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }
});

const offers = document.querySelectorAll('.offer-container');

offers.forEach(offer => {
  const arrow = offer.querySelector('.arrow');
  let animationInterval;

  offer.addEventListener('mouseenter', () => {
    let direction = 1;
    const distance = 3;

    animationInterval = setInterval(() => {
      arrow.style.transform = `translateX(${direction * distance}px)`;
      direction *= -1;
    }, 300);
  });

  offer.addEventListener('mouseleave', () => {
    clearInterval(animationInterval);
    arrow.style.transition = 'transform 0.3s ease-in-out';
    arrow.style.transform = 'translateX(0)';
  });
});


// ...existing code...

jQuery(document).ready(function($) {
  "use strict";
  $('#customers-testimonials').owlCarousel({
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 3 }
    }
  });
});




  const quotes = [
    "Let's lead the way.",
    "Let's make today so awesome that yesterday gets jealous.",
    "Your only limit is your mind.",
    "Small steps every day lead to big results.",
    "You don’t have to be perfect to start.",
    "Stay hungry, stay foolish. – Steve Jobs",
    "Discipline is the bridge between goals and accomplishment.",
    "Do something today your future self will thank you for."
  ];

  // Pick a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  document.addEventListener("DOMContentLoaded", function () {
    const quoteContainer = document.querySelector("#quote-text");
    if (quoteContainer) {
      quoteContainer.textContent = randomQuote;
      quoteContainer.classList.add("fade-in");
    }
  });
