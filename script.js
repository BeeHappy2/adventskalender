const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  const sicher = confirm("Bist du sicher, dass du den Fortschritt löschen möchtest?");
  if (sicher) {
    localStorage.removeItem("openedDoors"); // gespeicherten Zustand löschen
    location.reload(); // Seite neu laden
  }
});
const calendar = document.getElementById("calendar");
// Reset-Button Funktion mit Bestätigung
// Array mit den Zahlen 1 bis 24
let days = Array.from({ length: 24 }, (_, i) => i + 1);

// Array mischen (Fisher-Yates-Algorithmus)
for (let i = days.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [days[i], days[j]] = [days[j], days[i]];
}
// Bereits geöffnete Türchen laden
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

      alert("🎁 Überraschung für Tag " + day);
    } else {
      alert("Noch nicht geöffnet!");
    }
  });

  calendar.appendChild(door);

});






