console.log("i came from index.js");
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get all product cards
  const cards = document.querySelectorAll(".card-body");
  const totalElement = document.querySelector(".total-price .total");

  // Function to calculate and update total price
  function updateTotalPrice() {
    let total = 0;

    cards.forEach((card) => {
      const unitPriceText = card.querySelector(".unit-price").textContent;
      const unitPrice = parseInt(unitPriceText.replace("$", "").trim());
      const quantity = parseInt(card.querySelector(".quantity").textContent);

      total += unitPrice * quantity;
    });

    totalElement.textContent = `${total} $`;
  }

  // Add event listeners to each card
  cards.forEach((card) => {
    const plusBtn = card.querySelector(".fa-plus-circle");
    const minusBtn = card.querySelector(".fa-minus-circle");
    const deleteBtn = card.querySelector(".fa-trash-alt");
    const likeBtn = card.querySelector(".fa-heart");
    const quantityElement = card.querySelector(".quantity");

    // Plus button - increase quantity
    plusBtn.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityElement.textContent);
      currentQuantity++;
      quantityElement.textContent = currentQuantity;
      updateTotalPrice();
    });

    // Minus button - decrease quantity (minimum 0)
    minusBtn.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 0) {
        currentQuantity--;
        quantityElement.textContent = currentQuantity;
        updateTotalPrice();
      }
    });

    // Delete button - remove entire product card
    deleteBtn.addEventListener("click", () => {
      card.style.transition = "opacity 0.3s ease";
      card.style.opacity = "0";

      setTimeout(() => {
        card.remove();
        updateTotalPrice();
      }, 300);
    });

    // Like button - toggle red color
    likeBtn.addEventListener("click", () => {
      if (likeBtn.style.color === "red") {
        likeBtn.style.color = "black";
      } else {
        likeBtn.style.color = "red";
      }
    });
  });

  // Initialize total price on page load
  updateTotalPrice();
});
