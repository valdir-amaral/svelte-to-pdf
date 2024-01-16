<script>
	import Paginator from "./components/Page/Paginator.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import Sidebar from "./components/Sidebar.svelte";
	import { configs } from "./store";
  	import Loading from "./components/Loading.svelte";

	export let contentSelector = '#main-content';
	export let headerSelector = '';
	export let footerSelector = '';
	export let watermarkSelector = '';

	let content = document.querySelector(contentSelector),
		pageHeader = document.querySelector(headerSelector),
		pageFooter = document.querySelector(footerSelector),
		watermark = document.querySelector(`${watermarkSelector} img`),
		showSidebar;

	content.remove();
	pageHeader.remove();
	pageFooter.remove();
	watermark.parentNode.remove();

	if (watermark) {
		watermark = watermark.getAttribute('src');
	}

	const printAll = () => {
		window.print();

		/* Script pra salvar o PDF.
		let htmlContent = document.querySelector('.printview').innerHTML
		let pdf = new jsPDF();
		pdf.html(htmlContent, {
			callback: function (pdf) {
				pdf.save('meu-arquivo-pdf.pdf');
			},
			x: 10,
			y: 10,
		});
		*/
	}


	console.log(content);
</script>
<Loading />
<Sidebar show={showSidebar} />

<Toolbar bind:inputStatus={showSidebar} on:print={printAll}/>,
<Paginator {content} bind:header={pageHeader} bind:footer={pageFooter} watermark={watermark} />

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