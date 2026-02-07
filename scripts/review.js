document.addEventListener("DOMContentLoaded", () => {
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count++;

  localStorage.setItem("reviewCount", count);

  const counter = document.getElementById("counter");
  if (counter) {
    counter.textContent = count;
  }
});
