<script setup>
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'
import { inject } from 'vue'

const { cookies } = useCookies()
const API_URL = import.meta.env.VITE_API_URL

const isLoggedIn = inject('isLoggedIn')

const callback = async (response) => {
  try {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    cookies.set('user_session', response.credential)

    await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: userData.email,
        uniqueSub: userData.sub
      })
    })
  } catch (err) {
    console.error(err)
    console.error(err.message)
  }
}


</script>

<template>
  <main class="d-flex align-items-center justify-content-center flex-column">
    <h1>Welcome to the PokeDex</h1>
    <div class="content d-flex flex-column text-center align-items-center justify-content-around">
      <p class="w-50">
        Here you will find the original 151 Pokemon for you to browse!
        You may add any new Pokemon you like. Check their Pokemon Number so they can take their place in our database. 
        Just be sure to log in so you can be granted Create, Edit & Delete permissions.
      </p>
      <GoogleLogin v-if="!isLoggedIn" :callback="callback" />
      <RouterLink class="link mt-2" to="/pokemon">
      <div class="pokeball-container">
        <img src="../assets/pokeball.png" class="pokeball" />
      </div>
      <p class="text-warning mt-3">Open the Pokeball</p>
    </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100dvh;
}

.content {
  height: 50dvh;
}


h1,
p {
  color: white;
}

.link {
  text-decoration: none;
}

.pokeball-container {
  position: relative;
  display: inline-block;
}

.pokeball {
  height: 10em;
  cursor: pointer;
}

.pokeball-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 2px 2px 20px yellow;
  /* Adjust the values to your preference */
}
</style>