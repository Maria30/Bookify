<template>
  <Navbar></Navbar>
  <Header></Header>
  <Home></Home>
  <Search></Search>
  <Footer></Footer>
</template>

<script>
  import Navbar from './Navbar.vue';
  import Header from './Header.vue';
  import Search from './Search.vue';
  import Home from './Home.vue';
  import Footer from './Footer.vue';

  export default {
    components: {
      Navbar,
      Header,
      Search,
      Home,
      Footer
    },
  };
</script>

<style scoped>

</style>
