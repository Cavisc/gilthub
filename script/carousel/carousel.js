import { renderCarousel } from "./carousel-render.js";
import { startScroll } from "./carousel-scroll.js";

(function () {
  const container = document.querySelector(".popular-searches-suggestions");
  if (!container) return;

  renderCarousel(container);
  startScroll(container);

  container.addEventListener("click", (event) => {
    const suggestion = event.target.closest(".popular-searches-suggestion");
    if (!suggestion) return;

    const nickname = suggestion.querySelector(".suggestion-nickname");
    if (!nickname) return;

    const searchInput = document.getElementById("search");
    searchInput.value = nickname.textContent;
    searchInput.focus();

    const length = searchInput.value.length;
    searchInput.setSelectionRange(length, length);
  });
})();
