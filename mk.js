const container = document.querySelector('.one-layout');
const card = document.querySelector('.square-card');
const cardWidth = card ? card.offsetWidth + 16 : 260; // 16px = gap

document.querySelector('.next').addEventListener('click', () => {
  container.scrollBy({ left: cardWidth * 3, behavior: 'smooth' }); 
  // scrolls 3 cards at a time
});

document.querySelector('.prev').addEventListener('click', () => {
  container.scrollBy({ left: -cardWidth * 3, behavior: 'smooth' });
});
// experince.js

// Get references to container and preview list
const experienceFormsContainer = document.getElementById("experience-forms-container");


// We'll add a <ul> inside the preview section with id "experience-preview-list" for this script to update
// Make sure to add this <ul id="experience-preview-list"></ul> inside your preview experience section

const experiencePreviewList = document.getElementById("experience-preview-list");

// Function to create a new experience form block with remove button and input listeners
function createExperienceForm(id) {
  const container = document.createElement("div");
  container.className = "experience-entry";
  container.dataset.id = id;

  container.innerHTML = `
    <div class="forms forms-2">
      <div class="job">
        <label>Employer</label>
        <input type="text" class="employer" placeholder="COCA - COLA" />
      </div>
      <div class="employ">
        <label>Location</label>
        <input type="text" class="location" placeholder="Kampala" />
      </div> 
      <div class="locate">
        <label>Job Title</label>
        <input type="text" class="job-title" placeholder="Accountant" />
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
        <textarea class="eddescription" placeholder=".Helped with monthly financial reports and data entry"></textarea>
      </div>
      <button type="button" class="remove-experience-btn">Remove</button>
      
    </div>
  `;

  // Add input event listeners to update preview on change
  container.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", updateExperienceFromForms);
  });

  // Remove button event
  container.querySelector(".remove-experience-btn").addEventListener("click", () => {
    container.remove();
    updateExperienceFromForms();
  });

  return container;
}

// Add experience button event listener
document.getElementById("add-experience-btn").addEventListener("click", () => {
  const newId = Date.now(); // unique id
  const newForm = createExperienceForm(newId);
  experienceFormsContainer.appendChild(newForm);
});

// Function to update the experience preview section from all forms
function updateExperienceFromForms() {
  const experienceEntries = experienceFormsContainer.querySelectorAll(".experience-entry");

  if (!experiencePreviewList) return;

  if (experienceEntries.length === 0) {
    experiencePreviewList.innerHTML = "<li>No experience added yet.</li>";
    return;
  }

  experiencePreviewList.innerHTML = "";

  experienceEntries.forEach(entry => {
    const employer = entry.querySelector(".employer").value.trim();
    const location = entry.querySelector(".location").value.trim();
    const JobTitle = entry.querySelector(".job-title").value.trim();
    const startDate = entry.querySelector(".start-date").value.trim();
    const endDate = entry.querySelector(".end-date").value.trim();
    const description = entry.querySelector(".eddescription").value.trim();

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${employer || "Employer"}</strong> - ${location || "Location"}<br/>
      <em>${JobTitle || "JobTitle"}</em><br/>
      <span>${startDate || "25 January 2022"} - ${endDate || "13 November 2025"}</span>
      <p>${description || ""}</p>
    `;

    experiencePreviewList.appendChild(li);
  });
}

// Initial setup on page load: add one empty experience form and update preview
document.addEventListener('DOMContentLoaded', () => {
  // If container empty, add one form
  if (experienceFormsContainer && experienceFormsContainer.children.length === 0) {
    document.getElementById("add-experience-btn").click();
  }
  updateExperienceFromForms();
});



































