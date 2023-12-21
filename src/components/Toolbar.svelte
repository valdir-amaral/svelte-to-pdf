<script>
  import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let printPage = () => {
        dispatch('print');
    }
</script>

<div class="toolbar">
    <button on:click={printPage} id="print">Print</button>
</div>

<style>
    #print {
        background-color: #216778;
        border: none;
        text-transform: uppercase;
        color: white;
        cursor: pointer;
        font-size: 14px;
        padding: 12px 16px;
        font-family: Helvetica, Arial, sans-serif;
        border-radius: .5rem;
        margin: 5px;
        transition: all .2s ease-in-out;
    }
    #print:hover {
        background-color: #1d5361;
        color: #b8b8b8;
        transform: translateY(-3px);
    }
    .toolbar {
        background: none repeat scroll 0% 0% rgba(0, 0, 255, 0.3);
        background-color: rgb(71, 71, 71);
        min-height: 32px;
        width: 100%;
        box-shadow: 1px 0px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 1px rgba(0, 0, 0, 0.15) inset, 0px -1px 0px rgba(255, 255, 255, 0.05) inset, 0px 1px 0px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.1);
        padding: 0;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    @media print {
        .toolbar {
            display: none;
        }
    }
</style>