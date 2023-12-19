<script>
  	import Page from "./components/Page.svelte";
	import PdfContent from "./components/PdfContent.svelte";
	import Toolbar from "./components/Toolbar.svelte";

	let printPage = () => {
		window.print();
	}
	
</script>

<main class="printview">
	<Toolbar on:print={printPage} />

	<Page>
		<h1 slot="page-header">Paginação por altura da DIV</h1>
		
		<div slot="page-body">
			<div class="row">
				<p></p>
			</div>
		</div>

	</Page>	
	

</main>



<style>
	.printview {
		margin-left: auto;
		margin-right: auto;
		width: 70%;    
	}
	.printview:first-child {
		margin-top: 10%;    
	}

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