export function startScroll(container) {
  let scrollInterval = null;
  let isHovering = false;
  const SCROLL_SPEED = 0.8;
  const RESET_WIDTH = 300;

  function autoScroll() {
    if (isHovering) return;

    let newScrollLeft = container.scrollLeft + SCROLL_SPEED;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (newScrollLeft >= maxScroll - RESET_WIDTH) {
      container.scrollLeft = newScrollLeft - container.scrollWidth / 2;
    } else {
      container.scrollLeft = newScrollLeft;
    }
  }

  function startAutoScroll() {
    if (scrollInterval) return;
    function step() {
      autoScroll();
      scrollInterval = requestAnimationFrame(step);
    }
    scrollInterval = requestAnimationFrame(step);
  }

  function stopAutoScroll() {
    if (scrollInterval) {
      cancelAnimationFrame(scrollInterval);
      scrollInterval = null;
    }
  }

  container.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  container.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  startAutoScroll();

  window.addEventListener("beforeunload", () => {
    if (scrollInterval) cancelAnimationFrame(scrollInterval);
  });
}
