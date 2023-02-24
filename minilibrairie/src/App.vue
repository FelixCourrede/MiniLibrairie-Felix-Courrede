<script setup>
import livreItem from './components/livreItem.vue';
import listeLivre from './components/listeLivre.vue';
import titre from './components/titre.vue';
</script>

<template class="app">
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png">
    <title>Minilibrairie</title>
  </head>
  <header>
  </header>

  <main>
    <titre /> 
    <listeLivre />
  </main>
</template>

<style scoped>
</style>
