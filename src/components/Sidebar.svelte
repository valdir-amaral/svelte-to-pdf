<script>
    export let show = false;
</script>

<aside class:show={show}>
    <input type="text">
</aside>

<style>
aside {
    width: 400px;
    height: 100%;
    position: fixed;
    top: 50px;
    z-index: 1000;
    padding: 20px;
    transition: all .2s ease-in-out;
    transform: translateX(-400px);
    background-color: rgb(71, 71, 71);
}
.show {
    transform: translateX(0);
}
</style>