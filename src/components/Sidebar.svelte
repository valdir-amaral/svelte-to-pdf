<script>
    import { configs } from "../store";

    export let show = true;
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
    <h2>Configurações</h2>
    <div>
        <div class="form-group">
            <span>Layout</span>
            <select name="" id="" on:change={changeOrientation}>
                {#each orientations as or}
                <option selected={localStorage.orientation == or.value} value={or.value}>{or.label}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            
        </div>
    </div>
</aside>

<style>
aside {
    width: 400px;
    height: 100%;
    position: fixed;
    top: 50px;
    z-index: 1000;
    padding: 20px 60px;
    transition: transform .8s cubic-bezier(0, 1.78, 0.95, 1);
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