import fetcher from "./js/fetch.js";
import {
  FilterModal,
  Article,
  CartArticle,
  Header,
  Filter,
  Products,
} from "./js/components.js";
import { qs, select, storage } from "./js/utils.js";

const development = true;

//INICIALIZACIÓN PRINCIPAL DE LA APP
const app = select("app");
app.appendChild(Header());
app.appendChild(Filter());
app.appendChild(Products());

window.shoppingCart = storage.get("shoppingCart") || {};
window.searchHistory = storage.get("searchHistory") || [];

var products = [];
var appending = false;
var page = 1;
var canAppend = true;

//TODO MOVER TODOS LOS METODOS A SU COMPONENTE
//TODO MANEJAR UN ESTADOGLOBAL CON REDUX
const shouldAppendProducts = () => {
  const { scrollHeight, scrollTop, clientHeight } =
    document.querySelector("main");
  if (scrollTop + clientHeight > scrollHeight - 5) {
    page++;
    appending = true;
    return true;
  }
  return false;
};

window.addEventListener("DOMContentLoaded", (_) => {
  const searchInput = select("search-input");
  const searchIconButton = select("search-button");
  const productsWrapper = select("products-wrapper");
  const searchForm = select("search-form");
  const shoppingCartButton = select("shopping-cart-button");
  const filterSearchButton = select("filter-search-submit");
  window.cartCountSup = select("shopping-cart-count");
  cartCountSup.innerHTML = Object.keys(window.shoppingCart).length;

  shoppingCartButton.on("click", () => {
    showShoppingCart(Object.values(window.shoppingCart));
    console.log("going to shopping cart");
    window.removeEventListener("scroll", appendProducts);
  });

  //PASAR A PROPIO COMPONENTE
  filterSearchButton.on("click", async () => {
    page = 1;
    await fetchProducts();
  });

  //PRODUCTS WRAPPER METHODS

  const setLoading = () => {
    productsWrapper.innerHTML = `<div id="error-message">
        <h1>Cargando... 😴</h1>
     </div>`;
  };

  const populateProducts = (list, appending = false) => {
    console.log(list, appending)
    products = appending ? products.concat(list.data) : list.data;
    if (products.length === 0)
      productsWrapper.innerHTML = `<div id="error-message">
        <h1>No se encontraron coincidencias 🤓</h1>
     </div>`;
    else
      productsWrapper.innerHTML = products
        .map((product) => Article(product))
        .join("");
  };

  const onError = (e) => {
    productsWrapper.innerHTML = `<div id="error-message" >
        <h1>Ocurrió un error al conectar con la API 🤔</h1>
    </div> `;
  };

  const showShoppingCart = (products) => {
    document.title = "Carrito de compras";
    select("filter").innerHTML = "<h2>Carrito de compras</h2>";
    productsWrapper.innerHTML = products
      .map((product) => CartArticle(product))
      .join("");
  };

  setLoading();

  const fetchProducts = async (appending) => {
    try {
      const params = {
        categorie: select("filter-Categoría").value,
        discount: select("filter-Descuento").value,
        priceRange: select("filter-Precio").value,
        search: searchInput.value,
        page,
      };
      const list = await fetcher.get(`api/products?${qs(params)}`);
      if (list.data.length === 0) canAppend = false;
      populateProducts(list, appending);
    } catch (err) {
      console.log(err);
      onError();
    }
  };

  const appendProducts = () => {
    if (canAppend && !appending && shouldAppendProducts()) {
      fetchProducts(true).then(() => (appending = false));
    }
  };

  fetchProducts().then(() => {
    document.querySelector("main").addEventListener("scroll", appendProducts);
  });

  searchIconButton.on("click", (e) => {
    if (searchInput.value === "") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  searchForm.on("submit", (e) => {
    page = 1;
    canAppend = true;
    e.preventDefault();
    setLoading();
    fetcher
      .get(`api/products?search=${searchInput.value}`)
      .then(populateProducts)
      .catch(onError);
    select("filter-Categoría").value = "all";
    select("filter-Descuento").value = "all";
    select("filter-Precio").value = "all";
  });
});
