import fetcher from "./js/fetch.js";
import { Dropdown, FilterModal, Article } from "./js/components.js";
import { qs, select, storage } from "./js/utils.js";

window.shoppingCart = storage.get("shoppingCart") || {};
window.searchHistory = storage.get("searchHistory") || [];
var categories = storage.get("categories");
window.categories = categories;
var products = [];

window.addEventListener("DOMContentLoaded", _ => {
  const searchInput = select("search-input");
  const searchIconButton = select("search-button");
  const productsWrapper = select("products-wrapper");
  const searchForm = select("search-form");
  const openFilterModalButton = select("filter-filter");
  const shoppingCartButton = select("shopping-cart-button");
  const modal = select("modal");
  window.cartCountSup = select("shopping-cart-count");
  cartCountSup.innerHTML = Object.keys(window.shoppingCart).length;
  var filterModal;

  shoppingCartButton.on("click", () => {
    document.title = "Carrito de compras";
    //TODO cambiar nomber filter por subAppbar
    select("filter").innerHTML = "<h2>Carrito de compras</h2>";
    populateProducts(Object.values(window.shoppingCart));
  });

  //PRODUCTS WRAPPER METHODS

  const setLoading = () => {
    productsWrapper.innerHTML = `<div id="error-message">
        <h1>Cargando... 😴</h1>
     </div>`;
  };

  const populateProducts = products => {
    products = products.data || products;

    if (products.length === 0)
      productsWrapper.innerHTML = `<div id="error-message">
        <h1>No se encontraron coincidencias 🤓</h1>
     </div>`;
    else
      productsWrapper.innerHTML = (products.data || products)
        .map(product => Article(product))
        .join("");
  };

  const onError = e => {
    productsWrapper.innerHTML = `<div id="error-message" >
        <h1>Ocurrió un error al conectar con la API 🤔</h1>
    </div> `;
  };

  const dev = false;
  if (dev) {
    categories = Array(10).fill({
      id: 1,
      name: "ron",
    });
    products = Array(20).fill({
      id: 1,
      name: "cuzqueña",
      url_image: "./img/producto1.webp",
      price: 100,
    });
    populateProducts(products);
  } else {
    setLoading();
    fetcher.get("api/products").then(populateProducts).catch(onError);

    if (!categories)
      fetcher
        .get("api/categories")
        .then(({ data }) => {
          categories = data;
          storage.set("categories", data);
          filterModal = FilterModal(data);
        })
        .catch(onError);
    else {
      filterModal = FilterModal(categories);
      modal.innerHTML = filterModal;
    }
  }

  searchIconButton.on("click", e => {
    if (searchInput.value === "") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  searchForm.on("submit", e => {
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

  openFilterModalButton.addEventListener("click", () => {
    //error handler
    if (categories.length === 0) {
      modal.innerHTML = `<div id="error-message" >
        <h1>Ocurrió un error al conectar con la API 🤔</h1>
    </div> `;
    } else {
      modal.innerHTML = filterModal;
      modal.classList.add("active");
      select("close-modal").addEventListener("click", closeModal);
      select("filter-search-submit").on("click", onSubmitFilterSearch);
    }
  });

  const onSubmitFilterSearch = () => {
    setLoading();
    closeModal();
    const params = {
      categorie: select("filter-Categoría").value,
      discount: select("filter-Descuento").value,
      priceRange: select("filter-Precio").value,
      search: searchInput.value,
    };
    fetcher
      .get(`api/products?${qs(params)}`)
      .then(populateProducts)
      .catch(onError);
  };

  const closeModal = () => modal.classList.remove("active");

  //INITIAL FETCH
});
//("api/categories")
//  ("api/products")
