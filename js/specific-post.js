// Get the post ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const postContentElement = document.getElementById("postContent");
const additionalContent = document.createElement("div");

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

    // Append the additional HTML content to the postContentElement
    const postContent = document.createElement("div");
    postContent.innerHTML = post.content.rendered;
    postContent.classList.add("flex-container");

    const title = document.createElement("h1");
    title.textContent = post.title.rendered;

    const dateParagraph = document.createElement("p");
    const postDate = new Date(post.date);
    dateParagraph.textContent = `${postDate.toDateString()}`;
    dateParagraph.classList.add("post-date");

    // Extract food-related content and add it to additional content
    const foodElements = postContent.querySelectorAll(
      ".wp-block-group.food-text"
    );
    foodElements.forEach((foodElement) => {
      const foodBlock = document.createElement("div");
      foodBlock.classList.add("food-block");

      const foodImg = foodElement.querySelector("img");
      const foodImageSrc = foodImg.getAttribute("src");
      const foodDescription = foodElement.querySelector(".wp-block-verse");
      const foodDescriptionText = foodDescription.textContent.trim();

      const foodBlockContent = `
        <img src="${foodImageSrc}" alt="Food Image">
        <pre class="food-description">${foodDescriptionText}</p>
      `;
      foodBlock.innerHTML = foodBlockContent;

      additionalContent.appendChild(foodBlock);
    });

    // Append title, date, post content, and additional content to postContentElement
    postContentElement.appendChild(title);
    postContentElement.appendChild(dateParagraph);
    postContentElement.appendChild(postContent);
    postContentElement.appendChild(additionalContent);

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
