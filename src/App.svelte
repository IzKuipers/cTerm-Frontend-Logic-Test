<script lang="ts">
  import { onMount } from "svelte";

  import "./css/main.css";
  import Cursor from "./lib/Cursor.svelte";
  import Grid from "./lib/Grid.svelte";
  import TestChar from "./lib/TestChar.svelte";
  import { initDisplay } from "./ts/display";
  import { writeStr } from "./ts/display/write";

  onMount(() => {
    initDisplay();

    writeStr("Hello, world!\nTest.");
  });
</script>

<TestChar />
<Grid />
<Cursor />
