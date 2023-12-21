export class ElementUtils {
    static hasOverflow(element) {
      if (!element) {
        throw new Error('Element is not defined in hasOverflow check');
      }
      return element.scrollHeight > element.clientHeight;
    }
  
    static isTable(element) {
      if (!element) {
        throw new Error('Element is not defined in isTable check');
      }
      return element.nodeType === 1 && element.tagName.toUpperCase() === 'TABLE';
    }
  
    static withColumns(element) {
      if (!element) {
        throw new Error('Element is not defined in withColumns check');
      }
      return element.classList.contains('columns');
    }
};

export class Paginator {
    constructor() {
      this.currentPage = null;
      this.currentPbody = null;
    }
  
    makePage() {
      console.log('Making a new page');
      const templatePage = document.querySelector('.page');
      if (!templatePage) {
        throw new Error('Template page not found');
      }
      const clone = templatePage.cloneNode(true);
      clone.querySelector('.page-body').innerHTML = '';
      document.querySelector('.printview').appendChild(clone);
  
      this.currentPage = clone;
      this.currentPbody = this.getPageBody(clone);
  
      return ElementUtils.hasOverflow(clone) ? undefined : clone;
    }
  
    getPageBody(page) {
      if (!page) {
        throw new Error('Page is not defined in getPageBody');
      }
      return page.querySelector('.page-body');
    }
  
    paginateText(node, container) {

      const currentPbody = this.currentPbody || this.getPageBody(this.currentPage);
      const textContainer = node.cloneNode(false);
  
      container.appendChild(textContainer);
  
      const wordArray = node.textContent.split(' ');
      let currentText = '';
  
      wordArray.forEach((word, i) => {
        const oldText = currentText;
        currentText += `${word} `;
        textContainer.textContent = currentText;
  
        if (ElementUtils.hasOverflow(currentPbody)) {
          textContainer.textContent = oldText;
          this.makePage();
          this.paginateText(node.cloneNode(false).textContent = wordArray.slice(i).join(' '), container);
        }
      });
    }
  
    paginateElement(element, container) {
      if (ElementUtils.isTable(element)) {
        this.paginateTable(element, container);
      } else if (element.children.length > 0) {
        Array.from(element.children).forEach(child => {
          this.paginateElement(child, container);
        });
      } else {
        this.paginateText(element, container);
      }
    }
  
    paginate(content) {
      if (!this.currentPage) {
        this.currentPage = this.makePage();
      }
      
      const container = ElementUtils.withColumns(content) ? content.cloneNode(true) : this.currentPbody;
  
      this.paginateElement(content, container);
    }
  
    paginateTable(table, container) {
      const currentPbody = this.currentPbody || this.getPageBody(this.currentPage);
      const tableContainer = container.cloneNode(false);
      currentPbody.appendChild(tableContainer);
  
      const rows = Array.from(table.querySelectorAll('tbody > tr'));
      rows.forEach(row => {
        const newRow = row.cloneNode(true);
        tableContainer.appendChild(newRow);
  
        if (ElementUtils.hasOverflow(currentPbody)) {
          newRow.remove();
          this.makePage();
          this.paginateTable(table, container);
        }
      });
    }
}