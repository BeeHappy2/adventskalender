const calendar = document.getElementById("calendar");

// Array mit den Zahlen 1 bis 24
let days = Array.from({ length: 24 }, (_, i) => i + 1);

// Array mischen (Fisher-Yates-Algorithmus)
for (let i = days.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [days[i], days[j]] = [days[j], days[i]];
}

// Türchen in zufälliger Reihenfolge erzeugen
days.forEach(day => {
  const door = document.createElement("div");
  door.className = "door";
  door.textContent = day;

  door.addEventListener("click", () => {
    const today = new Date().getDate();
    if (day <= today) {
      door.classList.add("opened");
      alert("🎁 Überraschung für Tag " + day);
    } else {
      alert("Noch nicht geöffnet!");
    }
  });

  calendar.appendChild(door);
});
