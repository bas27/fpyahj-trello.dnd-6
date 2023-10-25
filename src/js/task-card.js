export default class TaskCard {
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
        const { width, height } = this.styles;
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