import { formatDate } from "../utils.js";
export function renderProfile(user) {
  const main = document.querySelector("main");

  main.innerHTML = `
  <section class="user-profile">
        <aside class="user-data">
          <img
            src="${user.avatar_url}"
            alt="${user.name ? user.name : user.login}"
            class="user-avatar"
            aria-label="Avatar do usuário"
          />
          <h1 translate="no" class="user-name" aria-label="Nome de usuário">
            ${user.name ? user.name : user.login}
          </h1>
          ${
            user.name
              ? `<span translate="no" class="user-username" aria-label="Username de usuário"
            >${user.login}</span
          >`
              : ``
          }
          <a
            href="${user.html_url}"
            class="user-link"
            target="_blank"
            aria-label="Visitar perfil"
            title="Visitar perfil"
            >Visitar perfil</a
          >
          <div class="user-info">
          ${
            user.bio
              ? `<span class="user-bio" aria-label="Bio do usuário"
              >${user.bio}</span
            >`
              : ``
          }
            <span
              class="user-followers-following"
              aria-label="Número de seguidores e seguindo"
              ><i
                data-feather="users"
                class="icon icon-followers-following"
              ></i>
              <span><strong>${user.followers}</strong> followers</span>
              <span class="divider">·</span>
              <span><strong>${user.following}</strong> following</span></span
            >
            ${
              user.company
                ? `<span class="user-company" aria-label="Empresa do usuário"
              ><i data-feather="briefcase" class="icon"></i
              ><strong>${user.company}</strong></span
            >`
                : ``
            }
            ${
              user.location
                ? `<span class="user-location" aria-label="Localização do usuário"
              ><i data-feather="map-pin" class="icon"></i>${user.location}</span
            >`
                : ``
            }
            ${
              user.email
                ? `<span class="user-email" aria-label="Email do usuário"
              ><i data-feather="mail" class="icon"></i
              >${user.email}</span
            >`
                : ``
            }
            ${
              user.blog.trim()
                ? `<a
              href="${user.blog}"
              class="user-blog"
              target="_blank"
              title="Visitar blog"
              aria-label="Visitar blog"
              ><i data-feather="link" class="icon"></i
              >${user.blog}</a
            >`
                : ``
            }
            <span
              class="user-repositories-count"
              aria-label="Número de repositórios do usuário"
              ><i data-feather="book" class="icon"></i
              ><strong>${user.public_repos}</strong> repositórios
            </span>
            <span
              class="user-created-date"
              aria-label="Data de criação do usuário"
              ><i data-feather="calendar" class="icon"></i>Criação
              <strong>${formatDate(user.created_at)}</strong></span
            >
          </div>
        </aside>
      </section>
  `;

  feather.replace();
}
