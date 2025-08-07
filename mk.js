let currentStep = 1;

function showStep(step) {
  document.querySelectorAll(".step").forEach((s) => s.classList.remove("active"));
  document.querySelector(.step[data-step="${step}"]).classList.add("active");

  document.querySelectorAll(".progress-step").forEach((p) => {
    const stepNum = parseInt(p.dataset.step);
    p.classList.remove("active");
    if (stepNum === step) p.classList.add("active");
  });
}

function nextStep() {
  if (currentStep < 6) {
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
  return document.getElementById(id).value || "";
}

function updatePreview() {
  document.getElementById("preview-name").textContent = ${get("firstName")} ${get("lastName")};
  document.getElementById("preview-title").textContent = get("jobTitle");
  document.getElementById("preview-contact").textContent = ${get("email")} | ${get("phone")};
  document.getElementById("preview-expTitle").textContent = get("expTitle");
  document.getElementById("preview-employer").textContent = get("employer");
  document.getElementById("preview-expDate").textContent = ${get("startDate")} - ${get("endDate")};
  document.getElementById("preview-expDescription").textContent = get("expDescription");
  document.getElementById("preview-education").textContent = get("education");
  document.getElementById("preview-skills").textContent = get("skills");
  document.getElementById("preview-summary").textContent = get("summary");
}

document.getElementById("resume-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Resume submitted!");
});

// Initial setup
showStep(currentStep);