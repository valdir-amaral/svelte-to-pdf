<script>
	export let page
    export let size
    export let orientation
</script>

<div class="page" bind:this={page}>
    <div class="page-header">
        <h1>Header da página</h1>
    </div>
	<div class="page-body"></div>
	<div class="page-footer">
        <footer>
            &copy; TMX | 2023 
        </footer>
    </div>
</div>

<style>
  	.page {
        width: 21cm;
        min-height: 29.7cm;
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
        padding: 0.2cm;
        border-top: 1px #ccc dotted;
        border-right: 1px #ccc dotted;
        border-left: 1px #ccc dotted;
        height: 20mm;
        text-align: center;
    }
    .page-body {
        padding: 0.2cm;
        border-right: 1px #ccc dotted;
        border-left: 1px #ccc dotted;
        height: 241.8mm;
        text-align:justify;
        text-justify:inter-word;
    }
    .page-footer {
        bottom: 0;
        padding: 0.2cm;
        border-right: 1px #ccc dotted;
        border-bottom: 1px #ccc dotted;
        border-left: 1px #ccc dotted;
        height: 10mm;
        text-align: right;
    }
    @media print {
        @page {
            size: A4;

        }
        .page {
            margin: 0;
            border: none;
            border-radius: 0;
            width: 210mm;
            min-height: 295mm;
            box-shadow: 0;
            background: initial;
            page-break-after: always;
        }
        .page-header, .page-footer, .page-body {
            border: none;
        }
        .page:last-child {
            margin-bottom: 0;
        }
    }
</style>