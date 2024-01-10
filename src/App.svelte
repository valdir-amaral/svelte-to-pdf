<script>
	import Paginator from "./components/Page/Paginator.svelte";
	import Page from "./components/Page/Page.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import jsPDF from 'jspdf';
	import Sidebar from "./components/Sidebar.svelte";
	import { configs } from "./store";
  import Loading from "./components/Loading.svelte";
	export let selector = '#main-content';

	let page, content = document.querySelector(selector), showSidebar;

	console.log(document.querySelector('#main-content'))
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

</script>
<Loading />
<Sidebar show={showSidebar} />

<Toolbar bind:inputStatus={showSidebar} on:print={printAll}/>

<div class="printview">
	<Paginator {content} bind:page={page} />
	<Page bgImage="/img/logo.jpg" orientation={localStorage.orientation ? localStorage.orientation : $configs.orientation} bind:page/>
</div>



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