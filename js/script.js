const postsContainer = document.getElementById("postsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const spinner = document.querySelector(".spinner"); // Select the spinner element
let page = 1;
const perPage = 10;
let allPostsLoaded = false;

// Function to display loader
function showLoader() {
  spinner.style.display = "block";
}

// Function to hide loader
function hideLoader() {
  spinner.style.display = "none";
}

// Function to display posts with additional content
function displayPosts(posts) {
  if (!Array.isArray(posts) || posts.length === 0) {
    allPostsLoaded = true;
    loadMoreBtn.textContent = "No more posts";
    loadMoreBtn.disabled = true;
    return;
  }

  posts.forEach((post) => {
    const embeddedImage = post._embedded["wp:featuredmedia"];
    if (embeddedImage && embeddedImage.length > 0) {
      const imageUrl = embeddedImage[0].source_url;

      const postContainer = document.createElement("div");
      postContainer.classList.add("post-container");

      const postLink = document.createElement("a");
      postLink.href = `/html/specific-post.html?id=${post.id}`;

      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = post.title.rendered;
      postLink.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = post.title.rendered;

      postContainer.appendChild(postLink);
      postContainer.appendChild(title);

      postsContainer.appendChild(postContainer);
    }
  });
}

// Function to handle errors and display error message
function displayErrorMessage(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  postsContainer.innerHTML = "";
  postsContainer.appendChild(errorMessage);
}

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
  try {
    showLoader(); // Show loader when fetching posts
    const response = await fetch(
      `https://travelandexplore.no/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`
    );
    const data = await response.json();

    displayPosts(data);
    hideLoader();
    page++;
  } catch (error) {
    console.error("Error fetching posts:", error);
    hideLoader();
  }
}

loadMoreBtn.addEventListener("click", function () {
  if (!allPostsLoaded) {
    fetchAndDisplayPosts();
  }
});

// Initially load the first set of posts
document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayPosts();
});
