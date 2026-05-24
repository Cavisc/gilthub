const main = document.querySelector("main");
const failGifUrl = "./assets/fail.gif";

export function renderLoading() {
  main.innerHTML = `<section class="load-container">
        <div class="load"></div>
        <span class="load-message">Um momento por favor...</span>
      </section>`;
}

export function renderFail(error) {
  main.innerHTML = `<section class="fail-container">
        <div class="fail"></div>
        <span class="fail-message"><strong>${error}</strong></span>
      </section>`;

  const fail = document.querySelector(".fail");
  fail.style.backgroundImage = `url('${failGifUrl}?t=${Date.now()}')`;
  fail.style.backgroundRepeat = "no-repeat";
  fail.style.backgroundPosition = "center";
  fail.style.backgroundSize = "contain";
}
