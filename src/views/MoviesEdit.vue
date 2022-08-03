<script>
import axios from "axios";

export default {
  data: function () {
    return {
      editMovieParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/movies/" + this.$route.params.id + ".json").then((response) => {
      this.editMovieParams = response.data;
    });
  },
  methods: {
    updateMovie: function () {
      axios
        .patch("/movies/" + this.$route.params.id + ".json", this.editMovieParams)
        .then((response) => {
          console.log(response.data);
          // this.editMovieParams = response.data
          this.$router.push("/movies");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
  destroyMovie: function () {
    axios.delete("/movies/" + this.$route.params.id + ".json").then((response) => {
      console.log("Movie Deleted!", response.data);
      this.$router.push("/movies");
    });
  },
};
</script>

<template>
  <div class="movies_edit">
    <form v-on:submit.prevent="updateMovie()">
      <h1>New Movie:</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Title:</label>
        <input type="text" v-model="editMovieParams.title" />
      </div>
      <div>
        <label>Plot:</label>
        <input type="text" v-model="editMovieParams.plot" />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" v-model="editMovieParams.year" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <div>
      <button v-on:click="destroyMovie()">Delete Movie</button>
    </div>
  </div>
</template>
