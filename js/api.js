import { getCached, setCache } from "./utils.js";

const LANG_COLORS_URL =
  "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";

let languageColors = {};

export async function loadLanguageColors() {
  const cached = sessionStorage.getItem("githubColors");
  if (cached) {
    languageColors = JSON.parse(cached);
    return languageColors;
  }

  try {
    const response = await fetch(LANG_COLORS_URL);
    if (!response.ok) throw new Error("Erro ao carregar cores");
    languageColors = await response.json();
    sessionStorage.setItem("githubColors", JSON.stringify(languageColors));
    return languageColors;
  } catch (error) {
    console.error("Falha ao carregar cores:", error);
    return {};
  }
}

export function getLanguageColor(language) {
  if (!language) return "var(--gray)";
  return languageColors[language]?.color || "var(--gray)";
}

export async function getUser(username) {
  try {
    const cacheKey = `user_${username}`;
    const cached = getCached(cacheKey);
    if (cached) return { ok: true, data: cached };

    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }

      return { ok: false, status: response.status, data: errorBody };
    }

    const data = await response.json();
    setCache(cacheKey, data);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, status: 0, data: error.message };
  }
}

export async function getRepos(username, page) {
  try {
    const cacheKey = `repos_${username}_${page}`;
    const cached = getCached(cacheKey);
    if (cached) return { ok: true, data: cached };

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&page=${page}`,
    );
    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      return { ok: false, status: response.status, data: errorBody };
    }

    const data = await response.json();
    setCache(cacheKey, data, 2 * 60 * 1000);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, status: 0, data: error.message };
  }
}
