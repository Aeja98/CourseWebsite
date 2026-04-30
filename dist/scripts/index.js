"use strict";
//course table from index page
const courseTable = document.querySelector(".CourseTbl table");
//local storage - retrieves data from local storage
const courses = JSON.parse(localStorage.getItem("courses") || "[]");
//fetch data from my database + local storage
fetch("http://localhost:3000/api/courses")
    .then(res => res.json())
    .then((fetchedCourses) => {
    const localCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    //Combines local storage & database info
    const allCourses = [...fetchedCourses, ...localCourses];
    //Loop through courses and display in table
    allCourses.forEach((course) => {
        const row = document.createElement("tr");
        row.classList.add("row");
        row.innerHTML = `
        <td>${course.coursecode}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
        <td><a href="${course.syllabus}" target="_blank">Syllabus</a></td>
        <td><button class="delete-btn" data-id="${course.id}">X</button></td>
      `;
        courseTable.appendChild(row);
    });
})
    .catch(err => {
    console.error("Fetch failed:", err);
});
//delete option event listener
courseTable.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    //make sure the correct button was clicked before removing anything
    if (!target || !target.classList.contains("delete-btn"))
        return;
    const row = target.closest("tr");
    if (row) {
        console.log("Row hidden (not deleted from database).");
        row.remove();
    }
});
//restore button to get all the data from the database thats been deleted
const restoreBtn = document.querySelector(".restoreBtn");
restoreBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/api/courses/restore", {
        method: "PUT"
    })
        .then((res) => res.json())
        .then(() => {
        alert("Kurser återställda!");
        location.reload();
    })
        .catch((err) => {
        console.error("Restore failed:", err);
        alert("Något gick fel");
    });
});
