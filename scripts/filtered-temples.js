// ===============================
// Temple Filtering Web App
// BY: GODSWILL MOSES IKPOTOKIN
// ===============================
const menuButton = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19100,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22475-main.jpg"
  },
  { 
    templeName: "Abidjan Ivory Coast",
    location: "Abidja, Cote d'Ivoire",
    dedicated: "2025, May, 25",
    area: 17362,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/abidjan-ivory-coast-temple/abidjan-ivory-coast-temple-58993-main.jpg"
  },
  {
    templeName: "Adelaide Australia",
    location: "Marden, South Australia",
    dedicated: "2000, June, 15",
    area: 10700,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/adelaide-australia-temple/adelaide-australia-temple-4359-main.jpg"
  },
  {
    templeName: "Nairobi Kenya",
    location: "Nairobi, Kenya",
    dedicated: "2025, May, 18", 
    area: 6081,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-60488-main.jpg"
  }


];

const templesContainer = document.getElementById("temples-container");
const navLinks = document.querySelectorAll("nav a");
const pageTitle = document.getElementById("page-title");

function createTempleCard(temple) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = "lazy";

  const figcaption = document.createElement("figcaption");
  figcaption.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  templesContainer.appendChild(figure);
}

function displayTemples(templeList) {
  templesContainer.innerHTML = "";
  templeList.forEach(createTempleCard);
}

function filterTemples(filter) {
  let filteredTemples = [];

  switch (filter) {
    case "old":
      filteredTemples = temples.filter(
        temple => new Date(temple.dedicated).getFullYear() < 1900
      );
      pageTitle.textContent = "Old Temples";
      break;

    case "new":
      filteredTemples = temples.filter(
        temple => new Date(temple.dedicated).getFullYear() > 2000
      );
      pageTitle.textContent = "New Temples";
      break;

    case "large":
      filteredTemples = temples.filter(temple => temple.area > 90000);
      pageTitle.textContent = "Large Temples";
      break;

    case "small":
      filteredTemples = temples.filter(temple => temple.area < 10000);
      pageTitle.textContent = "Small Temples";
      break;

    default:
      filteredTemples = temples;
      pageTitle.textContent = "Home";
  }

  displayTemples(filteredTemples);
}

// navLinks.forEach(link => {
//   link.addEventListener("click", (event) => {
//     event.preventDefault(); 
//     filterTemples(link.dataset.filter);

//     navMenu.classList.remove("open");
//     menuButton.textContent = "☰";
//   });
// });

navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.getAttribute("href").replace("#", "");

    filterTemples(filter);

    navMenu.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

displayTemples(temples);
