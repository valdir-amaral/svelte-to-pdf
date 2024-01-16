<script>
	export let page
    export let width = 21;
    export let height = 29.7;
    export let orientation = 'landscape';
    export let bgImage

    let newHeight = orientation == 'portrait' ? height : width
    let newWidth = orientation == 'portrait' ? width : height


</script>

{@html page }}

<style>
    
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