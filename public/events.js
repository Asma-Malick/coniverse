// Data for events
const events = [
  {
      title: "Tech Fusion 2K25",
      description: "Join us for an exciting tech event featuring coding challenges and IoT workshops. Perfect for all tech enthusiasts!",
      image: "techfusion.jpeg",
      registrationLink: "https://forms.gle/uGAtuy84sksgnbKVA"
  },
  {
      title: "Hackaithon 2025",
      description: "Explore the future of AI and Machine Learning with industry experts. Don't miss out on cutting-edge insights!",
      image: "hackaithon.jpeg",
      registrationLink: "https://shorturl.at/vMnJE"
  },
  {
      title: "Cyber Fest 2025",
      description: "Students and entrepreneurs will pitch their startup ideas. Join us to see the next big thing in innovation!",
      image: "cyberfest.jpeg",
      registrationLink: "https://rb.gy/ehvo03"
  }
];

// Function to dynamically create event cards
function loadEvents() {
  const container = document.getElementById("event-container");

  events.forEach(event => {
      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
          <img src="${event.image}" alt="${event.title}">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <a href="${event.registrationLink}" target="_blank">Register Now</a>
      `;
      
      container.appendChild(card);
  });
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

// Load events when the page is ready
document.addEventListener("DOMContentLoaded", loadEvents);
