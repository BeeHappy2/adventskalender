const calendar = document.getElementById("calendar");

// Inhalte für jedes Türchen
const surprises = {
  1: { type: "text", content: "Heute gibt’s einen lieben Gruß 💌" },
  2: { type: "image", content: "bilder/tag2.jpg" },
  3: { type: "link", content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  // ... bis 24
};

// Array mit den Zahlen 1 bis 24
let days = Array.from({ length: 24 }, (_, i) => i + 1);

// Array mischen
for (let i = days.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [days[i], days[j]] = [days[j], days[i]];
}

// Bereits geöffnete Türchen aus localStorage laden
let openedDoors = JSON.parse(localStorage.getItem("openedDoors")) || [];

// Türchen erzeugen
days.forEach(day => {
  const door = document.createElement("div");
  door.className = "door";
  door.textContent = day;

  // Falls schon geöffnet → grün markieren
  if (openedDoors.includes(day)) {
    door.classList.add("opened");
  }

  door.addEventListener("click", () => {
    const today = new Date().getDate();
    if (day <= today) {
      door.classList.add("opened");

      // Fortschritt speichern
      if (!openedDoors.includes(day)) {
        openedDoors.push(day);
        localStorage.setItem("openedDoors", JSON.stringify(openedDoors));
      }

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
