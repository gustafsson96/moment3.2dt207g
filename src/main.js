import { showFeedback } from './utils.js'; 

// Fetch work experience data 
async function getWorkExperience() {
    let url = "http://localhost:3000/work_experience";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Work experience", data);

        displayWorkExperience(data);

    } catch (error) {
        console.error("Error fetching data", error)
    }
}

function formatYear(startDatestr, endDatestr) {
    const startYear = new Date(startDatestr).getFullYear();
    const endYear = endDatestr ? new Date(endDatestr).getFullYear() : "Present";

    return `${startYear} - ${endYear}`;
}

function displayWorkExperience(workExperienceArray) {
    const workExperienceLi = document.getElementById('work-experience-list');

    workExperienceLi.innerHTML = '';

    workExperienceArray.forEach(experience => {
        const yearRange = formatYear(experience.start_date, experience.end_date);

        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <strong>${experience.company_name}</strong> (${experience.job_title}) <br>
            <em>${experience.location}</em> <br>
            <span>${yearRange}</span> <br>
            <p>${experience.description || 'No description available'}</p>
            <button class="delete-btn" data-id="${experience.id}">Delete</button>
        `;

        workExperienceLi.appendChild(listItem);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteWorkExperience);
    });
}

async function deleteWorkExperience(event) {
    const workExperienceId = event.target.getAttribute("data-id");
    const url = `http://localhost:3000/delete/${workExperienceId}`;

    try {
        const response = await fetch(url, {
            method: "GET"
        });

        if (response.ok) {
            console.log("Successfully deleted work experience");
            getWorkExperience();
            showFeedback("Work experience deleted successfully.", "success");
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || "Something went wrong");
        }
    } catch (error) {
        console.error("Deletion failed:", error);
        showFeedback("Error deleting work experience. Please try again.", "error");
    }
}

getWorkExperience();
