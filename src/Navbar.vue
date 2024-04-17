<template>
  <div id="navbar">
    <img class="logo" alt="Logo" src="./assets/logo.png" @click="switchPage('home')"> 
    <img class="search icon" alt="Search" src="./assets/search.png" @click="switchPage('search')"> 
    <img class="light_dark_mode icon" @click="changeMode" alt="Dark mode" src="./assets/moon.png"> 
  </div>
</template>

<script setup>
  import {switchPage} from './js/switchPage.js';
</script>

<script>

export default {
  mounted() {
    this.initialize_mode();
    document.querySelector(".light_dark_mode").addEventListener('click', () => {
      this.change_mode();
    });
  },
  methods: {
    change_mode() {
      var light_dark_mode = document.querySelector(".light_dark_mode");
      
      if (localStorage.getItem("light_dark_mode") == "light") {
        localStorage.setItem("light_dark_mode", "dark");
        document.documentElement.setAttribute('data-theme', "dark");
        light_dark_mode.src = "./src/assets/sun.png";
      }
      else {
        localStorage.setItem("light_dark_mode", "light");
        document.documentElement.setAttribute('data-theme', "light");
        light_dark_mode.src = "./src/assets/moon.png";
      }
    },
    initialize_mode() {
      var light_dark_mode = document.querySelector(".light_dark_mode");
      var mode = localStorage.getItem("light_dark_mode");

      if (mode === "dark") {
        document.documentElement.setAttribute('data-theme', "dark");
        light_dark_mode.src = "./src/assets/sun.png";
      } 
      else {
        document.documentElement.setAttribute('data-theme', "light");
        light_dark_mode.src = "./src/assets/moon.png";
      }
    }
  }
}
</script>

<style>
  #navbar .logo {
    max-height: 50px;
    padding: 10px;
    cursor: pointer;
  }

  .icon {
    max-height: 40px;
    padding: 20px;
    cursor: pointer;
  }

  .light_dark_mode {
    /* height: 50px;
    width: 50px;
    padding: 10px; */
    
  }

  #navbar {
    background-color: var(--color-navbar);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: fit-content;
    border-right: 2px solid var(--color-bg-darker);
    z-index: 20;
  }

  @media (max-width: 760px) {
    #navbar {
      flex-direction: row;
      width: 100vw;
      height: fit-content;
      bottom: 0;
      top: auto;
      border-top: 2px solid var(--color-bg-darker);
      justify-content: space-around;
    }

    #navbar #logo{
      display: none;
    }
  }
</style>