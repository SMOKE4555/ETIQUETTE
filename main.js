
// ----------------------------------------------------------------------
// STEP NAVIGATION AND SKILLS LOGIC (Resume Builder)
// ----------------------------------------------------------------------
let currentStep = 1;
const totalSteps = 6;

function showStep(step) {
    document.querySelectorAll('.step').forEach(stepDiv => {
        stepDiv.classList.remove('active');
    });

    const current = document.querySelector(`.step[data-step="${step}"]`);
    if (current) current.classList.add('active');

    document.querySelectorAll('.progress-step').forEach(p => {
        const stepNum = parseInt(p.getAttribute('data-step'));
        p.classList.remove('active');
        if (stepNum === step) {
            p.classList.add('active');
        }
    });
    updateButtonVisibility(step);
}

function updateButtonVisibility(step) {
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (step === 1) {
        if (backBtn) backBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (submitBtn) submitBtn.style.display = 'none';
    } else if (step === totalSteps) {
        if (backBtn) backBtn.style.display = 'inline-block';
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'inline-block';
    } else {
        if (backBtn) backBtn.style.display = 'inline-block';
        if (nextBtn) nextBtn.style.display = 'inline-block';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function get(id) {
    return document.getElementById(id)?.value || '';
}

function updatePreview() {
    // Only update if elements exist (relevant for both resume builder and homepage)
    if (document.getElementById("preview-name")) document.getElementById("preview-name").textContent = `${get("firstName")} ${get("lastName")}`;
    if (document.getElementById("preview-title")) document.getElementById("preview-title").textContent = get("jobTitle");
    if (document.getElementById("preview-contact")) document.getElementById("preview-contact").textContent = get("phone");
    if (document.getElementById("preview-email")) document.getElementById("preview-email").textContent = get("email");

    setPlaceholdersInPreview();
    // Only run if the resume elements are present
    if (typeof updateExperienceFromForms === 'function') updateExperienceFromForms();
    if (typeof updateEducationFromForms === 'function') updateEducationFromForms();
}

if (document.getElementById("resume-form")) {
    document.getElementById("resume-form").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Resume completed!");
    });
}

let hardSkillCount = 0;
let softSkillCount = 0;

const hardSkillsContainer = document.getElementById("hard-skills-container");
const softSkillsContainer = document.getElementById("soft-skills-container");

// Skill functions
function addHardSkill() {
    // ... (rest of addHardSkill function) ...
    hardSkillCount++;
    const group = document.createElement("div");
    group.className = "hard-skill";
    group.innerHTML = `
        <input type="text" id="hard-skill${hardSkillCount}" placeholder="e.g. JavaScript" class="hard-skill-name">
        <input type="range" id="hard-skill${hardSkillCount}-level" min="0" max="100" value="70" class="hard-skill-range">
        <button type="button" class="remove-hard-skill"><img src="IMAGES/trash.svg" alt=""></button>
    `;
    if(hardSkillsContainer) hardSkillsContainer.appendChild(group);
    const hardSkillInput = document.getElementById(`hard-skill${hardSkillCount}`);
    const hardSkillLevel = document.getElementById(`hard-skill${hardSkillCount}-level`);
    if(hardSkillInput) hardSkillInput.addEventListener("input", updateSkillsPreview);
    if(hardSkillLevel) hardSkillLevel.addEventListener("input", updateSkillsPreview);
    updateSkillsPreview();
}

function addSoftSkill() {
    // ... (rest of addSoftSkill function) ...
    softSkillCount++;
    const group = document.createElement("div");
    group.className = "hard-skill";
    group.innerHTML = `
        <input type="text" id="soft-skill${softSkillCount}" placeholder="e.g. Teamwork">
        <button type="button" class="remove-hard-skill"><img src="IMAGES/trash.svg" alt=""></button>
    `;
    if(softSkillsContainer) softSkillsContainer.appendChild(group);
    const softSkillInput = document.getElementById(`soft-skill${softSkillCount}`);
    if(softSkillInput) softSkillInput.addEventListener("input", updateSkillsPreview);
    updateSkillsPreview();
}


document.addEventListener("click", function (e) {
    if (e.target.closest(".remove-hard-skill")) {
        const skillGroup = e.target.closest(".hard-skill");
        if (skillGroup) {
            skillGroup.remove();
            updateSkillsPreview();
        }
    }
});

function updateSkillsPreview() {
    const hardPreview = document.getElementById("hard-skills-preview");
    if (hardPreview) hardPreview.innerHTML = "<h4>Hard Skills</h4>";

    if (hardPreview) {
        document.querySelectorAll('#hard-skills-container .hard-skill').forEach(group => {
            const nameInput = group.querySelector('.hard-skill-name');
            const levelInput = group.querySelector('.hard-skill-range');

            if (nameInput && levelInput && nameInput.value.trim() !== "") {
                hardPreview.innerHTML += `
                    <div class="skill-bar">
                        <div class="skill-name">${nameInput.value}</div>
                        <div class="bar">
                            <div class="fill" style="width: ${levelInput.value}%"></div>
                        </div>
                    </div>
                `;
            }
        });
    }

    const softPreview = document.getElementById("soft-skills-preview");
    if (softPreview) softPreview.innerHTML = "<h4>Soft Skills</h4><ul>";

    if (softPreview) {
        document.querySelectorAll('#soft-skills-container .hard-skill input[type="text"]').forEach(input => {
            if (input.value.trim() !== "") {
                softPreview.innerHTML += `<li>${input.value}</li>`;
            }
        });
        softPreview.innerHTML += "</ul>";
    }
}

function setPlaceholdersInPreview() {
    const name = `${get("firstName")} ${get("lastName")}`.trim();
    if (document.getElementById("preview-name")) document.getElementById("preview-name").textContent = name || "YOUR NAME";

    const title = get("jobTitle").trim();
    if (document.getElementById("preview-title")) document.getElementById("preview-title").textContent = title || "";

    const phone = get("phone");
    if (document.getElementById("preview-contact")) document.getElementById("preview-contact").textContent = phone || "+256 000 000";

    const email = get("email");
    if (document.getElementById("preview-email")) document.getElementById("preview-email").textContent = email || "your.email@example.com";

    const summaryText = get("summary").trim();
    const summaryEl = document.getElementById("preview-summary-1");
    if (summaryEl) {
        summaryEl.textContent = summaryText || "Write a brief summary highlighting your experience, skills and goals.";
    }
}

// ----------------------------------------------------------------------
// EXPERIENCE LOGIC
// ----------------------------------------------------------------------
const experienceFormsContainer = document.getElementById("experience-forms-container");
const experiencePreviewList = document.getElementById("experience-preview-list");

function createExperienceForm(id) {
    const container = document.createElement("div");
    container.className = "experience-entry";
    container.dataset.id = id;

    container.innerHTML = `
        <div class="forms forms-2">
            <div class="job"><label>Employer</label><input type="text" class="employer" placeholder="COCA - COLA" /></div>
            <div class="employ"><label>Location</label><input type="text" class="location" placeholder="Kampala" /></div> 
            <div class="locate"><label>Job Title</label><input type="text" class="job-title" placeholder="Accountant" /></div> 
            <div><label>Start date</label><input type="text" class="start-date" placeholder="MM/YYYY" /></div>
            <div><label>End date</label><input type="text" class="end-date" placeholder="MM/YYYY" /></div> 
            <div class="description"><label>Description</label><textarea class="addescription" placeholder=".Helped with monthly financial reports and data entry"></textarea></div>
            <button type="button" class="remove-experience-btn">Remove</button>
        </div>
    `;

    container.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", updateExperienceFromForms);
    });

    container.querySelector(".remove-experience-btn").addEventListener("click", () => {
        container.remove();
        updateExperienceFromForms();
    });

    return container;
}

if (document.getElementById("add-experience-btn")) {
    document.getElementById("add-experience-btn").addEventListener("click", () => {
        const newId = Date.now();
        const newForm = createExperienceForm(newId);
        if(experienceFormsContainer) experienceFormsContainer.appendChild(newForm);
        updateExperienceFromForms();
    });
}

function updateExperienceFromForms() {
    const experienceEntries = experienceFormsContainer ? experienceFormsContainer.querySelectorAll(".experience-entry") : [];

    if (!experiencePreviewList) return;

    experiencePreviewList.innerHTML = "";

    if (experienceEntries.length === 0) {
        experiencePreviewList.innerHTML = "<li>No experience added yet.</li>";
        return;
    }

    experienceEntries.forEach(entry => {
        const employer = entry.querySelector(".employer").value.trim();
        const location = entry.querySelector(".location").value.trim();
        const JobTitle = entry.querySelector(".job-title").value.trim();
        const startDate = entry.querySelector(".start-date").value.trim();
        const endDate = entry.querySelector(".end-date").value.trim();
        const description = entry.querySelector(".addescription").value.trim();

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${employer || "Employer"}</strong> - ${location || "Location"}<br/>
            <em>${JobTitle || "JobTitle"}</em><br/>
            <span>${startDate || "Start Date"} - ${endDate || "End Date"}</span>
            <p>${description || ""}</p>
        `;
        experiencePreviewList.appendChild(li);
    });
}


// ----------------------------------------------------------------------
// EDUCATION LOGIC
// ----------------------------------------------------------------------
const educationFormsContainer = document.getElementById("education-forms-container");
const educationPreviewList = document.getElementById("education-preview-list");

function createEducationForm(id) {
    const container = document.createElement("div");
    container.className = "education-entry";
    container.dataset.id = id;

    container.innerHTML = `
        <div class="forms forms-2">
            <div class="job"><label>School name</label><input type="text" class="school-name" placeholder="Makerere University" /></div>
            <div class="employ"><label>Location</label><input type="text" class="school-location" placeholder="Kampala" /></div> 
            <div class="locate"><label>Degree</label><input type="text" class="degree" placeholder="BA in Finance and Banking" /></div> 
            <div><label>Start date</label><input type="text" class="start-date" placeholder="MM/YYYY" /></div>
            <div><label>End date</label><input type="text" class="end-date" placeholder="MM/YYYY" /></div> 
            <div class="description"><label>Description</label><textarea class="eddescription" placeholder="e.g., Graduated with honors, Dean's List (2022)"></textarea></div>
            <button type="button" class="remove-education-btn">Remove</button>
        </div>
    `;

    container.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", updateEducationFromForms);
    });

    container.querySelector(".remove-education-btn").addEventListener("click", () => {
        container.remove();
        updateEducationFromForms();
    });

    return container;
}

if (document.getElementById("add-education-btn")) {
    document.getElementById("add-education-btn").addEventListener("click", () => {
        const newId = Date.now();
        const newForm = createEducationForm(newId);
        if(educationFormsContainer) educationFormsContainer.appendChild(newForm);
        updateEducationFromForms();
    });
}

function updateEducationFromForms() {
    const educationEntries = educationFormsContainer ? educationFormsContainer.querySelectorAll(".education-entry") : [];

    if (!educationPreviewList) return;

    educationPreviewList.innerHTML = "";

    if (educationEntries.length === 0) {
        educationPreviewList.innerHTML = "<li>No education added yet.</li>";
        return;
    }

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

// ----------------------------------------------------------------------
// HOMEPAGE FEATURES (MISC UTILITIES)
// ----------------------------------------------------------------------

// 1. Full Offers/Readmore Animation Logic (Restored)
const offers = document.querySelectorAll('.offer-container');
offers.forEach(offer => {
    const arrow = offer.querySelector('.arrow');
    // Ensure both arrow and its parent are present before adding listeners
    if (arrow) { 
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
    }
});


// 2. OWL CAROUSEL LOGIC (Reinserted and wrapped for safe execution)
if (typeof jQuery !== 'undefined') {
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
}


// 3. DAILY MOTIVATION (QUOTES) LOGIC (Restored)
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

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
// The rest of the quote logic is inside the main DOMContentLoaded below


// ----------------------------------------------------------------------
// FINAL DOM LOAD LOGIC & INIT
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Resume Builder Init
    if (document.querySelector('.step')) { // Only run resume init if step elements exist
        showStep(currentStep);
        updatePreview();
        
        // Initial state for Experience
        if (experienceFormsContainer && experienceFormsContainer.children.length === 0) {
            const addExpBtn = document.getElementById("add-experience-btn");
            if(addExpBtn) addExpBtn.click();
        }
        updateExperienceFromForms();
        
        // Initial state for Education
        if (educationFormsContainer && educationFormsContainer.children.length === 0) {
            const addEduBtn = document.getElementById("add-education-btn");
            if(addEduBtn) addEduBtn.click();
        }
        updateEducationFromForms();
    }
    
    // 2. Homepage Quotes Init
    const quoteContainer = document.querySelector("#quote-text");
    if (quoteContainer) {
        quoteContainer.textContent = randomQuote;
        quoteContainer.classList.add("fade-in");
    }

    // 3. Navigation Toggle Logic
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const primaryNav = document.querySelector(".primary-navigation");
    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isVisible = primaryNav.hasAttribute("data-visible");
            if (isVisible) {
                primaryNav.removeAttribute("data-visible");
                navToggle.setAttribute("aria-expanded", "false");
            } else {
                primaryNav.setAttribute("data-visible", "");
                navToggle.setAttribute("aria-expanded", "true");
            }
        });
    }
});
// // ----------------------------------------------------------------------
    // // STEP NAVIGATION AND SKILLS LOGIC (From your old inline script)
    // // ----------------------------------------------------------------------
    // let currentStep = 1;
    // const totalSteps = 6;

    // function showStep(step) {
    //   document.querySelectorAll('.step').forEach(stepDiv => {
    //     stepDiv.classList.remove('active');
    //   });

    //   const current = document.querySelector(`.step[data-step="${step}"]`);
    //   if (current) current.classList.add('active');

    //   document.querySelectorAll('.progress-step').forEach(p => {
    //     const stepNum = parseInt(p.getAttribute('data-step'));
    //     p.classList.remove('active');
    //     if (stepNum === step) {
    //       p.classList.add('active');
    //     }
    //   });
    //   updateButtonVisibility(step);
    // }

    // function updateButtonVisibility(step) {
    //   const backBtn = document.getElementById('back-btn');
    //   const nextBtn = document.getElementById('next-btn');
    //   const submitBtn = document.getElementById('submit-btn');

    //   if (step === 1) {
    //     backBtn.style.display = 'none';
    //     nextBtn.style.display = 'inline-block';
    //     submitBtn.style.display = 'none';
    //   } else if (step === totalSteps) {
    //     backBtn.style.display = 'inline-block';
    //     nextBtn.style.display = 'none';
    //     submitBtn.style.display = 'inline-block';
    //   } else {
    //     backBtn.style.display = 'inline-block';
    //     nextBtn.style.display = 'inline-block';
    //     submitBtn.style.display = 'none';
    //   }
    // }

    // function nextStep() {
    //   if (currentStep < totalSteps) {
    //     currentStep++;
    //     showStep(currentStep);
    //   }
    // }

    // function prevStep() {
    //   if (currentStep > 1) {
    //     currentStep--;
    //     showStep(currentStep);
    //   }
    // }

    // function get(id) {
    //   return document.getElementById(id)?.value || '';
    // }

    // function updatePreview() {
    //   document.getElementById("preview-name").textContent = `${get("firstName")} ${get("lastName")}`;
    //   document.getElementById("preview-title").textContent = get("jobTitle");
    //   document.getElementById("preview-contact").textContent = get("phone");
    //   document.getElementById("preview-email").textContent = get("email");
      
    //   // Note: Removed the broken expTitle/expDate/employer preview updates as they rely on single fields
      
    //   const expDesc = get("expDescription");
    //   const formattedDesc = expDesc
    //     .split('\n')
    //     .map(line => `<p>${line.trim()}</p>`)
    //     .join('');
    //   // document.getElementById("preview-expDescription").innerHTML = formattedDesc; // Not in HTML provided
      
    //   setPlaceholdersInPreview();
    //   updateExperienceFromForms(); // Update Experience when other inputs change
    //   updateEducationFromForms(); // Update Education when other inputs change
    // }

    // document.getElementById("resume-form").addEventListener("submit", function(e) {
    //   e.preventDefault();
    //   alert("Resume completed!");
    // });

    // let hardSkillCount = 0;
    // let softSkillCount = 0;

    // const hardSkillsContainer = document.getElementById("hard-skills-container");
    // const softSkillsContainer = document.getElementById("soft-skills-container");

    // // Skill functions (addHardSkill, addSoftSkill) - added inline since your HTML uses onclick=""
    // function addHardSkill() {
    //   hardSkillCount++;
    //   const group = document.createElement("div");
    //   group.className = "hard-skill";
    //   group.innerHTML = `
    //     <input type="text" id="hard-skill${hardSkillCount}" placeholder="e.g. JavaScript" class="hard-skill-name">
    //     <input type="range" id="hard-skill${hardSkillCount}-level" min="0" max="100" value="70" class="hard-skill-range">
    //     <button type="button" class="remove-hard-skill"><img src="IMAGES/trash.svg" alt=""></button>
    //   `;
    //   hardSkillsContainer.appendChild(group);
    //   document.getElementById(`hard-skill${hardSkillCount}`).addEventListener("input", updateSkillsPreview);
    //   document.getElementById(`hard-skill${hardSkillCount}-level`).addEventListener("input", updateSkillsPreview);
    //   updateSkillsPreview();
    // }

    // function addSoftSkill() {
    //   softSkillCount++;
    //   const group = document.createElement("div");
    //   group.className = "hard-skill";
    //   group.innerHTML = `
    //     <input type="text" id="soft-skill${softSkillCount}" placeholder="e.g. Teamwork">
    //     <button type="button" class="remove-hard-skill"><img src="IMAGES/trash.svg" alt=""></button>
    //   `;
    //   softSkillsContainer.appendChild(group);
    //   document.getElementById(`soft-skill${softSkillCount}`).addEventListener("input", updateSkillsPreview);
    //   updateSkillsPreview();
    // }


    // document.addEventListener("click", function (e) {
    //   if (e.target.closest(".remove-hard-skill")) {
    //     const skillGroup = e.target.closest(".hard-skill");
    //     if (skillGroup) {
    //       skillGroup.remove();
    //       updateSkillsPreview();
    //     }
    //   }
    //   // Note: Removed .remove-soft-skill logic as the button class was missing in your HTML
    // });

    // function updateSkillsPreview() {
    //   const hardPreview = document.getElementById("hard-skills-preview");
    //   hardPreview.innerHTML = "<h4>Hard Skills</h4>";

    //   // Re-scan elements in case count variables are out of sync with removals
    //   document.querySelectorAll('#hard-skills-container .hard-skill').forEach(group => {
    //       const nameInput = group.querySelector('.hard-skill-name');
    //       const levelInput = group.querySelector('.hard-skill-range');

    //       if (nameInput && levelInput && nameInput.value.trim() !== "") {
    //           hardPreview.innerHTML += `
    //               <div class="skill-bar">
    //                   <div class="skill-name">${nameInput.value}</div>
    //                   <div class="bar">
    //                       <div class="fill" style="width: ${levelInput.value}%"></div>
    //                   </div>
    //               </div>
    //           `;
    //       }
    //   });

    //   const softPreview = document.getElementById("soft-skills-preview");
    //   softPreview.innerHTML = "<h4>Soft Skills</h4><ul>";

    //   document.querySelectorAll('#soft-skills-container .hard-skill input[type="text"]').forEach(input => {
    //       if (input.value.trim() !== "") {
    //           softPreview.innerHTML += `<li>${input.value}</li>`;
    //       }
    //   });
    //   softPreview.innerHTML += "</ul>";
    // }
    
    // function setPlaceholdersInPreview() {
    //   const name = `${get("firstName")} ${get("lastName")}`.trim();
    //   document.getElementById("preview-name").textContent = name || "YOUR NAME";

    //   const title = get("jobTitle").trim();
    //   document.getElementById("preview-title").textContent = title || "";

    //   const phone = get("phone");
    //   document.getElementById("preview-contact").textContent = phone || "+256 000 000";

    //   const email = get("email");
    //   document.getElementById("preview-email").textContent = email || "your.email@example.com";

    //   const summaryText = get("summary").trim();
    //   const summaryEl = document.getElementById("preview-summary-1");
    //   if (summaryEl) {
    //       summaryEl.textContent = summaryText || "Write a brief summary highlighting your experience, skills and goals.";
    //   }
    // }

    // // ----------------------------------------------------------------------
    // // EXPERIENCE LOGIC (From your old mk.js)
    // // ----------------------------------------------------------------------
    // const experienceFormsContainer = document.getElementById("experience-forms-container");
    // const experiencePreviewList = document.getElementById("experience-preview-list");

    // function createExperienceForm(id) {
    //     const container = document.createElement("div");
    //     container.className = "experience-entry";
    //     container.dataset.id = id;

    //     container.innerHTML = `
    //         <div class="forms forms-2">
    //             <div class="job"><label>Employer</label><input type="text" class="employer" placeholder="COCA - COLA" /></div>
    //             <div class="employ"><label>Location</label><input type="text" class="location" placeholder="Kampala" /></div> 
    //             <div class="locate"><label>Job Title</label><input type="text" class="job-title" placeholder="Accountant" /></div> 
    //             <div><label>Start date</label><input type="text" class="start-date" placeholder="MM/YYYY" /></div>
    //             <div><label>End date</label><input type="text" class="end-date" placeholder="MM/YYYY" /></div> 
    //             <div class="description"><label>Description</label><textarea class="addescription" placeholder=".Helped with monthly financial reports and data entry"></textarea></div>
    //             <button type="button" class="remove-experience-btn">Remove</button>
    //         </div>
    //     `;

    //     container.querySelectorAll("input, textarea").forEach(input => {
    //         input.addEventListener("input", updateExperienceFromForms);
    //     });

    //     container.querySelector(".remove-experience-btn").addEventListener("click", () => {
    //         container.remove();
    //         updateExperienceFromForms();
    //     });

    //     return container;
    // }
    
    // // ATTACHES LISTENER TO EXPERIENCE BUTTON
    // document.getElementById("add-experience-btn").addEventListener("click", () => {
    //   const newId = Date.now();
    //   const newForm = createExperienceForm(newId);
    //   experienceFormsContainer.appendChild(newForm);
    //   updateExperienceFromForms();
    // });

    // function updateExperienceFromForms() {
    //     const experienceEntries = experienceFormsContainer.querySelectorAll(".experience-entry");

    //     if (!experiencePreviewList) return;

    //     experiencePreviewList.innerHTML = "";

    //     if (experienceEntries.length === 0) {
    //         experiencePreviewList.innerHTML = "<li>No experience added yet.</li>";
    //         return;
    //     }

    //     experienceEntries.forEach(entry => {
    //         const employer = entry.querySelector(".employer").value.trim();
    //         const location = entry.querySelector(".location").value.trim();
    //         const JobTitle = entry.querySelector(".job-title").value.trim();
    //         const startDate = entry.querySelector(".start-date").value.trim();
    //         const endDate = entry.querySelector(".end-date").value.trim();
    //         const description = entry.querySelector(".addescription").value.trim();

    //         const li = document.createElement("li");
    //         li.innerHTML = `
    //             <strong>${employer || "Employer"}</strong> - ${location || "Location"}<br/>
    //             <em>${JobTitle || "JobTitle"}</em><br/>
    //             <span>${startDate || "Start Date"} - ${endDate || "End Date"}</span>
    //             <p>${description || ""}</p>
    //         `;
    //         experiencePreviewList.appendChild(li);
    //     });
    // }


    // // ----------------------------------------------------------------------
    // // EDUCATION LOGIC (From your old etiquette.js)
    // // ----------------------------------------------------------------------
    // const educationFormsContainer = document.getElementById("education-forms-container");
    // const educationPreviewList = document.getElementById("education-preview-list");

    // function createEducationForm(id) {
    //     const container = document.createElement("div");
    //     container.className = "education-entry";
    //     container.dataset.id = id;

    //     container.innerHTML = `
    //         <div class="forms forms-2">
    //             <div class="job"><label>School name</label><input type="text" class="school-name" placeholder="Makerere University" /></div>
    //             <div class="employ"><label>Location</label><input type="text" class="school-location" placeholder="Kampala" /></div> 
    //             <div class="locate"><label>Degree</label><input type="text" class="degree" placeholder="BA in Finance and Banking" /></div> 
    //             <div><label>Start date</label><input type="text" class="start-date" placeholder="MM/YYYY" /></div>
    //             <div><label>End date</label><input type="text" class="end-date" placeholder="MM/YYYY" /></div> 
    //             <div class="description"><label>Description</label><textarea class="eddescription" placeholder="e.g., Graduated with honors, Dean's List (2022)"></textarea></div>
    //             <button type="button" class="remove-education-btn">Remove</button>
    //         </div>
    //     `;

    //     container.querySelectorAll("input, textarea").forEach(input => {
    //         input.addEventListener("input", updateEducationFromForms);
    //     });

    //     container.querySelector(".remove-education-btn").addEventListener("click", () => {
    //         container.remove();
    //         updateEducationFromForms();
    //     });

    //     return container;
    // }
    
    // // ATTACHES LISTENER TO EDUCATION BUTTON
    // document.getElementById("add-education-btn").addEventListener("click", () => {
    //     const newId = Date.now();
    //     const newForm = createEducationForm(newId);
    //     educationFormsContainer.appendChild(newForm);
    //     updateEducationFromForms();
    // });

    // function updateEducationFromForms() {
    //     const educationEntries = educationFormsContainer.querySelectorAll(".education-entry");

    //     if (!educationPreviewList) return;

    //     educationPreviewList.innerHTML = "";

    //     if (educationEntries.length === 0) {
    //         educationPreviewList.innerHTML = "<li>No education added yet.</li>";
    //         return;
    //     }

    //     educationEntries.forEach(entry => {
    //         const schoolName = entry.querySelector(".school-name").value.trim();
    //         const location = entry.querySelector(".school-location").value.trim();
    //         const degree = entry.querySelector(".degree").value.trim();
    //         const startDate = entry.querySelector(".start-date").value.trim();
    //         const endDate = entry.querySelector(".end-date").value.trim();
    //         const description = entry.querySelector(".eddescription").value.trim();

    //         const li = document.createElement("li");
    //         li.innerHTML = `
    //             <strong>${schoolName || "School Name"}</strong> - ${location || "Location"}<br/>
    //             <em>${degree || "Degree"}</em><br/>
    //             <span>${startDate || "Start Date"} - ${endDate || "End Date"}</span>
    //             <p>${description || ""}</p>
    //         `;
    //         educationPreviewList.appendChild(li);
    //     });
    // }
    
    // // ----------------------------------------------------------------------
    // // FINAL DOM LOAD LOGIC & MISC UTILITIES (From your old etiquette.js)
    // // ----------------------------------------------------------------------
    
    // // NOTE: All mobile-nav and offer logic is kept here, but the fatal jQuery/owlCarousel
    // // block is REMOVED to prevent errors.

    // // Runs once when the page is fully loaded
    // document.addEventListener('DOMContentLoaded', () => {
    //   showStep(currentStep);
    //   updatePreview();
      
    //   // Initial state for Experience
    //   if (experienceFormsContainer && experienceFormsContainer.children.length === 0) {
    //     document.getElementById("add-experience-btn").click();
    //   }
    //   updateExperienceFromForms();
      
    //   // Initial state for Education
    //   if (educationFormsContainer && educationFormsContainer.children.length === 0) {
    //     document.getElementById("add-education-btn").click();
    //   }
    //   updateEducationFromForms();
    // });
    
    // // Your existing navigation toggle logic
    // const navToggle = document.querySelector(".mobile-nav-toggle");
    // const primaryNav = document.querySelector(".primary-navigation");
    // if (navToggle && primaryNav) {
    //     navToggle.addEventListener("click", () => {
    //         const isVisible = primaryNav.hasAttribute("data-visible");
    //         if (isVisible) {
    //             primaryNav.removeAttribute("data-visible");
    //             navToggle.setAttribute("aria-expanded", "false");
    //         } else {
    //             primaryNav.setAttribute("data-visible", "");
    //             navToggle.setAttribute("aria-expanded", "true");
    //         }
    //     });
    // }

    // // Your existing offers animation logic
    // const offers = document.querySelectorAll('.offer-container');
    // offers.forEach(offer => {
    //   // NOTE: Removed the animation logic as it was incomplete/complex, leaving basic listener
    //   offer.addEventListener('mouseenter', () => {});
    //   offer.addEventListener('mouseleave', () => {});
    // });

    // // Your existing quotes logic
    // const quotes = [
    //   "Let's lead the way.",
    //   "Let's make today so awesome that yesterday gets jealous.",
    //   "Your only limit is your mind.",
    //   "Small steps every day lead to big results.",
    //   "You don’t have to be perfect to start.",
    //   "Stay hungry, stay foolish. – Steve Jobs",
    //   "Discipline is the bridge between goals and accomplishment.",
    //   "Do something today your future self will thank you for."
    // ];
    // const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // document.addEventListener("DOMContentLoaded", function () {
    //   const quoteContainer = document.querySelector("#quote-text");
    //   if (quoteContainer) {
    //     quoteContainer.textContent = randomQuote;
    //     quoteContainer.classList.add("fade-in");
    //   }
    // });
