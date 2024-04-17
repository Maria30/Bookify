<template>
  <div id="discover" v-if="booksData">
    <div class="category">
      <img alt="Étoile" src="./assets/star.png">
      <h2>A découvrir</h2>
    </div>
    <div class="container">
      <div class="book" v-for="book in booksData" :key="book.id">
        <img class="book_decor" alt="" src="./assets/book.png">
        <img class="cover" alt="Couverture" :src="getCover(book.cover_i)">
        <p class="title">{{ maxCharacter(book.title, 22, true) }}</p>

        <div class="info">
          <img class="star" alt="" src="./assets/starBlack.png">
          <p class="ratings">&#160{{ maxCharacter(book.ratings_average.toString(), 3, false) }}</p>
          <p class="authors" v-if="book.author_name">&#160| {{ maxCharacter(book.author_name[0],15) }}</p>
          <p class="authors" v-else>Auteur inconnu</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps();
</script>

<script>
import { randomLetter } from './js/randomLetter.js';
import { getCover } from './js/getCover.js';
import { maxCharacter } from './js/maxCharacter.js';

export default {
  data() {
    return {
      booksData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const apiUrl = `https://openlibrary.org/search.json?q=${randomLetter()}&limit=10`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Réponse réseau non OK');
          } 
          return response.json();
        })
        .then(data => {
          this.booksData = data.docs;
          this.booksData = this.booksData.filter(book => book.cover_i);
          this.booksData = this.booksData.filter(book => book.ratings_average);
        })
        .catch(error => {
          console.error('Erreur de requête API', error);  
        });
    }
  }
};
</script>

<style>
  #discover .ratings {
    margin: 0;
  }

  #discover .title, #discover .authors {
    margin: 0;
    white-space: nowrap;
  }

  #discover .authors {
    font-size: 0.75em;
  }

  #discover .container {
    display: flex;
    overflow-x: scroll;
    width: 100%;
    margin-bottom: 2%;
  }

  #discover .book {
    margin: 0px 5vw 2vw 0;
    width: 20vh;
    display: flex;
    flex-direction: column;
    margin-top: -32vh;
  }

  #discover .cover {
    height: 30vh;
    padding-left: 1vw;
    width: 20vh;
  }

  #discover .book_decor {
    position: relative;
    width: 24vh;
    top: 32vh;
    z-index: -2;
  }

  #discover .category {
    display: flex;
    align-items: center;
    color: #b4b4b4;
  }

  #discover .category img {
    max-height: 20px;
    padding-right: 10px;
  }

  .info {
    display: flex;
    flex-direction: row;
  }

  .star {
    height: 15px;
    width: 15px;
  }
</style>