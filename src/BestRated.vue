<template>
  <div id="bestRated" v-if="booksData">
    <div class="category">
      <img alt="Étoile" src="./assets/star.png">
      <h2>Mieux notés</h2>
    </div>
    <div class="container">
      <div class="book" v-for="book in booksData" :key="book.id">
        <img class="book_decor" alt="" src="./assets/book.png">
        <img class="cover" alt="Couverture" :src="getCover(book.cover_i)">
        <p class="title">{{ maxCharacter(book.title, 22, true) }}</p>

        <div class="info">
          <img class="star" alt="" src="./assets/starBlack.png">
          <p class="ratings"> &#160{{ maxCharacter(book.ratings_average.toString(), 3, false) }}</p>
          <p class="authors" v-if="book.author_name">&#160| {{ book.author_name[0] }}</p>
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
import { getCover } from './js/getCover.js';
import { randomLetter } from './js/randomLetter.js';
import { maxCharacter } from './js/maxCharacter.js';

export default {
  data() {
    return {
      booksData: [],
      authors: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const apiUrl = `https://openlibrary.org/search.json?q=${randomLetter()}&limit=10&sort=rating`;

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
        })
        .catch(error => {
          console.error('Erreur de requête API', error);  
        });
    }
  }
};
</script>

<style>
  .title {
    margin: 0;
    padding-top: 5%;
    white-space: nowrap;
  }

  .authors, .ratings {
    font-size: 0.75em;
    margin: 0;
    white-space: nowrap;
  }

  #bestRated .container {
    display: flex;
    overflow-x: scroll;
    width: 100%;
    margin-bottom: 2%;
  }

  #bestRated .book {
    margin: 0px 5vw 2vw 0;
    width: 20vh;
    display: flex;
    flex-direction: column;
    margin-top: -32vh;
  }

  #bestRated .cover {
    height: 30vh;
    padding-left: 1vw;
    width: 20vh;
  }

  #bestRated .book_decor {
    position: relative;
    width: 24vh;
    top: 32vh;
    z-index: -2;
  }

  #bestRated .category {
    display: flex;
    align-items: center;
    color: #b4b4b4;
  }

  #bestRated .category img {
    max-height: 20px;
    padding-right: 10px;
  }
</style>