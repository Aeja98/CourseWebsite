"use strict";
/*
Index page:
  page laod => fetch course from database
    display in table

Add course page:
  display form to input course detials
    on submit => validate -> send data -> update database
    *optionally => show success/failure feedback*
*/
/*
Index Page

const courseList = document.querySelector("#CourseTbl");

fetch("http://localhost:3000/api/courses")
  .then((res) => res.json())
  .then((courses) => {
    courses.forEach((course) => {
      const li = document.createElement("li");
      li.textContent = `${course.title} – ${course.instructor}`;
      courseList?.appendChild(li);
    });
  });
*/
/*
addCourse Page:
const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const course = {
    title: (document.querySelector("#title") as HTMLInputElement).value,
    instructor: (document.querySelector("#instructor") as HTMLInputElement).value,
    // etc...
  };

  try {
    const res = await fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });

    if (res.ok) {
      alert("Course added!");
      form.reset();
    } else {
      alert("Failed to add course.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
*/
/*
// Interface för användare
interface User {
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  // Funktion för att skriva ut användardetaljer
  function printUserDetails(user: User): void {
    const userDetailsDiv = document.getElementById("userDetails");
    if (userDetailsDiv) {
      userDetailsDiv.innerHTML = `
        <h2>Användardetaljer:</h2>
        <p><strong>Namn:</strong> ${user.name}</p>
        <p><strong>E-postadress:</strong> ${user.email}</p>
        <p><strong>Telefonnummer:</strong> ${user.phoneNumber}</p>
      `;
    }
  }
  
  // Hämta DOM-element för formulär och användardetaljer
  const userForm = document.getElementById("userForm") as HTMLFormElement;
  
  // Lägg till händelselyssnare på formuläret
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Hämta värden från formuläret
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const phoneNumberInput = document.getElementById("phoneNumber") as HTMLInputElement;
  
    // Notering: här borde inputvalidering läggas till
  
    // Skapa ett användarobjekt
    const newUser: User = {
      name: nameInput.value,
      email: emailInput.value,
      phoneNumber: phoneNumberInput.value,
    };
  
    // Använd printUserDetails för att skriva ut användardetaljer
    printUserDetails(newUser);
  });
  //
  */ 
