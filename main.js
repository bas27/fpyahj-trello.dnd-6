/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/innercardtasks.js
class InnCardTesks {
  constructor(title) {
    this.title = title;
    this.board = document.querySelector(".board-tasks");
    this._activTask = undefined;
    this.saveTasks = JSON.parse(localStorage.getItem(this.title.toLowerCase())) ? JSON.parse(localStorage.getItem(this.title.toLowerCase())) : undefined;
  }
  static get markup() {
    return `
        <div class="card-tasks">
          <h2></h2>
          <ul class="tasks">
          </ul>
          <div class="add-card">
            <h3 class="another">+ Добавить другую карточку</h3>
            <div class="add-button-container invisible">
                <textarea class="description-card" cols="10" rows="3" maxlength="130" placeholder="Введите название вашей карточки" required></textarea>
                <button class="add-button">Добавить</button>
                <div class="close-description"></div>
            </div>
          </div>
        </div>
      `;
  }
  static get cardTasksSelector() {
    return ".card-tasks";
  }
  static get tasksSelector() {
    return ".tasks";
  }
  static get descriptionCardSelector() {
    return ".description-card";
  }
  static get addCardSelector() {
    return ".add-card";
  }
  static get anotherSelector() {
    return ".another";
  }
  static get addButtonContainerSelector() {
    return ".add-button-container";
  }
  static get addButtonSelector() {
    return ".add-button";
  }
  static get closeDescriptionSelector() {
    return ".close-description";
  }
  bindToDOM() {
    this.board.insertAdjacentHTML("beforeend", InnCardTesks.markup);
    this.cardTasks = [...document.querySelectorAll(InnCardTesks.cardTasksSelector)].filter(el => !el.classList.contains(this.title.toLowerCase()) && el.classList.length < 2)[0];
    this.tasks = this.cardTasks.querySelector(InnCardTesks.tasksSelector);
    this.descriptionCard = this.cardTasks.querySelector(InnCardTesks.descriptionCardSelector);
    this.addCard = this.cardTasks.querySelector(InnCardTesks.addCardSelector);
    this.another = this.cardTasks.querySelector(InnCardTesks.anotherSelector);
    this.addButtonContainer = this.cardTasks.querySelector(InnCardTesks.addButtonContainerSelector);
    this.addButton = this.cardTasks.querySelector(InnCardTesks.addButtonSelector);
    this.closeDescription = this.cardTasks.querySelector(InnCardTesks.closeDescriptionSelector);
    this.innTitle();
    if (this.saveTasks) this.tasks.innerHTML = this.saveTasks;
    this.board.addEventListener("click", this.onClick);
  }
  onClick = e => {
    const {
      target
    } = e;
    const unActiveAnother = [...document.querySelectorAll(InnCardTesks.anotherSelector)].filter(el => el.classList.contains("invisible"));
    const activeAddButton = [...document.querySelectorAll(InnCardTesks.addButtonContainerSelector)].filter(el => !el.classList.contains("invisible"));
    if (target == this.another && e.currentTarget !== activeAddButton) {
      unActiveAnother.forEach(el => el.classList.remove("invisible"));
      activeAddButton.forEach(el => el.classList.add("invisible"));
      this.addButtonContainer.classList.remove("invisible");
      this.descriptionCard.value = "";
      this.another.classList.add("invisible");
    }
    if (target == this.addButton) {
      this.addButtonContainer.classList.add("invisible");
      this.another.classList.remove("invisible");
      this.addTask();
    }
    if (target == this.closeDescription) {
      this.addButtonContainer.classList.add("invisible");
      this.another.classList.remove("invisible");
    }
    if (target.classList.contains("close-task")) {
      target.closest(".task").remove();
    }
  };
  innTitle() {
    const titleList = this.title.split(" ");
    for (const title of titleList) {
      this.cardTasks.classList.add(title.toLowerCase());
    }
    this.cardTasks.querySelector("h2").textContent = titleList.join(" ").toUpperCase();
    this.cardTasks = [...document.querySelectorAll(InnCardTesks.cardTasksSelector)].filter(el => el.classList.contains(titleList[0].toLowerCase()))[0];
  }
  addTask() {
    if (this.descriptionCard.value !== "") {
      const task = document.createElement("li");
      task.classList.add("task");
      task.setAttribute("draggable", true);
      task.innerHTML = `
            <p>${this.descriptionCard.value}</p>
            <div class="close-task"></div>
          `;
      this.tasks.insertAdjacentElement("beforeend", task);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/task-card.js
class TaskCard {
  #el;
  #styles;
  constructor(element) {
    this.#el = element;
    this.#styles = window.getComputedStyle(element);
  }
  clear() {
    this.#el.remove();
  }
  set styles(text) {
    this.#el.style.cssText = text;
  }
  get styles() {
    return this.#styles;
  }
  get proection() {
    return (() => {
      const li = document.createElement("li");
      li.classList.add("proection");
      const {
        width,
        height
      } = this.styles;
      li.style.cssText = `
          width: ${width};
          height: ${height};
          margin: 10px 0;
              `;
      return li;
    })();
  }
  get element() {
    return this.#el;
  }
}
;// CONCATENATED MODULE: ./src/js/controller.js

class Controller {
  constructor(container) {
    this.container = container;
    this.draggingElement = null;
    this.draggingProection = null;
    this._activeCloseTask = null;
  }
  setDraggingElement(node) {
    this.draggingElement = new TaskCard(node);
  }
  replaceDragging() {
    this.draggingProection.replaceWith(this.draggingElement.element);
    this.draggingElement.element.style = this.draggingElement.styles;
  }
  clear() {
    this.draggingElement = null;
    this.draggingProection = null;
  }
  changeCursor() {
    const board = document.querySelector(".board-tasks");
    this.draggingElement ? board.style.cursor = "grabbing" : board.style.cursor = "pointer";
  }
  proectionAct(e) {
    const {
      target
    } = e;
    const element = this.draggingElement;
    const proection = this.draggingProection;
    if (target.classList.contains("task") && !target.classList.contains("proection")) {
      const {
        y,
        height
      } = target.getBoundingClientRect();
      const appendPosition = y + height / 2 > e.clientY ? "beforebegin" : "afterend";
      if (!proection) {
        this.draggingProection = element.proection;
      } else {
        proection.remove();
        target.insertAdjacentElement(appendPosition, proection);
      }
    }
    if (target.classList.contains("another") || target.tagName === "h2") {
      const cardTasks = target.closest(".card-tasks");
      if (cardTasks) {
        proection.remove();
        cardTasks.querySelector(".tasks").insertAdjacentElement("afterbegin", proection);
      }
    }
  }
  onMouseDown = e => {
    const {
      target
    } = e;
    if (target.classList.contains("task")) {
      this.shiftX = e.clientX - e.target.getBoundingClientRect().left;
      this.shiftY = e.clientY - e.target.getBoundingClientRect().top;
      this.setDraggingElement(target);
      this.draggingElement.style = `
                     left: ${e.pageX - this.shiftX}px;
                     top: ${e.pageY - this.shiftY}px;
                `;
      this.proectionAct(e);
      this.changeCursor();
    }
  };
  onMouseUp = () => {
    if (this.draggingElement) {
      this.replaceDragging();
      this.clear();
      this.changeCursor();
    }
  };
  onMouseMove = e => {
    if (this.draggingElement) {
      e.preventDefault();
      const element = this.draggingElement;
      const {
        width,
        height
      } = this.draggingElement.styles;
      element.styles = `
                    position: absolute;
                    list-style: none;
                    left: ${e.pageX - this.shiftX}px;
                    top: ${e.pageY - this.shiftY}px;
                    transform: rotate(2deg);
                    pointer-events: none;
                    width: ${width};
                    height: ${height};
                    z-index: 999;
                `;
      this.proectionAct(e);
    }
  };
  onMouseOver = e => {
    const closeTask = e.target.querySelector(".close-task");
    if (e.target.classList.contains("task") && !e.target.classList.contains("card-tasks") && !this.draggingElement) {
      if (this._activeCloseTask) this._activeCloseTask.style.display = "none";
      closeTask.style.display = "block";
      this._activeCloseTask = closeTask;
    }
  };
  onMouseOut = e => {
    if (!e.target.classList.contains("task")) {
      if (this._activeCloseTask) {
        this._activeCloseTask.style.display = "none";
      }
    }
  };
}
;// CONCATENATED MODULE: ./src/js/app.js


document.addEventListener("DOMContentLoaded", () => {
  const cardsTodo = new InnCardTesks("todo");
  cardsTodo.bindToDOM();
  const cardInProgress = new InnCardTesks("in progress");
  cardInProgress.bindToDOM();
  const cardDone = new InnCardTesks("done");
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
    localStorage.setItem(item.querySelector("h2").textContent.toLocaleLowerCase(), JSON.stringify(tasks));
  }
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;