const resizeBtn = document.querySelector("#resizeBtn");
const clearBtn = document.querySelector("#clearBtn");
const classicBtn = document.querySelector("#classicBtn");
const rgbBtn = document.querySelector("#rgbBtn");
const darkenBtn = document.querySelector("#darkenBtn");
const eraserBtn = document.querySelector("#eraserBtn");

const modeButtons = [classicBtn, rgbBtn, darkenBtn, eraserBtn];

let mode = "classic";

function setMode(newMode, activeBtn) {
  mode = newMode;
  modeButtons.forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

setMode("classic", classicBtn);

function createGrid(size) {
  container.innerHTML = "";

  const total = size * size;
  const squareSize = 960 / size;

  for (let i = 0; i < total; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.darkness = "0";
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    container.appendChild(square);
  }
}

createGrid(16);

classicBtn.addEventListener("click", () => setMode("classic", classicBtn));
rgbBtn.addEventListener("click", () => setMode("rgb", rgbBtn));
darkenBtn.addEventListener("click", () => setMode("darken", darkenBtn));
eraserBtn.addEventListener("click", () => setMode("eraser", eraserBtn));

container.addEventListener("mouseover", (event) => {
    const hovered = event.target
    if (hovered.classList.contains("square")) {
    switch (mode) {
      case "rgb":
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        hovered.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      break;
      case "darken":
      let d = Number(hovered.dataset.darkness)
      d = d + 1
      if (d > 10) d = 10;
      hovered.dataset.darkness = String(d)
      hovered.style.backgroundColor = `rgba(0, 0, 0, ${d / 10})`;
      break;
      case "eraser":
      hovered.style.backgroundColor = ""; 
      hovered.dataset.darkness = "0";
      break;
      default:
        hovered.style.backgroundColor = "black";
      break;
    }
  }
});

resizeBtn.addEventListener("click", () => {
   const gridNumber = prompt("Please enter the grid size (1–100):");
    if (gridNumber === null) {
        return;
    }
    const size = Number(gridNumber);

    if (!Number.isInteger(size)) {
    alert("Please enter a whole number (integer).");
    return;
    }
    if (size < 1 || size > 100) {
    alert("Invalid number. Minimum is 1 and maximum is 100.");
    return;
  }

  createGrid(size);
});

clearBtn.addEventListener("click", () => {
  const squares = container.querySelectorAll(".square");
  squares.forEach(square => {
    square.style.backgroundColor = "";
    square.dataset.darkness = "0";
  });
});