<script lang="ts">
  import { onMount } from "svelte";

  import "./css/main.css";
  import Cursor from "./lib/Cursor.svelte";
  import Grid from "./lib/Grid.svelte";
  import TestChar from "./lib/TestChar.svelte";
  import { initDisplay } from "./ts/display";
  import { scrollUp, writeStr } from "./ts/display/write";

  onMount(() => {
    initDisplay();

    let max = 250;

    (async() => {for (let i=0;i<280;i++){
      setTimeout(() => {
        writeStr(`@`);

        //scrollUp(1);
      }, max);

      max += 50;
    }})();
    
  });
</script>

<TestChar />
<Grid />
<Cursor />
