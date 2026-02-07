document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.querySelector("#product");

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
});
