"use strict";

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
    } catch (error) {
        console.error("Error fetching data", error)
    }
}

getWorkExperience();