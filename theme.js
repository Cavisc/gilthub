function checkTheme({ localStorageTheme, systemDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ toggle, isDark }) {
  const newCta = isDark
    ? "Mudar para o tema claro"
    : "Mudar para o tema escuro";
  toggle.setAttribute("aria-label", newCta);
}

function updateThemeOnHtml({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = checkTheme({
  localStorageTheme,
  systemDark: systemDark,
});

updateButton({ toggle: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtml({ theme: currentThemeSetting });

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ toggle: button, isDark: newTheme === "dark" });
  updateThemeOnHtml({ theme: newTheme });

  currentThemeSetting = newTheme;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    event.preventDefault();
    const searchInput = document.getElementById("search");

    if (searchInput) {
      searchInput.focus();
    }
  }
});
