/* ==========================
   DATA (ARRAY OF BOOK OBJECTS)
========================== */

const books = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    region: "Nigeria",
    year: 1958,
    image: "https://play-lh.googleusercontent.com/d5P8Ea_uin3yluoL_iO487wg8dUntM1CKvK7VH2aEMmdfeRFfPE-Q3rKpcwf1sBWAdc",
    description: "A powerful novel exploring pre-colonial Igbo society and the effects of colonialism."
  },
  {
    id: 2,
    title: "Sundiata",
    author: "Djibril Tamsir Niane",
    region: "Mali",
    year: 1999,
    image: "https://cdn.thecollector.com/wp-content/uploads/2022/07/sundiata-story-west-african-epic.jpg?width=1200&quality=70",
    description: "The epic story of Sundiata Keita, founder of the Mali Empire."
  }
];

/* ==========================
   GLOBAL VARIABLES
========================== */

const PER_PAGE = 4;
let currentPage = 1;
let filteredBooks = [...books];

/* ==========================
   DISPLAY BOOKS (LITERATURE PAGE)
========================== */

function displayBooks(list) {
  const container = document.getElementById("bookContainer");
  if (!container) return;

  container.innerHTML = "";

  const start = (currentPage - 1) * PER_PAGE;
  const paginated = list.slice(start, start + PER_PAGE);

  if (paginated.length === 0) {
    container.innerHTML = `<p>No results found.</p>`;
    renderPagination(0);
    return;
  }

  paginated.forEach(book => {
    container.innerHTML += `
      <article class="card" tabindex="0">
        <img src="${book.image}" 
             alt="${book.title} cover" 
             loading="lazy">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Region:</strong> ${book.region}</p>
        <button class="view-btn" data-id="${book.id}" aria-label="View details of ${book.title}">
          View Details
        </button>
      </article>
    `;
  });

  attachViewEvents();
  renderPagination(list.length);
}

/* ==========================
   SEARCH FUNCTION
========================== */

function searchBooks(term) {
  filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(term) ||
    book.author.toLowerCase().includes(term) ||
    book.region.toLowerCase().includes(term)
  );
  currentPage = 1;
  displayBooks(filteredBooks);
}

/* ==========================
   PAGINATION
========================== */

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / PER_PAGE);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="page-btn ${i === currentPage ? "active" : ""}" 
              data-page="${i}"
              aria-label="Go to page ${i}">
        ${i}
      </button>
    `;
  }

  document.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      currentPage = Number(e.target.dataset.page);
      displayBooks(filteredBooks);
      // Scroll back to top after pagination click
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ==========================
   MODAL FUNCTIONALITY
========================== */

function openModal(book) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <button class="close-btn" id="closeModal" aria-label="Close modal">&times;</button>
    <img src="${book.image}" alt="${book.title} cover" loading="lazy">
    <h2>${book.title}</h2>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Year:</strong> ${book.year}</p>
    <p>${book.description}</p>
  `;

  modal.style.display = "flex";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");

  // Trap focus inside modal for accessibility
  trapFocus(modal);

  saveView(book.id);

  document.getElementById("closeModal").addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    modal.removeAttribute("aria-modal");
    modal.removeAttribute("role");
    // Remove trap focus event listeners here if implemented
  }
}

/* ==========================
   FOCUS TRAP FOR MODAL (ACCESSIBILITY)
========================== */

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function(e) {
    const isTabPressed = (e.key === "Tab" || e.keyCode === 9);
    if (!isTabPressed) return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  });

  firstEl.focus();
}

/* ==========================
   ATTACH VIEW BUTTON EVENTS
========================== */

function attachViewEvents() {
  document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      const selectedBook = books.find(book => book.id === id);
      if (selectedBook) openModal(selectedBook);
    });
  });
}

/* ==========================
   LOCAL STORAGE (VIEW COUNTER)
========================== */

function saveView(id) {
  let views = JSON.parse(localStorage.getItem("views")) || {};
  views[id] = views[id] ? views[id] + 1 : 1;
  localStorage.setItem("views", JSON.stringify(views));
}

/* ==========================
   FORM HANDLING (RECOMMENDATION FORM)
========================== */

function handleForm() {
  const form = document.getElementById("recommendForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const title = document.getElementById("title").value.trim();

    const messageEl = document.getElementById("formMessage");
    messageEl.textContent = "";

    if (name === "" || title === "") {
      messageEl.textContent = "Please complete all required fields.";
      messageEl.style.color = "red";
      return;
    }

    const recommendation = { name, title };

    let submissions = JSON.parse(localStorage.getItem("recommendations")) || [];
    submissions.push(recommendation);
    localStorage.setItem("recommendations", JSON.stringify(submissions));

    messageEl.textContent = `Thank you ${name}, your recommendation has been saved.`;
    messageEl.style.color = "green";

    form.reset();
  });
}

/* ==========================
   SEARCH INPUT LISTENER
========================== */

function initSearch() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase().trim();

    if (value === "") {
      filteredBooks = [...books];
      displayBooks(filteredBooks);
    } else {
      searchBooks(value);
    }
  });
}

/* ==========================
   INITIALIZATION
========================== */

document.addEventListener("DOMContentLoaded", () => {
  displayBooks(filteredBooks);
  initSearch();
  handleForm();
});
