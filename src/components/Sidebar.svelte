<script>
    import { configs } from "../store";
    import SummaryMenu from "./Summary/SummaryMenu.svelte";

    export let show = false;
    let orientations = [
        {value: 'portrait', label: 'Retrato'},
        {value: 'landscape', label: 'Paisagem'}
    ]
    const changeOrientation = ev => {
        configs.set({orientation: ev.target.value})
        localStorage.orientation = ev.target.value; 
        location.reload()
    }
</script>

<aside class:show={show}>
    <h2>Sumário</h2>
    <div>
        <!--<div class="form-group">
            <span>Layout</span>
            <select name="" id="" on:change={changeOrientation}>
                {#each orientations as or}
                <option selected={localStorage.orientation == or.value} value={or.value}>{or.label}</option>
                {/each}
            </select>
        </div>-->

        <SummaryMenu />
    </div>
</aside>

<style>
aside {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 50px;
    z-index: 1000;
    padding: 20px 30px;
    transition: transform .4s ease-in-out;
    transform: translateX(-400px);
    background-color: rgb(71, 71, 71);
    color: #f1f1f1;
}
.show {
    transform: translateX(0);
}
p {
    margin: 0;
}
.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
}

@media print {
    aside {
        display: none;
    }
}
</style>