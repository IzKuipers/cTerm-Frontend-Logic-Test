<script lang="ts">
  import type { DisplayData } from "../ts/display/interface";
  import { Display } from "../ts/display/store";
  import { globalUpdate } from "../ts/display/write";

  import { onMount } from "svelte";

  let css = "";

  onMount(() => update($Display));

  $: update($Display);

  globalUpdate.subscribe(() => update($Display));

  function update(disp: DisplayData) {
    if (disp) {
      const { x, y } = { x: disp.cursor.x, y: disp.cursor.y };

      css = `
        top: ${disp.charSize.height * y}px;
        left: ${disp.charSize.width * x}px;
        width: ${disp.charSize.width}px;
        height: ${disp.charSize.height}px;
      `;
    }
  }
</script>

<span class="cursor" style={css} />

<style scoped>
  span.cursor {
    background-color: #aaa;
    position: fixed;
  }
</style>
