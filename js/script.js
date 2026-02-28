// ===== OOP Classes =====

// 1. Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// 2. ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity = 0) {
    this.product = product;
    this.quantity = quantity;
  }

  // Calculate the total price for this cart item
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// 3. ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = []; // Array of ShoppingCartItem instances
  }

  // Get the total number of items in the cart
  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Add a product to the cart (increments quantity if already present)
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  // Remove a product from the cart by its id
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  // Get the total price of all items in the cart
  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }

  // Display all items in the cart
  displayCart() {
    console.log("======== Shopping Cart ========");
    if (this.items.length === 0) {
      console.log("  The cart is empty.");
    } else {
      this.items.forEach((item) => {
        console.log(
          `  - ${item.product.name} | Qty: ${item.quantity} | Unit: $${item.product.price} | Subtotal: $${item.getTotalPrice()}`
        );
      });
      console.log(`  Total items : ${this.getTotalItems()}`);
      console.log(`  Total price : $${this.getTotalPrice()}`);
    }
    console.log("===============================");
  }
}

// ===== Test OOP Classes =====
console.log("=== Testing OOP Shopping Cart ===\n");

// Create products
const testBasket = new Product(1, "Baskets", 100);
const testSocks = new Product(2, "Socks", 20);
const testBag = new Product(3, "Bag", 50);
console.log("Products created:", testBasket, testSocks, testBag);

// Create a shopping cart
const testCart = new ShoppingCart();
console.log("Shopping Cart created:", testCart);

// Add items to the cart
testCart.addItem(testBasket, 2);
testCart.addItem(testSocks, 3);
testCart.addItem(testBag, 1);
console.log("\nCart after adding items (Baskets x2, Socks x3, Bag x1):");
testCart.displayCart();

// Remove an item from the cart
testCart.removeItem(testSocks.id);
console.log("\nCart after removing Socks:");
testCart.displayCart();

console.log("=================================\n");

// ===== DOM Integration =====
document.addEventListener("DOMContentLoaded", () => {
  // Create products
  const basket = new Product(1, "Baskets", 100);
  const socks = new Product(2, "Socks", 20);
  const bag = new Product(3, "Bag", 50);

  // Create the shopping cart and pre-load products with quantity 0
  const cart = new ShoppingCart();
  cart.items.push(new ShoppingCartItem(basket, 0));
  cart.items.push(new ShoppingCartItem(socks, 0));
  cart.items.push(new ShoppingCartItem(bag, 0));

  const totalElement = document.querySelector(".total-price .total");

  // Update total price display in the DOM and log cart state
  function updateDisplay() {
    totalElement.textContent = `${cart.getTotalPrice()} $`;
    cart.displayCart();
  }

  // Attach events to each product card
  const cards = document.querySelectorAll(".card");
  const products = [basket, socks, bag];

  cards.forEach((card, index) => {
    const product = products[index];
    const cartItem = cart.items[index];
    const cardBody = card.querySelector(".card-body");
    const plusBtn = cardBody.querySelector(".fa-plus-circle");
    const minusBtn = cardBody.querySelector(".fa-minus-circle");
    const deleteBtn = cardBody.querySelector(".fa-trash-alt");
    const likeBtn = cardBody.querySelector(".fa-heart");
    const quantityElement = cardBody.querySelector(".quantity");

    // Increase quantity using addItem method
    plusBtn.addEventListener("click", () => {
      cart.addItem(product, 1);
      quantityElement.textContent = cartItem.quantity;
      updateDisplay();
    });

    // Decrease quantity (minimum 0)
    minusBtn.addEventListener("click", () => {
      if (cartItem.quantity > 0) {
        cartItem.quantity--;
        quantityElement.textContent = cartItem.quantity;
        updateDisplay();
      }
    });

    // Remove product from cart and DOM using removeItem method
    deleteBtn.addEventListener("click", () => {
      card.style.transition = "opacity 0.3s ease";
      card.style.opacity = "0";
      setTimeout(() => {
        cart.removeItem(product.id);
        card.remove();
        updateDisplay();
      }, 300);
    });

    // Toggle like (heart) icon color
    likeBtn.addEventListener("click", () => {
      likeBtn.style.color = likeBtn.style.color === "red" ? "black" : "red";
    });
  });

  // Initialize display
  updateDisplay();
});
