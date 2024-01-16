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


    .watermark {
        position: absolute;
        opacity: .2;
        max-width: 200px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
  	.page {
        position: relative;
        padding: 1.5cm 1.0cm 1.0cm 1.0cm;
        margin-top: 5%;
        margin-left: auto;
        margin-right: auto;
        border: 1px #D3D3D3 solid;
        background-color: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    }
    .page:last-child {
        margin-bottom: 5%;
    }
    .page-header {
        /* padding: 0.2cm; */
        border-top: 1px #ccc dotted;
        border-right: 1px #ccc dotted;
        border-left: 1px #ccc dotted;
        height: 20mm;
        text-align: center;
    }
    .page-body {
        overflow: hidden;
        /*padding: 0.2cm;*/
        border-right: 1px #ccc dotted;
        border-left: 1px #ccc dotted;
        height: 24.18cm;
        text-align:justify;
        text-justify:inter-word;
    }
    .page.portrait .page-body {
        height: 24.18cm;
    }
    .page.landscape .page-body {
        height: 15.4cm;
    }
    .page-footer {
        bottom: 0;
        /*padding: 0.2cm;*/
        border-right: 1px #ccc dotted;
        border-bottom: 1px #ccc dotted;
        border-left: 1px #ccc dotted;
        height: 10mm;
        text-align: right;
    }

    @media print {
        @page {
            size: A4 landscape;
        }
        .page {
            margin: 0;
            border: none;
            border-radius: 0;
            box-shadow: none;
            background: initial;
            page-break-after: always;
        }
        .page.portrait {
            width: 210mm;
            height: 295mm;
        }
        .page.landscape {
            height: 210mm;
            width: 295mm;
        }
        .page.portrait .page-body {
            height: 24.18cm;
        }
        .page.landscape .page-body {
            height: 15.4cm;
        }
        .page-header, .page-footer, .page-body {
            border: none;
        }
        .page:last-child {
            margin-bottom: 0;
        }
    }
</style>