import InnCardTasks from "./innercardtasks";
import Controller from "./controller";

document.addEventListener("DOMContentLoaded", () => {
  const cardsTodo = new InnCardTasks("todo");
  cardsTodo.bindToDOM();
  const cardInProgress = new InnCardTasks("in progress");
  cardInProgress.bindToDOM();
  const cardDone = new InnCardTasks("done");
  cardDone.bindToDOM();
});

const controller = new Controller(document.querySelector(".tasks"));

document.documentElement.addEventListener("mouseover", controller.onMouseOver);
document.documentElement.addEventListener("mouseout", controller.onMouseOut);
document.documentElement.addEventListener("mousedown", controller.onMouseDown);
document.documentElement.addEventListener("mousemove", controller.onMouseMove);
document.documentElement.addEventListener("mouseup", controller.onMouseUp);

window.addEventListener("unload", () => {
  const cardTasks = [...document.querySelectorAll(".card-tasks")];
  for (const item of cardTasks) {
    const tasks = item.querySelector(".tasks").innerHTML;
    localStorage.setItem(
      item.querySelector("h2").textContent.toLocaleLowerCase(),
      JSON.stringify(tasks),
    );
  }
});
