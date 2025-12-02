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
  3: "tuerchen3.jpg",
  4: "tuerchen4.jpg",
  5: "tuerchen5.jpg",
  6: "tuerchen6.jpg",
  7: "tuerchen7.jpg",
  //8: "tuerchen8.jpg",
  //9: "tuerchen9.jpg",
  //10: "tuerchen10.jpg",
  //11: "tuerchen11.jpg",
  //12: "tuerchen12.jpg",
  //13: "tuerchen13.jpg",
  //14: "tuerchen14.jpg",
  //15: "tuerchen15.jpg",
  //16: "tuerchen16.jpg",
  //17: "tuerchen17.jpg",
  //18: "tuerchen18.jpg",
  //19: "tuerchen19.jpg",
  //20: "tuerchen20.jpg",
  //21: "tuerchen21.jpg",
  //22: "tuerchen22.jpg",
  //23: "tuerchen23.jpg",
  //24: "tuerchen24.jpg",
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








