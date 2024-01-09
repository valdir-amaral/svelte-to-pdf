<script>
  let active = true, none = false;
setTimeout(() => {
  active = false;
  setTimeout(() => {
    // Pra adicionar a transição sem impactar no layout
    none = true
  }, 200)
}, 1500)
</script>

<div class="backdrop" class:active class:none>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>

<style>
  :global(body):has(.backdrop.active) {
    overflow: hidden;
  }
.backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0,0,0, .7);
  z-index: 1001;
  transition: all .2s ease-in-out;
  opacity: 0;
}
.backdrop.active {
  opacity: 1;
}
.none {
  display: none;
}
.loading span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: rgb(68, 187, 84);
    margin: 4px;    
    animation: dots .6s cubic-bezier(0.6,0.1,1,0.4) infinite alternate;
}
.loading span:nth-child(1) {
    animation-delay: .1s;
}

.loading span:nth-child(2) {
    animation-delay: .2s;
}

.loading span:nth-child(3) {
    animation-delay: .3s;
}

.loading span:nth-child(4) {
    animation-delay: .4s;
}

@keyframes dots {
    from {
        transform: translate3d(0, 0, 0);

    }
    to {
        transform: translate3d(0, 30px, 0);
    }
}
</style>