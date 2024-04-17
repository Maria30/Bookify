<template>
  <div id="header">
    <img id="logo" alt="Logo" src="./assets/logo.png"> 
    <img id="bookify" alt="Bookify" src="./assets/bookify.png"> 
  </div>
</template>

<script>
</script>

<style>
  #header {
    padding: 3vh 0px;
    height: 5vh;
    display: flex;
  }

  #header #logo {
    display: none;
    padding-right: 10px;
  }

  #bookify {
    height: 100%;
  }

  @media (max-width: 760px) {
    #header #logo {
      display: block;
    }
  }

</style>