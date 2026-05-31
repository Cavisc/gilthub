import { getLanguageColor, getLanguageLink } from "../api.js";
import { escapeHtml } from "../utils.js";

export function renderRepos(repos) {
  const content = document.querySelector(".user-profile");

  const oldRepos = content.querySelector(".repos");
  if (oldRepos) oldRepos.remove();

  const reposHtml = `
    <section class="repos">
      <h3 class="repo-title">Repositórios</h3>
      <div class="repos-container">
        ${repos
          .map(
            (repo) => `
          <div class="repo" data-repo-id="${repo.id}">
            <div class="repo-name">
              <i data-feather="book-open" class="icon"></i>
              <a translate="no" href="${repo.html_url}" class="repo-link" target="_blank" rel="noopener noreferrer">
                ${escapeHtml(repo.name)}
              </a>
            </div>
            ${repo.description ? `<span class="repo-description">${escapeHtml(repo.description)}</span>` : ""}
            <div class="repo-infos">
              ${
                repo.language
                  ? `
                <span class="repo-language">
                  <div class="repo-language-color" style="background-color: ${getLanguageColor(repo.language)}"></div>
                  <a href='${getLanguageLink(repo.language)}' target="_blank" class="repo-language-link">${escapeHtml(repo.language)}</a>
                </span>
              `
                  : ""
              }
              <span class="repo-stars">
                <i data-feather="star" class="icon icon-repo-infos"></i> ${repo.stargazers_count}
              </span>
              <span class="repo-forks">
                <i data-feather="git-branch" class="icon icon-repo-infos"></i> ${repo.forks_count}
              </span>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `;

  content.insertAdjacentHTML("beforeend", reposHtml);
  feather.replace();
}
