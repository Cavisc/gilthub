import { popularUsers } from "../data/popularUsers.js";
import { searchData } from "../main.js";

(function () {
  const container = document.querySelector(".popular-searches-suggestions");
  if (!container) return;

  renderCarousel(container);
  startScroll(container);

  container.addEventListener("click", (event) => {
    const suggestion = event.target.closest(".popular-searches-suggestion");
    if (!suggestion) return;

    const username = suggestion.querySelector(".suggestion-username");
    if (!username) return;

    const searchInput = document.getElementById("search");
    searchInput.value = username.textContent;
    searchInput.focus();
    searchData(searchInput.value);

    const length = searchInput.value.length;
    searchInput.setSelectionRange(length, length);
  });
})();

function startScroll(container) {
  let scrollInterval = null;
  let isHovering = false;
  const SCROLL_SPEED = 0.8;
  const RESET_WIDTH = 300;

  function autoScroll() {
    if (isHovering) return;

    let newScrollLeft = container.scrollLeft + SCROLL_SPEED;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (newScrollLeft >= maxScroll - RESET_WIDTH) {
      container.scrollLeft = newScrollLeft - container.scrollWidth / 2;
    } else {
      container.scrollLeft = newScrollLeft;
    }
  }

  function startAutoScroll() {
    if (scrollInterval) return;
    function step() {
      autoScroll();
      scrollInterval = requestAnimationFrame(step);
    }
    scrollInterval = requestAnimationFrame(step);
  }

  function stopAutoScroll() {
    if (scrollInterval) {
      cancelAnimationFrame(scrollInterval);
      scrollInterval = null;
    }
  }

  container.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  container.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  startAutoScroll();

  window.addEventListener("beforeunload", () => {
    if (scrollInterval) cancelAnimationFrame(scrollInterval);
  });
}

function renderCarousel(container) {
  let popularSearchesSuggestions = "";

  popularUsers.forEach((popularUser) => {
    popularSearchesSuggestions += `<div class="popular-searches-suggestion">
            <img
              src="${popularUser.avatar}"
              alt="${popularUser.name}"
              class="suggestion-avatar"
              aria-label="Avatar do usuário sugerido"
            />
            <span class="suggestion-username">${popularUser.username}</span>
            <i data-feather="arrow-right" class="suggestion-icon"></i>
          </div>`;
  });

  container.innerHTML = popularSearchesSuggestions;

  const items = Array.from(container.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    container.appendChild(clone);
  });

  feather.replace();
}
