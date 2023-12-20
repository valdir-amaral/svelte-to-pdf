<script>
  import { onMount } from "svelte";
  	import Page from "./components/Page.svelte";
	import PdfContent from "./components/PdfContent.svelte";
	import Toolbar from "./components/Toolbar.svelte";

	var g = {};
	let page;
	let pags = []
	let conteudo;
	onMount(() => {
		paginate(conteudo, page);

		let pages = pags.length,
			date = new Date(),
			tDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
		
		pags.forEach((i, p) => {
			console.log(p)
			let foot = p.querySelector('.page-footer');
			foot.innerHTML =  '<span style="float: left;">' + tDate + '</span><span style="float: right">Página ' + (1 + i) + ' de ' + pages + '</span>';

		});
	})
	
	let printPage = () => {
		window.print();
	}

	function hasOverflow(element) {
		return element.scrollHeight > element.clientHeight;
	}

	function isTable(element) {
		return element.nodeType === 1 && (element.tagName || '').toUpperCase() === 'TABLE';
	}

	function withColumns(element) {
		return element && element.classList && element.classList.contains('columns');
	}

	function makePage() {
		console.log('Making a new page');
		let clone = page.cloneNode(true);
		clone.querySelector('.page-body').innerHTML = ''
		pags.push(clone);
		pags = pags;
		g.currentPage = clone;
		g.currentPbody = getPageBody(clone);
		return hasOverflow(clone) ? undefined : clone;
	}

	function getPageBody(page) {
		let currentPage = page || makePage();
		return currentPage.querySelector('.page-body')
	}

	function paginate(content, page, cont) {
		if (!Object.hasOwnProperty(g, 'currentPage')) {
			g.currentPage = page || makePage();
		}
		if (!Object.hasOwnProperty(g, 'currentPbody')) {
			g.currentPbody = getPageBody(page || g.currentPage || makePage());
		}

		let currentContent = content,
			container;

		if (withColumns(currentContent)) {
			container = g.currentPbody.appendChild(currentContent.cloneNode(false));
		} else if (withColumns(currentContent.parentNode) && cont) {
			container = cont;
		} else {
			container = null;
		}


		if (isTable(currentContent)) {
			console.log('conteúdo é uma tabela');
			paginateTable(currentContent, g.currentPage);
		} else if (currentContent.children.length > 0) {
			var i = 0,
				children = currentContent.children,
				l = children.length,
				child;
			
			for (i=0; i < l; i++) {
				child = children[i];
				paginate(child, g.currentPage, container);
			}

		} else {
			paginateText(currentContent, g.currentPage, container);
		}
	}	

	function paginateText(node, page, cont) {
		let currentPbody = getPageBody(page || g.currentPage || makePage()),
			container = node.cloneNode(false),
			contentText = node.innerText,
			wordArray = contentText.split(" "),
			currentText = "",
			i = 0,
			l = wordArray.length,
			oldText,
			word;


		if (cont) {
			cont.appendChild(container);
		} else {
			currentPbody.appendChild(container);
		}

		for (i=0; i < l; i++) {
			word = wordArray[i];
			oldText = currentText;
			currentText += word + " ";
			container.innerText = currentText;
			if (hasOverflow(currentPbody)) {
				console.log('TEXT PAGINATE')
				
				container.innerText = oldText;
				let nodeClone = node.cloneNode(false);
				nodeClone.innerText = wordArray.slice(i - 1).join(' ');
				console.log(nodeClone)
				paginate(nodeClone, makePage());
				break;
			}
		}
	
		
	}

	function paginateTable(table, page, cont) {
		let currentPbody = getPageBody(page || g.currentPage || makePage()),
			container = cont || table.cloneNode(true),
			currentTbody = container.querySelector('tbody'),
			currentRows = container.querySelector('tbody > tr'),
			i = 0,
			l = currentRows.length,
			row;

		while (currentTbody.firstChild) {
			currentTbody.removeChild(currentTbody.firstChild);
		};

		currentPbody.appendChild(container);
		for (i=0; i < l; i++) {
			row = document.querySelector(currentRows[i]);
			currentTbody.appendChild(row);
			if (hasOverflow(currentPbody)) {
				row.parentElement.removeChild(row);
				container = container.cloneNode(true);
				currentTbody = container.querySelector('tbody');
				while (currentTbody.firstChild) {
					currentTbody.removeChild(currentTbody.firstChild);
				};
				currentTbody.appendChild(currentRows.slice(i));
				paginate(container, makePage());
				break;
			}
		}
		
	}


</script>

<main class="printview">
	<Toolbar on:print={printPage} />
	<Page bind:page={page}>
		<h1 slot="page-header">Paginação por altura da DIV</h1>
		
		<div slot="page-body">
			
		</div>
		
	</Page>	
	{#each pags as pag}
	<Page>
		{@html pag.innerHTML}
	</Page>
	{/each}
</main>

<PdfContent bind:conteudo={conteudo} />



<style>

	.row {
		display: flex;
		gap: 15px;
	}
	.row .col-half {
		width: 50%;
	}
	@media print {
		@page {
			size: A4;
			margin: 0;
		}
		.printview {
			margin: initial;
			width: initial;
		}
		.printview:first-child {
			margin-top: 0;    
		}
	}
</style>