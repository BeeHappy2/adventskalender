const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  const sicher = confirm("Bist du sicher, dass du den Fortschritt löschen möchtest?");
  if (sicher) {
    localStorage.removeItem("openedDoors");
    location.reload();
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

// Inhalte: Bild oder Video
const inhalte = {
  1: { type: "image", src: "Bild/tuerchen1.jpg" },
  2: { type: "image", src: "Bild/tuerchen2.jpg" },
  3: { type: "image", src: "Bild/tuerchen3.jpg" },
  4: { type: "image", src: "Bild/tuerchen4.jpg" },
  5: { type: "image", src: "Bild/tuerchen5.jpg" },
  6: { type: "image", src: "Bild/tuerchen6.jpg" },
  7: { type: "image", src: "Bild/tuerchen7.jpg" },
  8: { type: "image", src: "Bild/tuerchen8.jpg" },
  9: { type: "image", src: "Bild/tuerchen9.jpg" },
 10: { type: "video", src: "Videos/tuerchen10.mp4" },
 11: { type: "image", src: "Bild/tuerchen11.jpg" },
 12: { type: "image", src: "Bild/tuerchen12.jpg" },
 13: { type: "image", src: "Bild/tuerchen13.jpg" },
 14: { type: "image", src: "Bild/tuerchen14.jpg" },
 15: { type: "image", src: "Bild/tuerchen15.jpg" },
 16: { type: "image", src: "Bild/tuerchen16.jpg" },
 17: { type: "image", src: "Bild/tuerchen17.jpg" },
 18: { type: "image", src: "Bild/tuerchen18.jpg" },
 19: { type: "image", src: "Bild/tuerchen19.jpg" },
 20: { type: "image", src: "Bild/tuerchen20.jpg" },
 21: { type: "image", src: "Bild/tuerchen21.jpg" },
  //21: "Bild/tuerchen21.jpg",
  //22: "Bild/tuerchen22.jpg",
  //23: "Bild/tuerchen23.jpg",
  //24: "Bild/tuerchen24.jpg",
};

const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const popupVideo = document.getElementById("popup-video");
const popupYoutube = document.getElementById("popup-youtube");
const popupClose = document.getElementById("popup-close");

popupClose.addEventListener("click", () => {
  popup.style.display = "none";
  popupVideo.pause(); // Video stoppen beim Schließen
});

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

      // Inhalte anzeigen
      if (inhalte[day]) {
        popupImage.style.display = "none";
        popupVideo.style.display = "none";
        popupYoutube.style.display = "none";

        if (inhalte[day].type === "image") {
          popupImage.src = inhalte[day].src;
          popupImage.style.display = "block";
        } else if (inhalte[day].type === "video") {
          popupVideo.src = inhalte[day].src;
          popupVideo.style.display = "block";
        } else if (inhalte[day].type === "youtube") {
          popupYoutube.src = inhalte[day].src;
          popupYoutube.style.display = "block";
        }

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



