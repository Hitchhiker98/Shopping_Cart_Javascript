import items from "./items.json";
import formatCurrency from "./util/fromatCurrency";

const cartButton = document.querySelector("[data-cart-button]");
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]");
let shoppingCart = [];
const IMAGE_URL = "https://dummyimage.com/210x130";
const cartItemTemplate = document.querySelector("#cart-item-template");
const cartItemContaier = document.querySelector("[data-cart-items]");
const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartTotal = document.querySelector("[data-total]")

export function setupShoppingCart() {}

// Show/hide cart when clicked

// remove items from the cart

// Show/Hide the cart when it has no items or wher it goes from 0 to 1 item
// persist across multiple pages

cartButton.addEventListener("click", () => {
  cartItemsWrapper.classList.toggle("invisible");
});

export function addToCart(id) {
  const existingItem = shoppingCart.find((entry) => entry.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    shoppingCart.push({ id: id, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  cartItemContaier.innerHTML = "";

  cartQuantity.innerText = shoppingCart.length

  cartTotal.innerText = formatCurrency(0)

  shoppingCart.forEach((entry) => {
    const item = items.find((i) => entry.id === i.id);
    const cartItem = cartItemTemplate.content.cloneNode(true);

    const container = cartItem.querySelector(["[data-item]"]);
    container.dataset.itemId = item.id;

    const name = cartItem.querySelector("[data-name]");
    name.innerText = item.name;

    const image = cartItem.querySelector("[data-image]");
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;
    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-name]");
      quantity.innerText = `x${entry.quantity}`;
    }

    const price = cartItem.querySelector("[data-price]");

    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100);
    cartItemContaier.appendChild(cartItem);
  });
}

// calculate an accutre total
