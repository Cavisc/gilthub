const scene = document.querySelector(".cta-characters");

const copilot = document.querySelector(".character1");
const duck = document.querySelector(".character3");

function animate() {
  const rect = scene.getBoundingClientRect();

  const progress = Math.min(
    Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
    1,
  );

  copilot.style.transform = `
    translateY(${progress * -2.5}rem)
  `;

  duck.style.transform = `
    translateY(${progress * 2.5}rem)
    scaleX(-1)
  `;

  requestAnimationFrame(animate);
}

animate();
