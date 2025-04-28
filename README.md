# Moment 3 DT207G Part 3

This project makes up the second part of my contribution for moment 3 in the course "Backend-baserad webbutveckling" (dt207g) at Mittuniversitetet, Sundsvall. 

## Description
This frontend application interacts with the backend API (that makes up the first part of this assignment) to display, add and delete work experiences. The website includes a list displaying all stored work experiences, a form to add new work experiences and an about page with information about the webbsite and the MySQL database. 
<br><br>
Link to the API's GitHub repository: https://github.com/gustafsson96/moment2dt207g.git

## Features
* **View work experiences:** Displays a list of work experiences fetched from the backend API.

* **Add work experience:** A form that allows the user to submit a new work experience to the backend API.

* **Delete work experience:** Each work experience in the list has its own delete button. Users can remove entries by clicking the relevant button. 

* **User feedback:** When a user has completed an action like adding or deleting a new work experience, a feedback message is displayed. 

## Techonologies Used
* **HTML** for structuring content. 
* **CSS** for styling. 
* **JavaScript** for functionality and interaction with the backend.
* **Vite** has been used as an automatic build tool and development server. 

## How It Works
* The page sends a GET request to the backend to retrieve all work experiences. 
* The user can add a new work experience using the form, which sends a POST request with the form data. 
* Deleting a work experience triggers a GET request to delete the entry in the backend. 

## Future Improvments 
* Implement functionality for the user to update a work experience. 