function initTeamSlider() {
  const track = document.getElementById("teamSliderTrack");
  const items = track.querySelectorAll(".team-item");

  if (items.length === 0) return;

  // Clone all items for seamless loop
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // Calculate total width dynamically
  function calculateSliderWidth() {
    const firstItem = items[0];
    const itemWidth = firstItem.offsetWidth;
    const itemMargin =
      parseInt(getComputedStyle(firstItem).marginLeft) +
      parseInt(getComputedStyle(firstItem).marginRight);
    const totalItemWidth = itemWidth + itemMargin;
    const originalItemsCount = items.length;

    return totalItemWidth * originalItemsCount;
  }

  // Create dynamic keyframes
  function createDynamicKeyframes() {
    const slideDistance = calculateSliderWidth();

    // Remove existing keyframes if any
    const existingStyle = document.getElementById("dynamicSliderKeyframes");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new keyframes
    const style = document.createElement("style");
    style.id = "dynamicSliderKeyframes";
    style.textContent = `
                    @keyframes infiniteSlide {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-${slideDistance}px);
                        }
                    }
                `;
    document.head.appendChild(style);
  }

  // Initialize slider
  createDynamicKeyframes();

  // Recalculate on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      createDynamicKeyframes();
    }, 250);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initTeamSlider);

// Initialize immediately if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTeamSlider);
} else {
  initTeamSlider();
}
