const postsContainer = document.getElementById("postsContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let page = 1;
const perPage = 10;

// Function to fetch and display posts
async function fetchAndDisplayPosts() {
  try {
    const response = await fetch(
      `https://travelandexplore.no/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`
    );
    const data = await response.json();

    if (data.length === 0) {
      loadMoreBtn.style.display = "none";
      return;
    }

    displayPosts(data);
    page++;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Function to display posts
function displayPosts(posts) {
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

      const title = document.createElement("h1");
      title.textContent = post.title.rendered;

      postContainer.appendChild(postLink);
      postContainer.appendChild(title);
      postsContainer.appendChild(postContainer);
    }
  });
}

loadMoreBtn.addEventListener("click", fetchAndDisplayPosts);

// Initially load the first set of posts
fetchAndDisplayPosts();
