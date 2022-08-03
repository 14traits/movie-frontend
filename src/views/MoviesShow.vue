<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movie: {},
    };
  },
  created: function () {
    axios.get("/movies/" + this.$route.params.id + ".json").then((response) => {
      this.movie = response.data;
    });
  },
  methods: {
    destroyMovie: function () {
      axios.delete("/movies/" + this.$route.params.id + ".json").then((response) => {
        console.log("Movie Deleted!", response.data);
        this.$router.push("/movies");
      });
    },
  },
};
</script>

<template>
  <div class="movies_show">
    <div class="container">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.plot }}</p>
      <router-link to="/movies">Back to all Movies</router-link>
      |
      <router-link v-bind:to="`/movies/${movie.id}/edit`">Edit Movie</router-link>
      <div>
        <button v-on:click="destroyMovie()">Delete movie</button>
      </div>
    </div>
  </div>
</template>

<style>
/* .selected {

} */
</style>
