export const storage = {
  set: (key, obj) => window.localStorage.setItem(key, JSON.stringify(obj)),
  get: key => JSON.parse(window.localStorage.getItem(key)),
};

export const select = id => {
  const element = document.getElementById(id);
  element.on = element.addEventListener;
  return element;
};

export const qs = params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");
