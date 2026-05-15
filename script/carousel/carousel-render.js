import { popularUsers } from "../../data/popularUsers.js";

export function renderCarousel(container) {
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
