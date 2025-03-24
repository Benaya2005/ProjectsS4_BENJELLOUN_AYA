import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/addPost', component: CreatePostView },
  { path: '/post/:id', component: PostDetailView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;