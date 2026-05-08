document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    event.preventDefault();
    const searchInput = document.getElementById("search");

    if (searchInput) {
      searchInput.focus();
    }
  }
});
