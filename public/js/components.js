import { filterProps } from "./constants.js";
import { storage } from "./utils.js";

window.addToShoppingCart = (id, name, image) => {
  const element = window.shoppingCart[id];
  if (element) window.shoppingCart[id].qty++;
  else
    window.shoppingCart[id] = {
      id,
      name,
      image,
      qty: 0,
    };

  storage.set("shoppingCart", window.shoppingCart);
  window.cartCountSup.innerHTML = Object.keys(window.shoppingCart).length;
};

export const Article = obj => {
  const { id, name, url_image = "", price, discount } = obj;
  return `
<article class="product">
  <img
    class="product-image"
    src="${url_image}""
    alt="producto-${name}"
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
    <button onclick="addToShoppingCart(${id}, '${name}', '${url_image}')">Añadir al carrito</button?
  </div>

</article>`;
};

export const Dropdown = (label, options = []) => `
  <label for="filter-${label}"> ${label}
    <select id="filter-${label}" ${options.length === 0 ? "disabled" : ""}">
      ${options
        .map(
          option =>
            `<option value="${option.id || option.value}">${
              option.name || option
            }</option>`
        )
        .join("")}
    </select>
  </label>
`;
export const FilterModal = categories => {
  categories.unshift({
    value: "all",
    name: "Todos",
  });

  return `
  <div class="filter-modal">
    <button id="close-modal">Cerrar</button>
    ${categories ? Dropdown("Categoría", categories) : ""}
    ${Dropdown("Descuento", filterProps.discounts)}
    ${Dropdown("Precio", filterProps.prices)}
    </label>
    <button id="filter-search-submit">Filtrar</button>
  </div>
  `;
};
