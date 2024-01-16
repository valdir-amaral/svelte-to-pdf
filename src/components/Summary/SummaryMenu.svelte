<script>
  export let level;
  export let el;
  export let label;
  export let children = [];
  export let target;
  export let indent = 0;

let infoVisibility = {}
function showTab(chapter) {
  if (infoVisibility[chapter.label.replaceAll(' ', '_')] == undefined) {
      infoVisibility[chapter.label.replaceAll(' ', '_')] = true
  } else {
      infoVisibility[chapter.label.replaceAll(' ', '_')] = !infoVisibility[chapter.label.replaceAll(' ', '_')]
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
  <button class:active={infoVisibility[label]} on:click={() =>showTab(level)}>➤</button>
{/if}
<a style="text-indent: 20px;" href="#" on:click|preventDefault={handleClick(target)}>{label}</a>

{#if children.length}
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
  .menu-opt button {
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
  .menu-opt button.active {
    transform: rotate(90deg);
  }
</style>