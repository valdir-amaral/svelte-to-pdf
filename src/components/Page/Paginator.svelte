<script>
    import { Paginator } from '../../libs';
    import { summary } from '../../store';

    export let content, header, footer, watermark;

    let paginator, preview;

    preview = document.createElement('div');
    preview.classList.add('printview');

    document.body.appendChild(preview);


    $: {
        if (content) {
            paginator = new Paginator(preview, header, footer, watermark);
            paginator.paginate(content);
            $summary = paginator.summary;
        }
    }
   
</script>