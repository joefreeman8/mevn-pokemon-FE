<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { provide } from 'vue'
import { isLoggedIn, username, userEmail, userSub, checkSession } from '@/components/globalProvide.js'

import { useCookies } from 'vue3-cookies'
import { googleLogout } from 'vue3-google-login'
const { cookies } = useCookies()

provide('isLoggedIn', isLoggedIn);
provide('username', username);
provide('userSub', userSub);
provide('userEmail', userEmail);
provide('checkSession', checkSession);

const handleLogout = () => {
  googleLogout()
  cookies.remove('user_session')
  isLoggedIn.value = false
}

</script>

<template>
  <header>
    <div class="nav">
      <nav class="d-flex justify-content-between">
        <div class="p-1 ms-1">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pokemon">View Pokemon</RouterLink>
      </div>
        <div v-if="isLoggedIn" class="me-4">
          <RouterLink to="/pokemon/add">Add New Pokemon</RouterLink>
          <button @click="handleLogout" class="btn btn-sm btn-warning p-1">Log Out</button>
        </div>
        <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
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
