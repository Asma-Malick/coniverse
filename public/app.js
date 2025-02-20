const postsData = [
  { name: "John Doe", content: "Excited about the upcoming AI workshop at MIT! 🚀", time: "10 mins ago", likes: 10, comments: ["Looks amazing!", "Wish I could join!"], image: null },
  { name: "Jane Smith", content: "Join our design club for amazing collaborations! 🎨", time: "30 mins ago", likes: 5, comments: ["I am in!", "Count me in!"], image: null },
];

let posts = [...postsData];

function renderPosts() {
  const postFeed = document.getElementById("post-feed");
  postFeed.innerHTML = "";
  posts.forEach((post, index) => {
    const postCard = `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card post-card">
          <div class="card-body">
            <h5 class="card-title">${post.name}</h5>
            <p class="card-text">${post.content}</p>
            ${post.image ? `<img src="${post.image}" class="post-image" alt="post">` : ""}
            <footer><small>${post.time}</small></footer>
            <button class="btn btn-outline-primary" onclick="handleLike(${index})">Like ${post.likes}</button>
            <input type="text" class="form-control my-2" placeholder="Add a comment..." onkeypress="handleComment(event, ${index})">
            <ul>
              ${post.comments.map(comment => `<li>${comment}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    postFeed.innerHTML += postCard;
  });
}

function handleLike(index) {
  posts[index].likes++;
  renderPosts();
}

function handleComment(event, index) {
  if (event.key === "Enter") {
    posts[index].comments.push(event.target.value);
    event.target.value = "";
    renderPosts();
  }
}

document.getElementById("postSubmit").addEventListener("click", function() {
  const newPostContent = document.getElementById("newPostContent").value.trim();
  const newPostImage = document.getElementById("imageUpload").files[0];
  if (newPostContent) {
    const reader = new FileReader();
    reader.onloadend = function () {
      posts.push({
        name: "User",
        content: newPostContent,
        time: "Just now",
        likes: 0,
        comments: [],
        image: reader.result
      });
      document.getElementById("newPostContent").value = "";
      document.getElementById("imageUpload").value = "";
      renderPosts();
    };
    if (newPostImage) reader.readAsDataURL(newPostImage);
    else renderPosts();
  }
});

// Initial render
renderPosts();


