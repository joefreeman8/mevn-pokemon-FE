<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="nav">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pokemon">View Pokemon</RouterLink>
        <RouterLink to="/pokemon/add">Add New Pokemon</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
body {
  background-color: rgb(68, 7, 114);
}
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

}

nav a.router-link-exact-active {
  color: rgb(255, 205, 53);
  text-decoration: none;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
  color: white;
}
</style>
