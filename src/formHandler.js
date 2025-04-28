import { showFeedback } from './utils.js'; // Import showFeedback function

const form = document.getElementById("work-experience-form");
form.addEventListener("submit", handleFormSubmit);

/* Function to handle form submits for adding new work experience */
async function handleFormSubmit(event) {
    event.preventDefault();

        const company = document.getElementById("company").value.trim();
        const job_title = document.getElementById("job_title").value.trim();
        const start_date = document.getElementById("start_date").value;
        const end_date = document.getElementById("end_date").value || null;

    // Validation
    if (!company || !job_title || !start_date ) {
        showFeedback("Please fill out all fields (end date is optional).", "error");
        return;
    }

    const workExperience = { company, job_title, start_date, end_date};

    try {
        const response = await submitWorkExperience(workExperience);

        if (response.ok) {
            resetForm();
            showFeedback("Work experience added!", "success");
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || "Something went wrong.");
        }
    } catch (error) {
        console.error("Submission failed:", error)
        showFeedback("Error adding work experience. Please try again.", "error");
    }
};

/* Send POST request to backend API to store new work experience */
async function submitWorkExperience(workExperience) {
    const url = "https://moment3dt207g-6kaa.onrender.com/work_experience";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workExperience)
    });
}

/* Function to reset the form after form submit */
function resetForm() {
    const form = document.getElementById("work-experience-form");
    form.reset();
}