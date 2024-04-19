<template>
  <Details :id="bookKey" :authorsArray="authors"></Details>
  <div id="search" v-if="checkPage('search')">
    <div class="searchBar" @keyup.enter="fetchData()">
      <input type="text" placeholder="Rechercher un livre ou un auteur">
      <button type="submit" @click="fetchData()"><img src="./assets/search.png"></button>
    </div>

    <div id="selects">
      <select name="filter" @change="handleFilter()">
        <option value="">Genre</option>
        <option value="Classics">Classique</option>
        <option value="Fiction">Fiction</option>
        <option value="Romance">Romance</option>
        <option value="Fantasy">Fantastique</option>
        <option value="Mystery">Mystère</option>
        <option value="Adventure">Aventure</option>
        <option value="Drama">Drame</option>
        <option value="Children">Enfant</option>
        <option value="History">Historique</option>
      </select>

      <select name="sort" @change="handleSort()">
        <option value="">Trier par</option>
        <option value="az">Ordre alphabétique</option>
        <option value="za">Ordre anti-alphabétique</option>
        <option value="best">Mieux notés</option>
        <option value="worst">Moins bien notés</option>
      </select>
    </div>

    <div class="results" v-if="booksData.length >= 1">
      <div class="results">
        <h1>Résultats</h1>
      </div>
      <div class="container">
        <div class="book" v-for="book in booksData" @click="bookKey = book.key, authors = book.author_name.join(', ')" :key="book.id">
          <img class="book_decor" alt="" src="./assets/book.png">
          <img class="cover" alt="Couverture" :src="getCover(book.cover_i)">
          <div class="title">{{ maxCharacter(book.title, 20, true) }}</div>
          <div class="authors"> {{ maxCharacter(book.author_name.join(', '), 28, true) }}</div>
        </div>
      </div>
      <div class="seeMore" @click="limit+= 20, fetchData()">Voir plus</div>
    </div>
    <div v-else>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
  import Details from './Details.vue';
  import { getCover } from './js/getCover.js';
  import { checkPage } from './js/checkPage.js';
  import { maxCharacter } from './js/maxCharacter.js';
  import { filterData } from './js/filterData.js';
  import { sortData } from './js/sortData.js';
</script>

<script>
export default {
  data() {
    return {
      booksData: [],
      bookId: [],
      bookKey: "",
      authors: [],
      message: "",
      query: "",
      sort: "",
      filter: "",
      limit: 15,
    };
  },
  methods: {
    fetchData() {
      let query = document.querySelector(".searchBar input").value;

      if (this.query != query) {
        this.booksData = [];
        this.message = "Chargement...";
        this.query = query;
      }
      const apiUrl = `https://openlibrary.org/search.json?q=${this.query}&limit=${this.limit}`;

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

          if (this.sort != "") this.booksData = sortData(this.booksData, this.sort);
          if (this.filter != "") this.booksData = filterData(this.booksData, this.filter);         
          if (this.booksData.length < 1) this.message = "Aucun résultat pour votre recherche";
        })
        .catch(error => {
          console.error('Erreur de requête API', error);  
        });
    },
    handleSort() {
      if (document.querySelector(".searchBar input").value != "") {
        this.sort = event.target.value;
        this.fetchData();
      }
    },
    handleFilter() {
      if (document.querySelector(".searchBar input").value != "") {
        this.filter = event.target.value;
        this.fetchData();
      }
    },
  },
  components: {
    Details
  },
};
</script>

<style>
  .searchBar {
    display: flex;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 3vh;
    margin-right: 1vw;
  }

  .searchBar button[type=submit] {
    position: absolute;
    border: none;
    background-color: rgba(0,0,0,0);
    margin-right: 15px;
    cursor: pointer;
  }

  .searchBar button[type=submit] img {
    height: 30px;
  }

  .searchBar input {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    border: none;
    background: var(--color-bg-darker);
    color: var(--color-text);
    padding-left: 20px;
    font-family: "Segoe";
    font-size: 1em;
    transition: 1.5s;
  }

  .searchBar input::placeholder {
    font-weight: bold;
    color: var(--color-text);
    opacity: 0.5;
  }

  .searchBar input:focus, .searchBar button[type=submit]:focus {
    outline: none;
  }

  #search .title, .authors {
    margin: 0;
    white-space: nowrap;
  }

  #search .authors {
    font-size: 0.75em;
  }

  #search .container {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
    width: 100%;
  }

  .book {
    margin : 0px 4vw 2vw 0;
    width: 22vh;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  #search .book_decor{
    position: absolute;
    height: 32vh;
    z-index: -2;
  }

  #search .cover {
    height: 30vh;
    padding-left: 1vw;
    margin-bottom: 1vh;
  }

  .category {
    display: flex;
    align-items: center;
    color: #b4b4b4;
  }

  .category img {
    max-height: 20px;
    padding-right: 10px;
  }

  .seeMore {
    cursor: pointer;
  }

  select {
    width: 25%;
    height: auto;
    padding: 15px 18px;
    border: none;
    border-radius: 4px;
    background: var(--color-bg-darker);
    color: #8b8b8b;
    font-family: "Segoe";
    border-radius: 25px;
    font-size: 0.75rem;
    margin-right: 2%;
    transition: 1.5s;
  }

  @media (max-width: 760px) {
    #selects {
      display: grid;
      grid-template-columns: auto auto;
      width: 100%;
    }

    select {
      width: 98%;
    }
  }
</style>