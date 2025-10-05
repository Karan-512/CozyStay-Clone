document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  function updateCarouselPosition() {
    // Calculate the exact pixel offset by summing the widths of all preceding slides.
    let offset = 0;
    for (let i = 0; i < currentSlideIndex; i++) {
      offset += slides[i].getBoundingClientRect().width;
    }

    // Apply the horizontal shift using translate X
    track.style.transform = `translateX(-${offset}px)`;
  }

  function moveSlide(direction) {
    let newIndex = currentSlideIndex + direction;

    // --- Looping Logic ---
    if (newIndex >= totalSlides) {
      // If at the end and moving next, wrap to the first slide (index 0)
      currentSlideIndex = 0;
    } else if (newIndex < 0) {
      // If at the start and moving previous, wrap to the last slide
      currentSlideIndex = totalSlides - 1;
    } else {
      // Normal movement
      currentSlideIndex = newIndex;
    }
    // --- End Looping Logic ---

    updateCarouselPosition();
  }

  // Attach event listeners
  nextButton.addEventListener("click", () => {
    moveSlide(1);
  });

  prevButton.addEventListener("click", () => {
    moveSlide(-1);
  });

  // Initial positioning and responsiveness
  updateCarouselPosition();
  window.addEventListener("resize", updateCarouselPosition);
});
