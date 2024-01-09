<script>
    import { Paginator } from '../../libs';

    export let content, page;

    let paginator;

    $: {
        if (page && content) {
            paginator = new Paginator(page);
            paginator.paginate(content);
        }
    }
   
</script>
