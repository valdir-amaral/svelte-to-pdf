<script>
	import Paginator from "./components/Page/Paginator.svelte";
	import Page from "./components/Page/Page.svelte";
	import Toolbar from "./components/Toolbar.svelte";
	import PageContent from "./components/Page/PageContent.svelte";
  	import Sidebar from "./components/Sidebar.svelte";
	import { configs } from "./store";
  import Loading from "./components/Loading.svelte";
	export let selector = '#main-content';

	let page, content = document.querySelector(selector), showSidebar;


	console.log(document.querySelector('#main-content'))
	const printAll = () => {
		window.print()
	}

</script>
<Loading />
<Sidebar show={showSidebar} />

<div class="printview">
	<Toolbar bind:inputStatus={showSidebar} on:print={printAll}/>
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