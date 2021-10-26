import { filterProps } from "./constants.js";
import { storage, select } from "./utils.js";
import fetcher from "./fetch.js"
export const Products = () => {
  const products = document.createElement("main");
  products.innerHTML = `
        <div id="products-wrapper"></div>`;
  return products;
};

export const Header = () => {
  const header = document.createElement("header");
  header.classList.add("header");
  header.innerHTML = `
        <a href="/"><h3>E-Commerce</h3></a>
        <form id="search-form">
          <input id="search-input" type="text" placeholder="Búsqueda" />
          <button type="submit" id="search-button">
            <img src="./img/search-icon.svg" alt="search-icon" />
          </button>
        </form>
        <button id="shopping-cart-button">
          <span> Ver carrito</span>
          <img src="./img/shopping-cart-icon.svg" alt="shopping-cart-icon" />
          <sup id="shopping-cart-count">0</sup>
        </button>
  `;

  return header;
};

export const Filter = () => {
  var categories = storage.get("categories");
  window.categories = categories;
  const filter = document.createElement("div");
  filter.id = "filter";

  if (!categories)
    fetcher
      .get("api/categories")
      .then(({ data }) => {
        categories = data;
        storage.set("categories", data);
        filter= FilterModal(data);
      })
      .catch(onError);
  else {
    filter.innerHTML = FilterModal(categories);
  }
  return filter;
};

// cambiar de nombre, no es un modal
export const FilterModal = (categories) => {
  categories.unshift({
    value: "all",
    name: "Todos",
  });

  return `
    ${categories ? Dropdown("Categoría", categories) : ""}
    ${Dropdown("Descuento", filterProps.discounts)}
    ${Dropdown("Precio", filterProps.prices)}
    </label>
    <button id="filter-search-submit">Buscar</button>
  `;
};
window.addToShoppingCart = (id, name, url_image, price, discount) => {
  const element = window.shoppingCart[id];
  if (element) window.shoppingCart[id].qty++;
  else
    window.shoppingCart[id] = {
      id,
      name,
      url_image,
      price,
      discount,
      qty: 1,
    };

  storage.set("shoppingCart", window.shoppingCart);
  window.cartCountSup.innerHTML = Object.keys(window.shoppingCart).length;
};

window.deleteFromShoppingCart = (id) => {
  console.log(`cart-${id}`);
  delete window.shoppingCart[id];
  storage.set("shoppingCart", window.shoppingCart);
  window.cartCountSup.innerHTML = Object.keys(window.shoppingCart).length;
  select(`cart-${id}`).style.display = "none";
};

export const Article = (obj) => {
  const { id, name, url_image = "", price, discount } = obj;
  return `
<article class="product">
  <img
    class="product-image"
    src="${url_image}""
    alt="producto-${name}"
    onerror="this.src='img/error-url-image.webp'"
  />
  <div class="product-description">
    <div class="product-price-block">
      <span class="product-price">S/ ${price}</span>
      ${
        discount
          ? `<sup class="product-price-aditional-info"> ${discount}% dcto</sup>`
          : ""
      }
    </div>
    <p class="product-name">${name}</p>
    <button onclick="addToShoppingCart(${id}, '${name}', '${url_image}', ${price}, ${discount})">Añadir al carrito</button?
  </div>

</article>`;
};

export const CartArticle = (obj) => {
  const { id, name, url_image = "", price, discount, qty } = obj;
  return `
<article id="cart-${id}"class="product">
  <img
    class="product-image"
    src="${url_image}"
    alt="producto-${name}"
    onerror="this.src='img/error-url-image.webp'"
  />
  <div class="product-description">
    <p class="product-name">${name}</p>
    <br/>
    <span >Total: S/ ${price * (1 - discount / 100) * qty}</span>
    <br/>
    <sup class="product-price-aditional-info">S/ ${
      price * (discount / 100) * qty
    } dcto. aplicado. ${qty} x unidad(es)</sup>
    <button onclick="deleteFromShoppingCart(${id})">Eliminar del carrito</button>
  </div>

</article>`;
};

export const Dropdown = (label, options = []) => `
  <label for="filter-${label}"> ${label}
    <select id="filter-${label}" ${options.length === 0 ? "disabled" : ""}">
      ${options
        .map(
          (option) =>
            `<option value="${option.id || option.value}">${
              option.name || option
            }</option>`
        )
        .join("")}
    </select>
  </label>
`;

