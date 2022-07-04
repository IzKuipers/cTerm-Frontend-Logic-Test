<script lang="ts">
  import { globalUpdate } from "../ts/display/write";

  import { Display, DisplayData } from "../ts/display/main";
  import Char from "./Grid/Char.svelte";

  let disp: DisplayData;

  $: console.log($Display);

  Display.subscribe((v) => {
    disp = v;
  });

  globalUpdate.subscribe(() => {
    disp = $Display;
  });
</script>

{#if disp}
  {#each disp.buff as yBuff, y}
    {#each yBuff as xChar, x}
      {#if xChar != null}
        <Char {x} {y} c={xChar} />
      {/if}
    {/each}
  {/each}
{/if}
