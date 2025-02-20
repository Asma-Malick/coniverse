// Event Listener for Submit Button
document.getElementById("submitInterestBtn").addEventListener("click", function() {
  const fieldOfInterest = document.getElementById("fieldOfInterest").value;

  if (!fieldOfInterest) {
      alert("Please select a field of interest.");
      return;
  }

  // Fetch news related to the selected field
  fetchNews(fieldOfInterest);
});

// Function to Fetch and Display News
function fetchNews(field) {
  const updatesContainer = document.getElementById("updatesContainer");

  // Clear previous updates
  updatesContainer.innerHTML = "";

  // For demonstration purposes, using static data
  const newsData = getDummyNews(field);

  // Display news updates dynamically
  newsData.forEach(news => {
      const newsBox = document.createElement("div");
      newsBox.classList.add("update-box");

      const title = document.createElement("h5");
      title.innerText = news.title;

      const description = document.createElement("p");
      description.innerText = news.description;

      newsBox.appendChild(title);
      newsBox.appendChild(description);

      updatesContainer.appendChild(newsBox);
  });
}

// Function to Simulate fetching news (Dummy Data)
function getDummyNews(field) {
  const news = {
      "technology": [
          { title: "Tech Innovations in 2025", description: "Exploring the latest advancements in technology." },
          { title: "AI Revolution", description: "How AI is changing the way we live." }
      ],
      "science": [
          { title: "New Discoveries in Space", description: "Astronomers discover new galaxies." },
          { title: "The Science of Climate Change", description: "What we know and how we can help." }
      ],
      "business": [
          { title: "Stock Market Updates", description: "How businesses are performing today." },
          { title: "Global Business Trends", description: "A look into the future of the economy." }
      ],
      "health": [
          { title: "Mental Health Awareness", description: "The importance of mental well-being." },
          { title: "Health Trends in 2025", description: "What we can expect in the healthcare sector." }
      ],
      "sports": [
          { title: "Upcoming Olympics", description: "What to expect in the 2024 Summer Games." },
          { title: "Football League Highlights", description: "Breaking news from the world of football." }
      ]
  };

  return news[field] || [];
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