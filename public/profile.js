document.getElementById("editProfileBtn").addEventListener("click", function() {
  const userName = document.getElementById("userName").innerText;
  const userBio = document.getElementById("userBio").innerText;
  const userEmail = document.getElementById("userEmail").innerText;

  // Fill modal with current profile data
  document.getElementById("newUsername").value = userName;
  document.getElementById("newBio").value = userBio;
  document.getElementById("newEmail").value = userEmail;

  // Show the edit profile modal
  const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
  editProfileModal.show();
});

document.getElementById("saveChangesBtn").addEventListener("click", function() {
  const newUsername = document.getElementById("newUsername").value;
  const newBio = document.getElementById("newBio").value;
  const newEmail = document.getElementById("newEmail").value;

  // Save changes to profile info
  document.getElementById("userName").innerText = newUsername;
  document.getElementById("userBio").innerText = newBio;
  document.getElementById("userEmail").innerText = newEmail;

  // Hide the modal
  const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
  editProfileModal.hide();
});

// Sample posts (in real scenarios, this will be fetched dynamically)
const postsContainer = document.getElementById('postsContainer');
const samplePosts = [
  'post1.jpeg', 'post2.jpeg', 'post3.jpeg'
];

samplePosts.forEach(post => {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.innerHTML = `<img src="${post}" alt="Post Image">`;
  postsContainer.appendChild(postElement);
});

function searchAndHighlight() {
  let searchText = document.getElementById("searchInput").value.trim();
  if (!searchText) return;

  let bodyText = document.body.innerHTML;
  let regex = new RegExp(`(${searchText})`, "gi"); // Case-insensitive search
  let match = bodyText.match(regex);

  if (match) {
      let range = document.createRange();
      let selection = window.getSelection();
      selection.removeAllRanges();

      let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      while (walker.nextNode()) {
          let node = walker.currentNode;
          let index = node.nodeValue.toLowerCase().indexOf(searchText.toLowerCase());

          if (index !== -1) {
              range.setStart(node, index);
              range.setEnd(node, index + searchText.length);
              selection.addRange(range);
              node.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
              return;
          }
      }
  } else {
      alert("Text not found!");
  }
}
