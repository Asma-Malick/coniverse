const clubsData = [
  {
    name: "Design Club",
    description: "Join us to explore the world of design and collaborate with talented individuals!",
    imgSrc: "design.jpeg",
  },
  {
    name: "AI & Robotics Club",
    description: "For students passionate about Artificial Intelligence, Machine Learning, and Robotics.",
    imgSrc: "robotics.jpeg",
  },
  {
    name: "Photography Club",
    description: "Capture beautiful moments, enhance your photography skills, and participate in photo walks.",
    imgSrc: "photography.jpeg",
  },
  {
    name: "Music Club",
    description: "Whether you're a singer, instrumentalist, or a music lover, this club is for you!",
    imgSrc: "music.jpeg",
  },
  {
    name: "Sports Club",
    description: "Get fit, join competitions, and be a part of the sports community.",
    imgSrc: "fitness.jpeg",
  },
  {
    name: "Literature Club",
    description: "For those who love reading, writing, and discussing literature in a creative environment.",
    imgSrc: "literature.jpeg",
  }
];

// Dynamically render club cards
function renderClubs() {
  const clubsContainer = document.getElementById("clubsContainer");
  clubsData.forEach((club) => {
    const clubCard = `
      <div class="col-md-4">
        <div class="card">
          <img src="${club.imgSrc}" alt="${club.name}">
          <div class="card-body">
            <h5 class="card-title">${club.name}</h5>
            <p class="card-text">${club.description}</p>
            <button class="btn btn-primary" onclick="joinClub('${club.name}')">Join</button>
          </div>
        </div>
      </div>
    `;
    clubsContainer.innerHTML += clubCard;
  });
}

// Handle Join button click
function joinClub(clubName) {
  alert(`You have joined the ${clubName}!`);
}

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

// Initial render
renderClubs();
