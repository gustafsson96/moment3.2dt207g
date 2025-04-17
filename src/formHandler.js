import { showFeedback } from './utils.js'; // Import showFeedback function

const form = document.getElementById("work-experience-form");
form.addEventListener("submit", handleFormSubmit);

/* Function to handle form submits for adding new work experience */
async function handleFormSubmit(event) {
    event.preventDefault();

    const workExperience = {
        company_name: document.getElementById("company_name").value.trim(),
        job_title: document.getElementById("job_title").value.trim(),
        location: document.getElementById("location").value.trim(),
        start_date: document.getElementById("start_date").value,
        end_date: document.getElementById("end_date").value || null,
        description: document.getElementById("description").value.trim() || null,
    };

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
    const url = "http://localhost:3000/work_experience";

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