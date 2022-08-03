<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newMovieParams: { plot: "" },
      errors: [],
      status: "",
    };
  },
  methods: {
    createMovie: function () {
      axios
        .post("/movies", this.newMovieParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/movies");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="movies-new">
      <img v-if="status" :src="`https://http.dog/${status}.jpg`" width="500" />
      <form v-on:submit.prevent="createMovie()">
        <h1>New Movie:</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Title:</label>
          <input type="text" v-model="newMovieParams.title" />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" v-model="newMovieParams.plot" />
          <small v-if="newMovieParams.plot.length > 140" class="danger">Should not be over 140 characters"</small>
        </div>
        <div>
          <label>Year:</label>
          <input type="text" v-model="newMovieParams.year" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>
