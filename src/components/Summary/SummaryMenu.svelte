<script>
  export let level;
  export let el;
  export let label;
  export let children = [];
  export let target;
  export let indent = 0;

let infoVisibility = {}


function showTab(chapter) {
  console.log(chapter)
  if (infoVisibility[chapter] == undefined) {
      infoVisibility[chapter] = true
  } else {
      infoVisibility[chapter] = !infoVisibility[chapter]
  }
}
 
const handleClick = (elementSelector) => {
  let element = document.querySelector(`[data-summary-id="${elementSelector}"]`);
  //document.querySelector('.printview').scrollTo(0, element.offsetTop)
  //element.focus();
  element.scrollIntoView({
    "behavior": "smooth",
    "block": "center"
  });
}
 
</script>


{#if children.length}
  <button class={'_'+level} class:active={infoVisibility[target]} on:click={() =>showTab(target)}>➤</button>
{/if}
<a style={`text-indent: ${indent*20}px;`} href="#" on:click|preventDefault={handleClick(target)}>{label}</a>

{#if children.length && infoVisibility[target]}
  {#each children as child}
      <svelte:self {...child} indent = {indent + 1} />
  {/each}
{/if}

<style>
  a {
    display: block;
    color: white;
    text-decoration: none;
    font-size: 16px;
    transition: all .2s ease-in-out;
    padding: 6px;
    width: 100%;
    margin-bottom: 2px;
  }

  a:hover,
  .menu-opt button:hover {
    background-color: rgb(95,99,104);
    border-radius: 4px;
  }

  .menu-opt {
    position: relative;
    display: flex;
    color: white !important;
    align-items: center;
  }
  button {
    position: absolute;
    z-index: 1000;
    color: white;
    transition: all .3s ease-in-out;
    padding: 6px;
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: none;
  }
  button.active {
    transform: rotate(90deg);
  }
  button._1 {
    transform: translateX(-20px);
  }
  button._1.active {
    transform: translateX(-20px) rotate(90deg);
  }
</style>