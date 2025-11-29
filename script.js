const calendar = document.getElementById("calendar");

// Inhalte für jedes Türchen
const surprises = {
  1: "Heute gibt’s einen lieben Gruß 💌",
  2: "Bild: bilder/tag2.jpg",
  3: "Link: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  // ... bis 24
};

// Array mit den Zahlen 1 bis 24
let days = Array.from({ length: 24 }, (_, i) => i + 1);

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

      // Inhalt anzeigen
      alert("🎁 " + (surprises[day] || "Überraschung für Tag " + day));
    } else {
      alert("Noch nicht geöffnet!");
    }
  });

  calendar.appendChild(door);
});
