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
    const title = document.createElement("h1");
    title.textContent = post.title.rendered;
    const postContent = post.content.rendered;

    postContentElement.innerHTML = `<div class="flex-container">${postContent}</div>`;

    // Append title to postContentElement
    postContentElement.insertBefore(title, postContentElement.firstChild);

    // Function to display modal
    function displayModal(imageUrl) {
      const modal = document.getElementById("myModal");
      const modalImg = document.getElementById("expandedImg");

      modal.style.display = "block";
      modalImg.src = imageUrl;

      // Close modal when clicking on close button
      const closeButton = document.getElementsByClassName("close")[0];
      closeButton.onclick = () => {
        modal.style.display = "none";
      };

      // Close modal when clicking outside the modal content
      window.onclick = (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    }

    // Find all img elements inside the post content and attach modal behavior
    const imgs = postContentElement.querySelectorAll("img");
    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        displayModal(img.src);
      });
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
