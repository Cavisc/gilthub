import { popularUsers } from "../data/popularUsers.js";
import { searchData } from "../main.js";
import { randomIndexes } from "../utils.js";

const main = document.querySelector("main");

export function renderLoading() {
  main.innerHTML = `<section class="load-container">
        <div class="load"></div>
        <span class="load-message">Um momento por favor...</span>
      </section>`;
}

export function renderFail(errorCode, username) {
  switch (errorCode) {
    case 404:
      const indexes = randomIndexes(4);
      const failPopularSearchesSuggestions = indexes.map(
        (index) => popularUsers[index],
      );

      let failPopularSearchesSuggestionsHtml = "";

      for (let i = 0; i < failPopularSearchesSuggestions.length; i++) {
        failPopularSearchesSuggestionsHtml += `<div class="fail-popular-searches-suggestion">
                <img
                  src="${failPopularSearchesSuggestions[i].avatar}"
                  alt="${failPopularSearchesSuggestions[i].username}"
                  class="fail-suggestion-avatar"
                  aria-label="Avatar do usuário sugerido"
                />
                <span class="fail-suggestion-username">${failPopularSearchesSuggestions[i].username}</span>
                <i data-feather="arrow-right" class="fail-suggestion-icon"></i>
              </div>`;
      }

      main.innerHTML = `<section class="fail-container">
        <img
          src="./src/assets/fail.png"
          alt="Desenho de um gato"
          class="fail-img"
        />
        <div class="fail-infos">
          <h2 class="fail-title">Sua busca não encontrou nenhum usuário</h2>
          <span class="fail-message"
            >O nome de usuário "${username}" não existe no GitHub.</span
          >
          <div class="fail-tips">
            <span class="fail-tip-header">Verifique se:</span>
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i>A
              ortografia está correta</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i>Não
              há espaços extras</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i>O
              usuário existe e é público</span
            >
          </div>
          <div class="fail-popular-searches">
            <h3 class="fail-popular-searches-title">
              Experimente pesquisar alguém popular
            </h3>
            <div class="fail-popular-searches-suggestions">
            ${failPopularSearchesSuggestionsHtml}
            </div>
          </div>
        </div>
      </section>`;

      main.addEventListener("click", (event) => {
        const suggestion = event.target.closest(
          ".fail-popular-searches-suggestion",
        );
        if (!suggestion) return;

        const username = suggestion.querySelector(".fail-suggestion-username");
        if (!username) return;

        const searchInput = document.getElementById("search");
        searchInput.value = username.textContent;
        searchInput.focus();
        searchData(searchInput.value);

        const length = searchInput.value.length;
        searchInput.setSelectionRange(length, length);
      });
      break;
    case 403:
      main.innerHTML = `<section class="fail-container">
        <img
          src="./src/assets/fail.png"
          alt="Desenho de um gato"
          class="fail-img"
        />
        <div class="fail-infos">
          <h2 class="fail-title">Você atingiu o limite de requisições</h2>
          <span class="fail-message"
            >O GitHub limita o número de consultas por minuto. Isso acontece
            quando você faz muitas buscas seguidas.</span
          >
          <div class="fail-tips">
            <span class="fail-tip-header">Verifique se:</span>
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i
              >Aguardou alguns minutos antes de tentar novamente</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i>Não
              está fazendo requisições automáticas muito rápidas</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i
              >Reduziu a frequência de pesquisas</span
            >
          </div>
          <h3 class="fail-requisition-title">
            Entenda mais sobre o limite de requisições na
            <a
              class="fail-requisition-link"
              href="https://www.github.com/Cavisc/gilthub/blob/main/README.md"
              target="_blank"
              >documentação<i
                data-feather="arrow-up-right"
                class="fail-requisition-icon"
              ></i
            ></a>
          </h3>
        </div>
      </section>`;
      break;
    case 500:
      main.innerHTML = `<section class="fail-container">
        <img
          src="./src/assets/fail.png"
          alt="Desenho de um gato"
          class="fail-img"
        />
        <div class="fail-infos">
          <h2 class="fail-title">O GitHub está com instabilidade</h2>
          <span class="fail-message"
            >O servidor do GitHub retornou um erro interno. Isso geralmente é
            temporário.</span
          >
          <div class="fail-tips">
            <span class="fail-tip-header">Certifique-se de:</span>
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i
              >Tentar novamente em alguns segundos</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i
              >Acessar o GitHub em outro navegador para ver se está no ar</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i
              >Consultar o
              <a href="https://www.githubstatus.com/" target="_blank"
                >status.github.com</a
              >
              para verificar interrupções</span
            >
          </div>
        </div>
      </section>`;
      break;
    default:
      main.innerHTML = `<section class="fail-container">
        <img
          src="./src/assets/fail.png"
          alt="Desenho de um gato"
          class="fail-img"
        />
        <div class="fail-infos">
          <h2 class="fail-title">Ocorreu um erro inesperado</h2>
          <span class="fail-message"
            >Não foi possível completar a busca. Pode ser um problema de rede ou
            resposta inesperada.</span
          >
          <div class="fail-tips">
            <span class="fail-tip-header">Verifique se:</span>
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i>Sua
              conexão com a internet está ativa</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i
              >Tentar novamente após alguns segundos</span
            >
            <span class="fail-tip"
              ><i data-feather="check-circle" class="icon fail-tip-icon"></i>O
              nome do usuário não contém caracteres especiais</span
            >
          </div>
        </div>
      </section>`;
      break;
  }

  feather.replace();
}
