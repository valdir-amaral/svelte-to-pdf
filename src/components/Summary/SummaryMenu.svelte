<script>
import { summary } from "../../store";

let infoVisibility = {}
function showTab(chapter) {
  if (infoVisibility[chapter.label.replaceAll(' ', '_')] == undefined) {
      infoVisibility[chapter.label.replaceAll(' ', '_')] = true
  } else {
      infoVisibility[chapter.label.replaceAll(' ', '_')] = !infoVisibility[chapter.label.replaceAll(' ', '_')]
  }
}

  let items = [];
  
  setTimeout(() => {
    items = $summary;
    console.log(items)
  }, 1500)

  const handleClick = (el) => {
    window.scrollTo(0, el.el.offsetTop)
  }
 
</script>

{#each items as h1} 
  <div class="menu-opt">
    {#if h1.children.length}
      <button class:active={infoVisibility[h1.label.replaceAll(' ', '_')]} on:click={() =>showTab(h1)}>➤</button>
    {/if}
    <a style="text-indent: 20px;" href={'#'+h1.el.id}>{h1.label}</a>
  </div>
  
  {#if h1.children.length && infoVisibility[h1.label.replaceAll(' ', '_')]}
    {#each h1.children as h2}
      <div class="menu-opt">
        {#if h2.children.length}
          <button style="margin-right: -16px;" class:active={infoVisibility[h2.label.replaceAll(' ', '_')]} on:click={() => showTab(h2)}>➤</button>
        {/if}
        <a style="font-size: 14px; text-indent: 5px;" href={'#'+h2.el.id}>&nbsp;&nbsp; {h2.label}</a>
      </div>
      {#if h2.children.length && infoVisibility[h2.label.replaceAll(' ', '_')]}
        {#each h2.children as h3}
          <div class="menu-opt">
            {#if h3.children.length}
              <button on:click={() => showTab(h3)}>➤</button>
            {/if}
            <a style="font-size: 12px;" href={'#'+h3.el.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {h3.label}</a>
          </div>
        {/each}
      {/if}
    {/each}
  {/if}

{/each}

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