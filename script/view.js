import { CreateElement } from "./create.js";

export class View {
  constructor(arrField) {
    this.bombButtons = [];
    this.render(arrField);
  }

  render(arrField) {
    const element = new CreateElement();
    const title = element.create("h1", "title", document.body, "MINESWEEPER");
    const wrapper = element.create("div", "wrapper", document.body);

    arrField.forEach((row) => {
      row.forEach((cell) => {
        const button = element.create("button", "cell", wrapper, " ");
        if (cell.isBomb) {
          this.bombButtons.push(button);
        }
        button.onclick = () =>
          this.clickCell(
            button,
            cell.isBomb,
            cell.isRevealed,
            cell.neighborBombCount
          );
        button.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          if (!button.classList.contains("revealed")) {
            button.classList.toggle("flagged");
          }
        });
      });
    });
  }

  clickCell(button, isBomb, isRevealed, neighborBombCount) {
    if (isBomb) {
      this.bombButtons.forEach((button) => {
        button.classList.add("bomb");
      });
      alert("Game over!");
    } else if (!isRevealed) {
      isRevealed = true;
      button.classList.add("revealed");
      if (neighborBombCount > 0) {
        button.textContent = neighborBombCount;
      }
    }
  }
}
