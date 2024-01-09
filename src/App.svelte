<script>
	import Paginator from "./components/Page/Paginator.svelte";
	import Page from "./components/Page/Page.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import PageContent from "./components/Page/PageContent.svelte";
  	import Sidebar from "./components/Sidebar.svelte";
	import { configs } from "./store";
	let page, content, showSidebar;

	const printAll = () => {
		window.print()
	}

	$: console.log($configs)
</script>

<Sidebar show={showSidebar} />

<div class="printview">

	<Toolbar bind:inputStatus={showSidebar} on:print={printAll}/>
	<Paginator bind:page={page} bind:content />
	<Page bgImage="/img/logo.jpg" orientation={localStorage.orientation ? localStorage.orientation : $configs.orientation} bind:page/>

	
	
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