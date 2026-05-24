import { getRepos, getUser, loadLanguageColors } from "./api.js";
import { renderProfile } from "./ui/profile-render.js";
import { renderRepos } from "./ui/repos-render.js";
import { renderFail, renderLoading } from "./ui/status-render.js";

const searchInput = document.getElementById("search");
const ctaSearchInput = document.getElementById("cta-search");
const ctaButton = document.querySelector(".cta-button");

let page = 1;

loadLanguageColors();

ctaButton.addEventListener("click", () => {
  if (ctaSearchInput.value.trim()) {
    const username = ctaSearchInput.value;
    searchData(username);
    searchInput.value = username;
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (searchInput.value.trim()) {
      const username = searchInput.value;
      searchData(username);
    }
  }
});

export async function searchData(username) {
  renderLoading();

  const user = await getUser(username);

  if (user.status) {
    switch (user.status) {
      case "404":
        renderFail(`Usuário não encontrado`);
        break;
      case "403":
        renderFail(`Limite excedido`);
        break;
      case "422":
        renderFail(`Busca inválida`);
        break;
      case "500":
        renderFail(`Erro do GitHub`);
        break;
      default:
        renderFail(`Ocorreu algum erro`);
        break;
    }
  } else {
    const repos = await getRepos(username, page);
    renderProfile(user);
    renderRepos(repos);
  }
}
