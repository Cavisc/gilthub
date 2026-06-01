document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    const searchInput = document.getElementById("search");
    const ctaSearchInput = document.getElementById("cta-search");
    const activeElement = document.activeElement;

    if (
      searchInput &&
      (!activeElement ||
        (activeElement !== searchInput && activeElement !== ctaSearchInput))
    ) {
      event.preventDefault();

      searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        searchInput.focus();
      }, 100);
    }
  }
});
