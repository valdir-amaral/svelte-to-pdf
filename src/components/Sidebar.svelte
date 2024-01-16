<script>
    import SummaryMenu from "./Summary/SummaryMenu.svelte";
    import { summary } from "../store";
    
    let menu = [];

    $: {
        menu = $summary;
        console.log(['summary', menu]);
    }

    export let show = false;
</script>

<aside class:show={show}>
    <h2>Sumário</h2>
    <div>
        {#each menu as item}
        <SummaryMenu {...item} />
        {/each}
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