const carouselContainer = document.getElementById("carousel-container");

// Fetch posts and build carousel
const perPage = 8;
const page = 1;

const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");

fetch(
  `https://travelandexplore.no/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`
)
  .then((response) => response.json())
  .then((posts) => {
    buildCarousel(posts);
    initSlider();
  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });

function truncateText(text, maxWords) {
  const words = text.split(" ");
  const truncatedWords = words.slice(0, maxWords);
  const truncatedText = truncatedWords.join(" ");

  if (words.length > maxWords) {
    return truncatedText + "...";
  }

  return truncatedText;
}

function buildCarousel(posts) {
  let carouselHTML = "";
  const maxWordsInExcerpt = 30; // Maximum number of words in excerpt

  posts.forEach((post) => {
    const imageUrl = post.jetpack_featured_media_url;
    const truncatedExcerpt = truncateText(
      post.excerpt.rendered,
      maxWordsInExcerpt
    );

    const postURL = `/html/specific-post.html?id=${post.id}`;

    carouselHTML += `
      <a href="${postURL}" class="carousel-item-link">
        <div class="carousel-item">
          <img src="${imageUrl}" alt="${post.title.rendered}">
          <h2>${post.title.rendered}</h2>
          <p>${truncatedExcerpt}</p>
          <a href="${postURL}" class="read-more-link">Read more</a>
        </div>
      </a>
    `;
  });

  carouselContainer.innerHTML = carouselHTML;
}

const initSlider = () => {
  const carouselContainer = document.getElementById("carousel-container");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft =
    carouselContainer.scrollWidth - carouselContainer.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      carouselContainer.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-btn" ? -1 : 1;
      const scrollAmount = carouselContainer.clientWidth * direction;
      carouselContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  });

  const handleSlideButtons = () => {
    const isAtStart = carouselContainer.scrollLeft <= 0;
    const isAtEnd = carouselContainer.scrollLeft >= maxScrollLeft;

    slideButtons[0].style.display = isAtStart ? "none" : "flex";
    slideButtons[1].style.display = isAtEnd ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = carouselContainer.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when the carousel container is scrolled
  carouselContainer.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });

  window.addEventListener("resize", () => {
    handleSlideButtons(); // Update slide button visibility on window resize
  });

  window.addEventListener("load", () => {
    handleSlideButtons(); // Initial check for slide button visibility on page load
  });
};

// Call the initSlider function when the document is loaded
window.addEventListener("DOMContentLoaded", initSlider);
