const apiKey = "";

const form = document.querySelector("form");
const input = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const container = document.querySelector(".container");
const showMoreBtn = document.querySelector("show-more");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputValue = input.value;
  if (inputValue != "") {
    if (document.querySelector(".error")) {
      document.querySelector(".error").remove();
    }
    try {
      const apiUrl = `https://api.unsplash.com/search/photos?${page}&query=${inputValue}&client_id=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const results = data.results;
      results.map((result) => {
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="image-container">
        <img
          src=${result.urls.regular}
          alt=${result.description}
        />
        <a
          href=${result.links.html}
          target="_blank">${result.description}</a
        >
      </div>`
        );
      });
    } catch (error) {
      console.error(error.message);
      displayError(error.message);
    }
  } else displayError("Please search something.");
});

const displayError = (message) => {
  if (!document.querySelector(".error")) {
    const error = document.createElement("div");
    error.classList.add("error");
    error.textContent = message;
    container.insertAdjacentElement("beforeBegin", error);
  }
};
