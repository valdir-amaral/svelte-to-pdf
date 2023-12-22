<script>
	export let page
    export let width = 21;
    export let height = 29.7;
    export let orientation = 'landscape'

    let newHeight = orientation == 'portrait' ? height : width
    let newWidth = orientation == 'portrait' ? width : height
</script>

<div class="page {orientation}" style={`max-width: ${newWidth}cm; max-height: ${newHeight}cm`} bind:this={page}>
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
        padding: 0.2cm;
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
            
            box-shadow: 0;
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