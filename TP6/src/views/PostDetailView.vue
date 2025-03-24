<template>
    <div>
      <NavBar />
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <TagCloud :tags="post.tags" />
    </div>
  </template>
  
  <script>
  import NavBar from '../components/NavBar.vue';
  import TagCloud from '../components/TagCloud.vue';
  import { getPost } from '../composables/getPost';
  
  export default {
    components: { NavBar, TagCloud },
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        post: {},
      };
    },
    async created() {
      this.post = await getPost(this.id);
    },
  };
  </script>