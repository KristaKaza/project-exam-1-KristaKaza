// Get the post ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const postContentElement = document.getElementById("postContent");

// Fetch the specific post data using the WordPress REST API
fetch(`https://travelandexplore.no/wp-json/wp/v2/posts/${postId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const post = data;

    // Display the content of the fetched post
    const postContent = post.content.rendered;
    postContentElement.innerHTML = `<div class="flex-container">${postContent}</div>`;

    const title = document.createElement("h1");
    title.textContent = post.title.rendered; // Access post title correctly

    // Append title to postContentElement
    postContentElement.insertBefore(title, postContentElement.firstChild);
  })

  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
