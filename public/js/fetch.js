const fetcher = (url, options) => {
  //url = "http://192.168.1.2:3000/" + url;
  return fetch(url, { ...options, mode: "cors" }).then(handleResponse);
};
export function get(url) {
  const requestOptions = {
    method: "GET",
  };
  return fetcher(url, requestOptions);
}

export function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetcher(url, requestOptions);
}

async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }
}
export default {
  get,
  post,
};
