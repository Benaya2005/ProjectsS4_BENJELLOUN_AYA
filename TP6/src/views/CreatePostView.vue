<template>
    <div>
      <NavBar />
      <h1>Create a New Post</h1>
      <form @submit.prevent="createPost">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div>
          <label for="body">Body:</label>
          <textarea id="body" v-model="body" required></textarea>
        </div>
        <div>
          <label for="tags">Tags:</label>
          <input type="text" id="tags" v-model="tags" />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  </template>
  
  <script>
  import NavBar from '../components/NavBar.vue';
  
  export default {
    components: { NavBar },
    data() {
      return {
        title: '',
        body: '',
        tags: '',
      };
    },
    methods: {
  createPost() {
    const newPost = {
      id: Date.now(),
      title: this.title,
      body: this.body,
      tags: this.tags.split(',').map(tag => tag.trim()),
    };
    // Ajouter le post à une liste globale ou à un store (Vuex/Pinia)
    this.$store.dispatch('addPost', newPost); // Exemple avec Vuex
    this.$router.push('/');
  },
},
  };
  </script>