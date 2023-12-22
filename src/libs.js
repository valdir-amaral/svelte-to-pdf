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
    
    static isImage(element) {
      if (!element) {
        throw new Error('Element is not defined in isImage check');
      }
      return element.nodeType === 1 && element.tagName.toUpperCase() === 'IMG';
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
  
    paginateText(wordArray, node) {

      this.currentPbody.appendChild(node);

      let newNode,
          word,
          oldText;
  
      while (wordArray.length) {
        oldText = node.textContent;
        word = wordArray.shift();
        node.textContent += `${word} `;
  
        if (ElementUtils.hasOverflow(this.currentPbody)) {
          node.textContent = oldText;
          newNode = node.cloneNode(true);
          newNode.textContent = '';
          this.makePage();
          this.paginateText([word, ...wordArray], newNode);
          break;
        }
      }
    }
  
    paginateElement(element, container) {
      if (ElementUtils.isTable(element)) {
        this.paginateTable(element, container);
      } else if (element.children.length > 0) {
        Array.from(element.children).forEach(child => {
          this.paginateElement(child, container);
        });
      } else if (ElementUtils.isImage(element)) {
        let nodeClone = this.currentPbody.cloneNode(true);
        this.currentPbody.appendChild(element)

        console.log(this.currentPbody.clientHeight)
        console.log(this.currentPbody.scrollHeight)
        console.log(ElementUtils.hasOverflow(this.currentPbody))
        if (ElementUtils.hasOverflow(this.currentPbody)) {
          console.log('estourou!!')
        }
      } else {
        let newNode = element.cloneNode();
        newNode.textContent = '';
        this.paginateText(element.textContent.split(' '), newNode);
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
      currentPbody.appendChild(table);
      
      const thead = table.querySelector('thead');
      const tfoot = table.querySelector('tfoot');

      const rows = Array.from(table.querySelectorAll('tbody > tr'));
      rows.forEach(row => {
        const newRow = row.cloneNode(true);
        tableContainer.appendChild(newRow);
  
        if (ElementUtils.hasOverflow(currentPbody)) {
          newRow.remove();
          this.makePage();
          this.paginateTable(table, currentPbody);
        }
      });
    }
}