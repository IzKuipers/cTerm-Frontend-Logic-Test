<script lang="ts">
  import { TempCharSize } from "../ts/display";
  import { onMount } from "svelte";

  let tester: HTMLSpanElement;
  
  onMount(() => {
    $TempCharSize.width = tester.offsetWidth;
    $TempCharSize.height = tester.offsetHeight;
    $TempCharSize.initialized = true;
  });
</script>

<span bind:this={tester}>&nbsp;</span>

<style scoped>
  span {
    position: fixed;
    top: -1000px;
    left: -1000px;
  }
</style>
