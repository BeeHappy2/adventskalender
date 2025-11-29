const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  const sicher = confirm("Bist du sicher, dass du den Fortschritt löschen möchtest?");
  if (sicher) {
    localStorage.removeItem("openedDoors"); // gespeicherten Zustand löschen
    location.reload(); // Seite neu laden
  }
});

const calendar = document.getElementById("calendar");

// Array mit den Zahlen 1 bis 24
let days = Array.from({ length: 24 }, (_, i) => i + 1);

// Array mischen (Fisher-Yates-Algorithmus)
for (let i = days.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [days[i], days[j]] = [days[j], days[i]];
}

// Bereits geöffnete Türchen laden
let openedDoors = JSON.parse(localStorage.getItem("openedDoors")) || [];

// Zuordnung: Tag → Bilddatei
const bilder = {
  1: "tuerchen1.jpg",
  2: "tuerchen2.jpg",
  //3: "bilder/tag3.jpg",
  // usw. bis 24
};

// Popup-Elemente
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const popupClose = document.getElementById("popup-close");

// Schließen-Funktion
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

// Türchen erzeugen
days.forEach(day => {
  const door = document.createElement("div");
  door.className = "door";
  door.textContent = day;

  if (openedDoors.includes(day)) {
    door.classList.add("opened");
  }

  door.addEventListener("click", () => {
    const today = new Date().getDate();
    if (day <= today) {
      door.classList.add("opened");

      if (!openedDoors.includes(day)) {
        openedDoors.push(day);
        localStorage.setItem("openedDoors", JSON.stringify(openedDoors));
      }

      // Popup mit Bild öffnen
      if (bilder[day]) {
        popupImage.src = bilder[day];
        popup.style.display = "block";
      } else {
        alert("🎁 Überraschung für Tag " + day);
      }
    } else {
      alert("🕯️ Das Türchen ist noch nicht dran. \n Du musst dich noch " + (day - today) + " Tag(e) gedulden. 😉 ");
    }
  });

  calendar.appendChild(door);
});





