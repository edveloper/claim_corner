const animationInput = document.createElement('input');
animationInput.setAttribute('name', 'animation')
document.body.append(animationInput);

document.addEventListener("DOMContentLoaded", function() {
    const subscribeButton = document.querySelector("#subscription-form-1-tTq0TJu39V button");
    subscribeButton.addEventListener("click", subscribe);
  });

  function subscribe(event) {
    event.preventDefault();

    const emailInput = document.querySelector("#email-header02-0");
    const email = emailInput.value;

    const data = { email };

    fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle the response data accordingly
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  fetch('/recent-posts')
  .then(response => response.json())
  .then(data => {
    const recentPostsSection = document.getElementById('blog-1-tTq0TJvt8y');

    data.forEach(post => {
      const item = document.createElement('div');
      item.classList.add('item', 'features-image', 'col-12', 'col-md-6', 'col-lg-3');
      
      const itemWrapper = document.createElement('div');
      itemWrapper.classList.add('item-wrapper');

      const itemImg = document.createElement('div');
      itemImg.classList.add('item-img', 'mb-3');
      const img = document.createElement('img');
      img.setAttribute('src', post.image);
      itemImg.appendChild(img);

      const itemContent = document.createElement('div');
      itemContent.classList.add('item-content', 'align-left');

      const itemSubtitle = document.createElement('h6');
      itemSubtitle.classList.add('item-subtitle', 'mbr-fonts-style', 'mb-3', 'display-5');
      const postLink = document.createElement('a');
      postLink.classList.add('fw-bold');
      postLink.setAttribute('href', `/blog/${post.id}`); // Adjust this link based on your blog post structure
      postLink.textContent = post.title;
      itemSubtitle.appendChild(postLink);

      const postPreview = document.createElement('p');
      postPreview.classList.add('mbr-text', 'mbr-fonts-style', 'mb-3', 'display-7');
      postPreview.textContent = post.content.substring(0, 100) + '...'; // Adjust the character limit as needed

      const itemFooter = document.createElement('div');
      itemFooter.classList.add('mbr-section-btn', 'item-footer');
      const readMoreButton = document.createElement('a');
      readMoreButton.setAttribute('href', `/blog/${post.id}`); // Adjust this link as well
      readMoreButton.classList.add('btn', 'item-btn', 'btn-primary', 'display-7');
      readMoreButton.textContent = 'Read';
      itemFooter.appendChild(readMoreButton);

      itemContent.appendChild(itemSubtitle);
      itemContent.appendChild(postPreview);
      itemContent.appendChild(itemFooter);

      itemWrapper.appendChild(itemImg);
      itemWrapper.appendChild(itemContent);

      item.appendChild(itemWrapper);

      recentPostsSection.appendChild(item);
    });
  })
  .catch(error => console.error('Error fetching recent posts:', error));

  // Code to populate the blog posts section
function populateBlogPosts(posts) {
  const blogPostsSection = document.getElementById('blog-posts-section');

  posts.forEach(post => {
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    const postImage = document.createElement('div');
    postImage.classList.add('post-image');
    const image = document.createElement('img');
    image.setAttribute('src', post.image);
    image.setAttribute('alt', post.title);
    postImage.appendChild(image);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    const postText = document.createElement('p');
    postText.textContent = post.content.substring(0, 100) + '...'; // Adjust the character limit as needed
    const readMoreLink = document.createElement('a');
    readMoreLink.setAttribute('href', `/blog/${post.id}`); // Adjust the link accordingly
    readMoreLink.classList.add('read-more');
    readMoreLink.textContent = 'Read More';

    postContent.appendChild(postTitle);
    postContent.appendChild(postText);
    postContent.appendChild(readMoreLink);

    blogPost.appendChild(postImage);
    blogPost.appendChild(postContent);

    blogPostsSection.appendChild(blogPost);
  });
}

// Simulated data to demonstrate the blog post population
const samplePosts = [
  {
    id: 1,
    title: "The Future of Insurance: Trends to Watch",
    content: "Discover the latest trends shaping the insurance industry and what they mean for you. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "assets/images/photo-1633158829585-23ba8f7c8caf.jpeg"
  },
  // Add more sample posts here
];

// Call the function to populate the blog posts section
populateBlogPosts(samplePosts);