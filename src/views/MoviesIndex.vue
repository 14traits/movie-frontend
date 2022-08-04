<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to the musings of a horrible mind!!",
      movies: [],
      currentMovie: [],
      titleFilter: "",
    };
  },
  created: function () {
    this.movieIndex();
  },
  methods: {
    movieIndex: function () {
      axios.get("/movies.json").then((response) => {
        this.movies = response.data;
        console.log("All Movies:", this.movies);
      });
    },
    filterMovies: function () {
      return this.movies.filter((movie) => {
        var lowerTitle = movie.title.toLowerCase();
        var lowerTitleFilter = this.titleFilter.toLowerCase();
        return lowerTitle.includes(lowerTitleFilter);
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <h2>{{ message }}</h2>
    <div class="search">
      <p>
        Search:
        <input v-model="titleFilter" list="titles" type="text" />
        <datalist id="titles">
          <option v-for="movie in movies" v-bind:key="movie.id">{{ movie.title }}</option>
        </datalist>
      </p>
    </div>
    <TransitionGroup name="list">
      <div
        v-for="movie in filterMovies()"
        v-bind:key="movie.id"
        v-on:click="currentMovie = movie"
        v-bind:class="{ selected: movie === currentMovie }"
      >
        <div class="card" style="width: 18rem">
          <img :src="movie.image" alt="blah blah" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">
              {{ movie.body }}
            </p>
            <a :href="`/movies/${movie.id}`" class="btn btn-primary">More Info</a>
            <a :href="`/movies/${movie.id}/edit`" class="btn btn-primary">Edit Details</a>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.selected {
  color: red;
  background-color: whitesmoke;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
