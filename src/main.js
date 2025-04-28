import { showFeedback } from './utils.js'; // Import showFeedback function

// Function to get work experience data 
async function getWorkExperience() {
    let url = "https://moment3dt207g-6kaa.onrender.com/work_experience";

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

/* Function to format date to year only */
function formatYear(startDatestr, endDatestr) {
    const startYear = new Date(startDatestr).getFullYear();
    const endYear = endDatestr ? new Date(endDatestr).getFullYear() : "Present";

    return `${startYear} - ${endYear}`;
}

/* Function to display work experiences as a list */
function displayWorkExperience(workExperienceArray) {
    const workExperienceLi = document.getElementById('work-experience-list');

    workExperienceLi.innerHTML = '';

    if (workExperienceArray.length === 0) {
        const noDataMessage = document.createElement('li');
        noDataMessage.textContent = 'No work experience available.';
        noDataMessage.classList.add('no-work-experience');
        workExperienceLi.appendChild(noDataMessage);
        return;
    }

    workExperienceArray.forEach(experience => {
        const yearRange = formatYear(experience.start_date, experience.end_date);

        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <strong>${experience.company}</strong> (${experience.job_title}) <br>
            <span>${yearRange}</span> <br><br>
            <button class="delete-btn" data-id="${experience._id}">Delete</button>
        `;

        workExperienceLi.appendChild(listItem);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteWorkExperience);
    });
}

/* Function to delete a work experience */
async function deleteWorkExperience(event) {
    const workExperienceId = event.target.getAttribute("data-id");
    const url = `https://moment3dt207g-6kaa.onrender.com/work_experience/${workExperienceId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE"
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
