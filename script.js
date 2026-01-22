const container = document.querySelector("#container");

function createGrid(size) {
  container.innerHTML = "";

  const total = size * size;
  const squareSize = 960 / size;

  for (let i = 0; i < total; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    container.appendChild(square);
  }
}

createGrid(16);

container.addEventListener("mouseover", (event) => {
    const hovered = event.target
    if (hovered.classList.contains("square")) {
        hovered.style.backgroundColor = "black";
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