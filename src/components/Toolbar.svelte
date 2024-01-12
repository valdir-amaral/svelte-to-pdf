<script>
    import { createEventDispatcher } from "svelte";
    import PageCount from "./Page/PageCount.svelte";
    import { summary, totalPages, configs } from "../store";
	import { get } from "svelte/store";

    export let inputStatus;
/*
    let orientations = [
        {value: 'portrait', label: 'Retrato'},
        {value: 'landscape', label: 'Paisagem'}
    ]
    const changeOrientation = ev => {
        configs.set({orientation: ev.target.value})
        localStorage.orientation = ev.target.value; 
        location.reload()
    }
    */
    let end = '...'
    const dispatch = createEventDispatcher();

	setTimeout(() =>{
        end = get(totalPages)
    }, 1500)

    let printPage = () => {
        dispatch('print');
    }

    const search = ev => {
        location.hash = ev.detail.actualPage
    }

    let active = true
    let timer
    /*window.onscroll = () => {
        active = false
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            active = true
        }, 1000)
    }
    */
</script>


<div class="toolbar" class:active={!active}>
    <div class="container">
        <div>
            <button class="side-toggle" on:click={() => inputStatus = !inputStatus}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="20" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
            </button>
        </div>
        <PageCount on:countupdate={search} actualPage=1 totalPages={end} />

        <!--<div class="form-group">
            <span>Layout</span>
            <select name="" id="" on:change={changeOrientation}>
                {#each orientations as or}
                <option selected={localStorage.orientation == or.value} value={or.value}>{or.label}</option>
                {/each}
            </select>
        </div>-->

        <div>
            <button on:click={printPage} id="print">Imprimir</button>
        </div>
    </div>
</div>

<style>
    .active {
        transform: translateY(-50px);
    }
    .side-toggle {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 15px;
    }
    .side-toggle svg {
        fill: white;
        transition: all .2s;
    }
    .side-toggle:hover svg {
        transform: scale(1.2);
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
        transform: scale(1.1);
    }
    .toolbar {
        color: white;
        display: flex;
        transition: all .3s ease-in-out;
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