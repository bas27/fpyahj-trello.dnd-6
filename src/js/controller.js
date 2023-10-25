import TaskCard from "./task-card";


export default class Controller {
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
        this.draggingElement
          ? (board.style.cursor = "grabbing")
          : (board.style.cursor = "pointer");
      }

      proectionAct(e) {
        const target = e.target;
        const element = this.draggingElement;
        const proection = this.draggingProection;
        if (
          target.classList.contains("task") &&
          !target.classList.contains("proection")
        ) {
          const { y, height } = target.getBoundingClientRect();
          const appendPosition =
            y + height / 2 > e.clientY ? "beforebegin" : "afterend";
    
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
            cardTasks
              .querySelector(".tasks")
              .insertAdjacentElement("afterbegin", proection);
          }
        }
      }

      onMouseDown = (e) => {
        const target = e.target;
    
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

      onMouseMove = (e) => {
        if (this.draggingElement) {
          e.preventDefault();
          const element = this.draggingElement;
          const { width, height } = this.draggingElement.styles;
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

      
  onMouseOver = (e) => {
    const closeTask = e.target.querySelector(".close-task");
    if (
      e.target.classList.contains("task") &&
      !e.target.classList.contains("card-tasks") &&
      !this.draggingElement
    ) {
      if (this._activeCloseTask) this._activeCloseTask.style.display = "none";
      closeTask.style.display = "block";
      this._activeCloseTask = closeTask;
    }
  };

  onMouseOut = (e) => {
    if (!e.target.classList.contains("task")) {
      if (this._activeCloseTask) {
        this._activeCloseTask.style.display = "none";
      }
    }
  };
}