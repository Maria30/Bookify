<template>
  <div id="details" v-if="id">
    <div class="container" v-if="book">
      <img class="cross icon" alt="" src="./assets/cross.png" @click="id=undefined">
      <div class="preview">
        <img class="book_decor" alt="" src="./assets/book.png">
        <img class="cover" alt="Couverture" :src="getCover(cover)"> 
      </div>
      <div class="text">
        <p class="title">{{ book.title }}</p>
        <p class="authors">{{ authorsArray }}</p>
        <p class="description" v-if="book.description && typeof book.description == 'string'">{{ book.description }}</p>
        <p class="description" v-else-if="book.description && book.description.value">{{ book.description.value }}</p>
        <p class="description" v-else>Aucune description disponible</p> 
      </div>
    </div>
  </div>
</template>

<script setup>
  import { getCover } from './js/getCover.js';
</script>

<script>
  export default {
    data() {
      return {
        book: {},
        cover: ""
      };
    },
    props: {
      id: undefined,
      authorsArray: ""
    },
    watch: {
      id: {
        immediate: false,
        handler(newId, oldId) {
          if (this.id && newId !== oldId) {
            this.fetchData();
          }
          else document.querySelector("#search").style.display = "block";
        }
      }
    },
    mounted() {
      if (this.id) this.fetchData();
    },
    methods: {
      fetchData() {
        const apiUrl = `https://openlibrary.org${this.id}.json`;

        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Réponse réseau non OK');
            }
            return response.json();
          })
          .then(data => {
            this.book = data;
            this.cover = this.book.covers[0];
            document.querySelector("#search").style.display = "none";
          })
          .catch(error => {
            console.error('Erreur de requête API', error);  
          });
      },
    }
  };
</script>

<style>
  #details {
    display: flex;
    position: absolute;
    background-color: var(--color-bg);
    z-index: 10;
    height: 89vh;
    width: 90vw;
  }

  #details .cover {
    height: 37vh;
    width: 26vh;
    padding-left: 1vw;
  }

  #details .book_decor {
    height: 40vh;
    position: absolute;
    z-index: -2;
  }

  #details .preview{
    padding-right: 4vw;
    min-width: 30vh;
    padding: 5%;
  }
  
  .description {
    line-height: 1.5em;
  }

  .content {
    margin: 0vw 3vw;
    text-align: justify;
  }

  #details .title {
    font-size: 2em;
  }

  #details .container {
    display: flex;
    /* margin: 2em; */
  }

  .text {
    display: flex;
    flex-direction: column;
  }

  .cross {
    position: absolute;
    right: -20px;
    top: -80px;
  }
</style>