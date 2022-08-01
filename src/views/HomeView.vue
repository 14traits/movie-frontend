<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Do or do not; there is no try!",
      movies: [],
      newMovieParams: {},
      currentMovie: {},
      editMovieParams: {},
    };
  },
  created: function () {
    this.indexMovies();
  },
  methods: {
    indexMovies: function () {
      axios.get("movies.json").then((response) => {
        this.movies = response.data;
        console.log("All Movies", this.movies);
      });
    },
    createMovies: function () {
      axios
        .post("movies.json", this.newMoviesParams)
        .then((response) => {
          console.log("Movies Created!", response.data);
          this.movies.push(response.data);
          this.$refs.anyName.reset();
        })
        .catch((error) => console.log(error.response));
    },
    showMovie: function (movie) {
      console.log(movie);
      this.currentMovie = movie;
      this.editMovieParams = movie;
      document.querySelector("#movie-plot").showModal();
    },
    updateMovies: function (movie) {
      axios.patch("movies/" + movie.id, this.editMovieParams).then((response) => {
        console.log("Movies Updated!", response.data);
      });
    },
    destroyMovies: function (movie) {
      axios.delete("movies/" + movie.id).then((response) => {
        console.log("Movies Destroyed!", response.data);
        var index = this.movies.indexOf(movie);
        this.movies.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      Name:
      <input type="text" v-model="newMovieParams.title" />
      Plot:
      <input type="text" v-model="newMovieParams.plot" />
      <button v-on:click="createMovie()">Create</button>
    </div>
    <div v-for="movie in movies" v-bind:key="movie.id">
      <h4>{{ movie.title }}:</h4>
      <p>${{ movie.plot }}</p>
      <button v-on:click="showMovie(movie)">more info!</button>
    </div>

    <dialog id="movie-plot">
      <form method="dialog">
        <h1>Edit Movie</h1>
        <p>
          Movie Name:
          <input type="text" v-model="editMovieParams.title" />
        </p>
        <p>
          Plot:
          <input type="text" v-model="editMovieParams.plot" />
        </p>
        <button>Close</button>
        <button v-on:click="updateMovies(currentMovie)">Update</button>
        <button v-on:click="destroyMovies(currentMovie)">Delete</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
