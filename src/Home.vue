<template>
  <div v-if="checkPage('home')">
    <Discover></Discover>
    <BestRated></BestRated>
  </div>
</template>

<script setup>
  import { checkPage } from './js/checkPage';
  import BestRated from './BestRated.vue';
  import Discover from './Discover.vue';
</script>

<script>
  export default {
    components: {
      BestRated,
      Discover
    },
  };
</script>

<style>
  @media (max-width: 480px) {

  }
</style>