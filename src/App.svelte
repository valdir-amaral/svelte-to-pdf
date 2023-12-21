<script>
	import Paginator from "./components/Paginator.svelte";
	import Page from "./components/Page.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import PageContent from "./components/PageContent.svelte";

	let page, content;

	const printAll = () => {
		window.print()
	}
</script>

<div class="printview">
	
	<Toolbar on:print={printAll}/>
	
	<Paginator bind:page={page} bind:content>
	
	</Paginator>
	
	
	<Page bind:page/>
</div>

<PageContent bind:content />

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