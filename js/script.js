const endpoint =
  "https://www.travelandexplore.no/wp-json/wp/v2/pages?slug=blog";

fetch(endpoint)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    if (data.length > 0) {
      const blogPage = data[0];
      const pageContent = blogPage.content.rendered;

      const blogContentElement = document.getElementById("blogContent");
      blogContentElement.innerHTML = `
            <div>${pageContent}</div>
          `;
    } else {
      console.log('No data found for the "blog" page.');
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Fetch posts and create image elements with their respective post links
const postsEndpoint = "http://travel-explore.local/wp-json/wp/v2/posts";
const blogContentElement = document.getElementById("blogContent");

fetch(postsEndpoint)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((posts) => {
    posts.forEach((post) => {
      const postImage = post.image_url; // Replace with the actual image URL property in your JSON data
      const postLink = post.link; // Replace with the actual post link property in your JSON data

      const imgElement = document.createElement("img");
      imgElement.src = postImage;

      const linkElement = document.createElement("a");
      linkElement.href = postLink; // Link to the specific post page
      linkElement.appendChild(imgElement);

      // Add event listener to the image to navigate to its post page
      imgElement.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = postLink; // Redirect to the specific post page
      });

      blogContentElement.appendChild(linkElement);
    });
  })
  .catch((error) => {
    console.error("There was a problem with fetching posts:", error);
  });
