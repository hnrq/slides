<script lang="ts">
  import type { Snippet } from "svelte";

  type CSSPropertyDemoProps = {
    property: string;
    values: string[];
    title?: string;
    defaultValue?: string;
    children?: Snippet<[]>;
  };

  const {
    property,
    values,
    title = property,
    defaultValue = values[0],
  }: CSSPropertyDemoProps = $props();

  let selected = $state(defaultValue);

  const handleClick = (value: string) => {
    selected = value;
  };
</script>

<div class="flex-property-demo">
  <h2 class="flex-property-demo__property">{title}</h2>
  <div class="flex-property-demo__values">
    {#if values.length > 1}
      {#each values as value}
        <button
          class="flex-property-demo__value"
          onclick={() => handleClick(value)}
          class:selected={selected === value}
        >
          {value}
        </button>
      {/each}
    {/if}
  </div>
  <div class="flex-property-demo__children" style={`${property}: ${selected}`}>
    {#each [1, 2, 3] as index}
      <div class="flex-property-demo__box">{index}</div>
    {/each}
  </div>
  <pre>
      <code data-trim data-noescape>
        .container {"{"}
          {property}: {selected};
        {"}"}
      </code>
    </pre>
</div>

<style>
  .flex-property-demo {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--base-spacing);
  }

  .flex-property-demo__children {
    display: flex;
    margin: 20px;
    padding: 20px;
    border: 2px solid #fff;
    min-height: 200px;
  }

  button {
    color: white;
    background-color: black;
    border: 2px solid white;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button.selected,
  button:hover {
    background-color: white;
    color: black;
  }

  .flex-property-demo__box {
    width: 100px;
    height: 100px;
    background: #4a9eff;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .flex-property-demo__values {
    display: flex;
    gap: var(--base-spacing);
    align-self: center;
  }

  pre {
    margin: 0;
  }
</style>
