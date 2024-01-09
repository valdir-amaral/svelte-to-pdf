<script>
    import { createEventDispatcher } from "svelte";
    import PageCount from "./Page/PageCount.svelte";
    import { totalPages } from "../store";
	import { get } from "svelte/store";

    export let inputStatus;

    let end = '...'
    const dispatch = createEventDispatcher();

	setTimeout(() => end = get(totalPages), 1500)

    let printPage = () => {
        dispatch('print');
    }

    const search = ev => {
        location.hash = ev.detail.actualPage
    }
</script>

<div class="toolbar">
    <div class="container">
        <div>
            <button class="side-toggle" on:click={() => inputStatus = !inputStatus}>
                <i class="fa-solid fa-gear"></i>
            </button>
        </div>
        <PageCount on:countupdate={search} actualPage=1 totalPages={end} />
        <div>
            <button on:click={printPage} id="print">Imprimir</button>
        </div>
    </div>
</div>

<style>
    .side-toggle {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 15px;
    }
    .side-toggle i {
        color: white;
        font-size: 22px;
        transition: all 1s;
    }
    .side-toggle:hover i {
        transform: rotate(360deg);
    }
    .toolbar .container {
        display: flex;
        max-width: 1200px;
        width: 100%;
        margin: auto;
        padding-left: 24px;
        padding-right: 24px;
        align-items: center;
    }
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
        color: white;
        display: flex;
        align-items: center;
        background: none repeat scroll 0% 0% rgba(0, 0, 255, 0.3);
        background-color: rgb(71, 71, 71);
        min-height: 32px;
        width: 100%;
        box-shadow: 1px 0px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 1px rgba(0, 0, 0, 0.15) inset, 0px -1px 0px rgba(255, 255, 255, 0.05) inset, 0px 1px 0px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.1);
        padding: 0;
        position: fixed;
        left: 0px;
        z-index: 1000;
        top: 0px;
    }

    @media print {
        .toolbar {
            display: none;
        }
    }
</style>