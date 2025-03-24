<template>
  <div>
    <div class="nav_bar">
      <router-link to="/">Home</router-link>
      <router-link to="/add">Ajouter un emploi</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav_bar {
  background-color:rgb(22, 114, 114);
  padding: 15px 20px;
  display: flex;
  gap: 20px;
  justify-content: flex-start;
}

.nav_bar > a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
}

.nav_bar > a:hover {
  color: #25d1dd;
}

</style>
