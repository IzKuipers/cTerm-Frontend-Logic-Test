<script lang="ts">
  import { onMount } from "svelte";
  import { Display } from "../../ts/display";

  export let x: number;
  export let y: number;
  export let c: string;

  let css = "";

  function update() {
    css = `top: ${$Display.charSize.height * y}px; left: ${
      $Display.charSize.width * x
    }px;`;
    //console.log(x, y, c);
  }

  onMount(update);
</script>

<span style={css}>{c}</span>

<style scoped>
  span {
    position: fixed;
  }
</style>
