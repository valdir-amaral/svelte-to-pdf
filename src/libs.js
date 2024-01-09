import { totalPages } from "./store";
import { get } from "svelte/store";

export class ElementUtils {
    static hasOverflow(element) {
      if (!element) {
        throw new Error('Element is not defined in hasOverflow check');
      }
      return element.scrollHeight > element.clientHeight;
    }

    static willImgOverflow(container, element){
      if (!container) {
        throw new Error('Container is not defined in willImgOverflow check');
      }
      if (!element) {
        throw new Error('Element is not defined in willImgOverflow check');
      }
      return container.scrollHeight < element.naturalHeight + container.clientHeight;
    }
  
    static willOverflow(paginator, element){
      if (!paginator) {
        throw new Error('Pontainer is not defined in willOverflow check');
      }
      if (!element) {
        throw new Error('Element is not defined in willOverflow check');
      }

      let footer = paginator.currentPfoot.getBoundingClientRect(),
          bodyLastChild = paginator.currentPbody.lastChild?.getBoundingClientRect();

      if (!bodyLastChild) return false;

      return Math.ceil(bodyLastChild.bottom) + Math.ceil(element.clientHeight) + 20 > Math.ceil(footer.top);

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
      return element.nodeType === 1 && ['IMG', 'SVG', 'CANVAS'].includes(element.tagName.toUpperCase());
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
      this.mode = '';
    }
  
    makePage() {
      console.log('Making a new page');
      totalPages.set(get(totalPages) + 1)
      const templatePage = document.querySelector('.page');
      if (!templatePage) {
        throw new Error('Template page not found');
      }
      const clone = templatePage.cloneNode(true);
      clone.id = document.querySelectorAll('.page').length
      clone.querySelector('.page-body').innerHTML = '';
      document.querySelector('.printview').appendChild(clone);
  
      this.currentPage = clone;
      this.currentPhead = this.getPageElement('header');
      this.currentPbody = this.getPageElement('body');
      this.currentPfoot = this.getPageElement('footer');
      
      return ElementUtils.hasOverflow(clone) ? undefined : clone;
    }
  
    getPageElement(type) {
      if (!type) {
        throw new Error('Type is not defined in getPageElement');
      }
      return this.currentPage.querySelector(`.page-${type}`);
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
        this.paginatable = [
          ...Array.from(element.children).map(child => [child, container]),
          ...this.paginatable
        ];
      } else if (ElementUtils.isImage(element)) {
        this.mode = 'pause';
        let self = this;
        let img = new Image();
        
        // As imagens são carregadas de maneira assincrona, e nós precisamos 
        // do tamanho da imagem para calcular se a pagina irá quebrar ou não
        // por isso pausamos a renderização até que a imagem seja carregada
        // e então continuamos com a paginação, isso também garante que a imagem
        // será incluida no layout no momento certo. Neste caso, sacrificamos
        // performance em favor de qualidade.

        img.onload = function() {
          if (ElementUtils.willImgOverflow(self.currentPbody, img)){
            self.makePage();
          }
          self.currentPbody.appendChild(element);
          if (self.paginatable.length) {
            self.mode = 'paging';
            self.doPagination();
          }
        }
        img.src = element.src;
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

      let container = content.cloneNode(true);
      container.innerHTML = '';
      
      this.paginatable = [[content, container]];

      if (this.mode === '') {
        this.mode = 'paging';
        this.doPagination();
      }

    }

    doPagination(){
      while (this.paginatable.length && this.mode == 'paging'){
        this.paginateElement(...this.paginatable.shift());
      }
    }
  
    paginateTable(table, container) {
      let tableContainer, thead, tbody, row, self = this;

      const tfoot = table.querySelector('tfoot')?.cloneNode(true);

      const rows = Array.from(table.querySelectorAll('tbody > tr'));

      function cloneTable(){
        tableContainer = table.cloneNode(true);
        tableContainer.style.maxWidth = `${self.currentPbody.getBoundingClientRect().width - 50}px`;
        thead = table.querySelector('thead')?.cloneNode(true);
        tbody = table.querySelector('tbody').cloneNode(true);

        tableContainer.innerHTML = '';
        tbody.innerHTML = '';
        thead && tableContainer.appendChild(thead);
        tableContainer.appendChild(tbody);
        self.currentPbody.appendChild(tableContainer);
      }

      while (rows.length){
        row = rows.shift();

        if (typeof tableContainer === 'undefined') cloneTable();

        if (ElementUtils.willOverflow(this, row)) {
          this.makePage();
          cloneTable();
        }

        tbody.appendChild(row);
      }

      tfoot && table.appendChild(tfoot);
    }
}