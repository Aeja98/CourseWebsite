
const form = document.querySelector(".courseForm") as HTMLFormElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;

//localstorage - saves the course from the form
form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const code = (document.querySelector("#code") as HTMLInputElement).value.trim();
    const name = (document.querySelector("#name") as HTMLInputElement).value.trim();
    const progression = (document.querySelector("#progression") as HTMLInputElement).value.trim().toUpperCase();
    const syllabus = (document.querySelector("#syllabus") as HTMLInputElement).value.trim();
  
    //input validation:
    //makes sure url contains the correct symbols + letters in the right format
    const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
    const isValidURL = urlRegex.test(syllabus);
    //ensure that progression input is only 1 letter between a-z
    const isValidProgression = /^[A-Z]$/.test(progression);
  
    if (!code || !name || !progression || !syllabus) {
      alert("Alla fält måste fyllas i.");
      return;
    }
  
    if (!isValidURL) {
      alert("Kursplan måste vara en giltig URL.");
      return;
    }
  
    if (!isValidProgression) {
      alert("Progression får bara vara en bokstav (t.ex. A, B, C).");
      return;
    }

    //define course with datatypes
    const course = {
      coursecode: code,
      coursename: name,
      progression: progression,
      syllabus: syllabus
    };

    //compiles information into correct format 
    const existing = JSON.parse(localStorage.getItem("courses") || "[]");
    existing.push(course);
    localStorage.setItem("courses", JSON.stringify(existing));
  
    alert("Kurs sparad!");
    form.reset();
  });
