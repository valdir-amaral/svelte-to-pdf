<script>
  import { createEventDispatcher } from "svelte";

    export let actualPage = 1;
    export let totalPages = 4;

    const dispatch = createEventDispatcher();

    $: {
        if (actualPage > totalPages) {
            actualPage = totalPages;
        }
        dispatch('countupdate', {
            actualPage,
            totalPages
        })
    }
</script>   

<div class="page-count">
    <input placeholder="1" min="1" max={totalPages} class="actual-page-input" type="number" name="" id="" bind:value={actualPage}> 
    / {totalPages}
</div>


<style>
    .actual-page-input {
        background-color: rgb(64, 64, 64);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        max-width: fit-content;
    }
    .page-count {
        margin: auto;
        display: flex;
        gap: 8px;
        align-items: center;
    }
</style>