<template>
  <div id="app">
    <router-view/>
    <div class="panel">
      <section class="tip">
        <span>Tip: Use double click in order to add an entity</span>
      </section>
      <section class="controls">
        <button id="export">Export</button>
        <button id="import">Import</button>
        <button id="generate">Generate</button>
      </section>
    </div>
    <div id="temp"></div>
    <input type="file" accept="application/json" id="importerInput" style="display:none">
    <br>
  </div>
</template>
