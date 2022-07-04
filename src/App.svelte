<script lang="ts">
  import { onMount } from "svelte";
import { Login } from "./bin/login";

  import "./css/main.css";
  import Cursor from "./lib/Cursor.svelte";
  import Grid from "./lib/Grid.svelte";
  import TestChar from "./lib/TestChar.svelte";
  import { initDisplay } from "./ts/display/main";
  import { processKey } from "./ts/io/keyboard";

  onMount(async () => {
    initDisplay();

    Login();
  });
</script>

<svelte:body on:keydown={processKey} />

<div class="app">
  <TestChar />
  <Grid />
  <Cursor />
</div>
