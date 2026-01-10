// Current Year
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = new Date().getFullYear();

// Last Modified
const lastModified = document.getElementById("lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;
