import { getRepos, getUser, loadLanguageColors } from "./api.js";
import { renderPagination } from "./ui/pagination-render.js";
import { renderProfile } from "./ui/profile-render.js";
import { renderRepos } from "./ui/repos-render.js";
import { renderFail, renderLoading } from "./ui/status-render.js";
import { calcPages } from "./utils.js";

const searchInput = document.getElementById("search");
const ctaSearchInput = document.getElementById("cta-search");
const ctaButton = document.querySelector(".cta-button");

let page = 1;
let totalPages = null;

loadLanguageColors();

ctaSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (ctaSearchInput.value.trim()) {
      const username = ctaSearchInput.value;
      page = 1;
      searchData(username);
      searchInput.value = username;
    }
  }
});

ctaButton.addEventListener("click", () => {
  if (ctaSearchInput.value.trim()) {
    const username = ctaSearchInput.value;
    page = 1;
    searchData(username);
    searchInput.value = username;
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (searchInput.value.trim()) {
      const username = searchInput.value;
      page = 1;
      searchData(username);
    }
  }
});

export async function searchData(username) {
  totalPages = null;
  renderLoading();

  const userResult = await getUser(username);

  if (!userResult.ok) {
    const status = userResult.status;
    switch (status) {
      case 404:
        renderFail(404, username);
        break;
      case 403:
        renderFail(403);
        break;
      case 500:
        renderFail(500);
        break;
      default:
        renderFail();
        break;
    }
    return;
  }

  const user = userResult.data;
  totalPages = calcPages(user.public_repos);

  const reposResult = await getRepos(username, page);
  if (!reposResult.ok) {
    renderFail(`Erro ao carregar repositórios: ${reposResult.data}`);
    return;
  }

  const repos = reposResult.data;
  renderProfile(user);
  renderRepos(repos);
  renderPagination(page, totalPages);
  handlePaginationEvent(username);
}

function handlePaginationEvent(username) {
  const paginationContainer = document.querySelector(".pagination");

  if (paginationContainer) {
    const paginationButtons =
      paginationContainer.querySelectorAll(".pagination-button");

    paginationButtons.forEach((paginationButton) => {
      paginationButton.addEventListener("click", async (event) => {
        const target = event.target;

        if (
          target.classList.contains("previous-button") &&
          !target.classList.contains("disabled")
        ) {
          page--;
          searchData(username);
        } else if (
          target.classList.contains("next-button") &&
          !target.classList.contains("disabled")
        ) {
          page++;
          searchData(username);
        } else if (!target.classList.contains("ellipsis")) {
          page = parseInt(target.innerText, 10);
          searchData(username);
        }
      });
    });
  }
}
