const calendar = document.getElementById("calendar");

// Inhalte für jedes Türchen definieren
const surprises = {
  1: { type: "text", content: "Heute gibt’s einen lieben Gruß 💌" },
  2: { type: "image", content: "bilder/tag2.jpg" },
  3: { type: "link", content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  4: { type: "text", content: "Ein kleines Gedicht: 🎶\nAdvent, Advent, ein Lichtlein brennt..." },
  // ... bis 24
};

// Array mit den Zahlen 1 bis 24
let days = Array.from({ length: 24 }, (_, i) => i + 1);

// Array mischen (Fisher-Yates)
for (let i = days.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [days[i], days[j]] = [days[j], days[i]];
}

// Türchen erzeugen
days.forEach(day => {
  const door = document.createElement("div");
  door.className = "door";
  door.textContent = day;

  door.addEventListener("click", () => {
    const today = new Date().getDate();
    if (day <= today) {
      door.classList.add("opened");
      const surprise = surprises[day];

      if (surprise) {
        if (surprise.type === "text") {
          alert(surprise.content);
        } else if (surprise.type === "image") {
          const img = document.createElement("img");
          img.src = surprise.content;
          img.style.maxWidth = "200px";
          document.body.appendChild(img);
        } else if (surprise.type === "link") {
          window.open(surprise.content, "_blank");
        }
      } else {
        alert("🎁 Überraschung für Tag " + day);
      }
    } else {
      alert("Noch nicht geöffnet!");
    }
  });

  calendar.appendChild(door);
});
