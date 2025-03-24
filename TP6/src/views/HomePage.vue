<template>
    <div>
      <NavBar />
      <div class="container">
        <PostList />
        <TagCloud :tags="tags" />
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '../components/NavBar.vue';
  import PostList from '../components/PostList.vue';
  import TagCloud from '../components/TagCloud.vue';
  import { getPosts } from '../composables/getPosts';
  
  export default {
    components: { NavBar, PostList, TagCloud },
    data() {
      return {
        tags: [],
      };
    },
    async created() {
      const posts = await getPosts();
      this.tags = [...new Set(posts.flatMap(post => post.tags))];
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
  }
  </style>