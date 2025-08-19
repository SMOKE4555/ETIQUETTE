// education.js

// Get references to container and preview list
const educationFormsContainer = document.getElementById("education-forms-container");

// We'll add a <ul> inside the preview section with id "education-preview-list" for this script to update
// Make sure to add this <ul id="education-preview-list"></ul> inside your preview Education section

const educationPreviewList = document.getElementById("education-preview-list");

// Function to create a new education form block with remove button and input listeners
function createEducationForm(id) {
  const container = document.createElement("div");
  container.className = "education-entry";
  container.dataset.id = id;

  container.innerHTML = `
    <div class="forms forms-2">
      <div class="job">
        <label>School name</label>
        <input type="text" class="school-name" placeholder="Makerere University" />
      </div>
      <div class="employ">
        <label>Location</label>
        <input type="text" class="school-location" placeholder="Kampala" />
      </div> 
      <div class="locate">
        <label>Degree</label>
        <input type="text" class="degree" placeholder="BA in Finance and Banking" />
      </div> 
      <div>
        <label>Start date</label>
        <input type="text" class="start-date" placeholder="MM/YYYY" />
      </div>
      <div>
        <label>End date</label>
        <input type="text" class="end-date" placeholder="MM/YYYY" />
      </div> 
      <div class="description">
        <label>Description</label>
        <textarea class="eddescription" placeholder="e.g., Graduated with honors, Dean's List (2022)"></textarea>
      </div>
      <button type="button" class="remove-education-btn">Remove</button>
      
    </div>
  `;

  // Add input event listeners to update preview on change
  container.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", updateEducationFromForms);
  });

  // Remove button event
  container.querySelector(".remove-education-btn").addEventListener("click", () => {
    container.remove();
    updateEducationFromForms();
  });

  return container;
}

// Add education button event listener
document.getElementById("add-education-btn").addEventListener("click", () => {
  const newId = Date.now(); // unique id
  const newForm = createEducationForm(newId);
  educationFormsContainer.appendChild(newForm);
});

// Function to update the education preview section from all forms
function updateEducationFromForms() {
  const educationEntries = educationFormsContainer.querySelectorAll(".education-entry");

  if (!educationPreviewList) return;

  if (educationEntries.length === 0) {
    educationPreviewList.innerHTML = "<li>No education added yet.</li>";
    return;
  }

  educationPreviewList.innerHTML = "";

  educationEntries.forEach(entry => {
    const schoolName = entry.querySelector(".school-name").value.trim();
    const location = entry.querySelector(".school-location").value.trim();
    const degree = entry.querySelector(".degree").value.trim();
    const startDate = entry.querySelector(".start-date").value.trim();
    const endDate = entry.querySelector(".end-date").value.trim();
    const description = entry.querySelector(".eddescription").value.trim();

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${schoolName || "School Name"}</strong> - ${location || "Location"}<br/>
      <em>${degree || "Degree"}</em><br/>
      <span>${startDate || "Start Date"} - ${endDate || "End Date"}</span>
      <p>${description || ""}</p>
    `;

    educationPreviewList.appendChild(li);
  });
}

// Initial setup on page load: add one empty education form and update preview
document.addEventListener('DOMContentLoaded', () => {
  // If container empty, add one form
  if (educationFormsContainer && educationFormsContainer.children.length === 0) {
    document.getElementById("add-education-btn").click();
  }
  updateEducationFromForms();
});


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
