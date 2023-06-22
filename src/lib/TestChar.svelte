<script lang="ts">
  import { onMount } from "svelte";
  import { TempCharSize } from "../ts/display/store";

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
