import items from "./items.json";
import { addToCart } from "./shoppingCart";
import formatCurrency from "./util/fromatCurrency";

const storeItemTemplate = document.querySelector("#store-item-template");
const storeItemContaier = document.querySelector("[data-store-container]");
const IMAGE_URL = "https://dummyimage.com/420x260";
console.log(items);

export function setupStore() {
  document.addEventListener("click", e => {
    if (e.target.matches("[data-add-to-cart-button]")){
        const id = e.target.closest("[data-store-item]").dataset.itemId
        addToCart(parseInt(id))
    }
  });
  items.forEach(renderStoreItem);
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true);

  const container = storeItem.querySelector(["[data-store-item]"]);
  container.dataset.itemId = item.id;

  const name = storeItem.querySelector("[data-name]");
  name.innerText = item.name;

  const category = storeItem.querySelector("[data-category]");
  category.innerText = item.category;

  const image = storeItem.querySelector("[data-image]");
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

  const price = storeItem.querySelector("[data-price]");

  price.innerText = formatCurrency(item.priceCents / 100);
  storeItemContaier.appendChild(storeItem);
}

//get all the content inside of the element we are cloning
