document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    const searchInput = document.getElementById("search");
    const activeElement = document.activeElement;

    if (searchInput && (activeElement !== searchInput || !activeElement)) {
      event.preventDefault();
      searchInput.focus();
    }
  }
});
