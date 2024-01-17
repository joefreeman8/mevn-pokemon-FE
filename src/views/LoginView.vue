<script setup>
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { onMounted, inject } from 'vue'

const { cookies } = useCookies()
const API_URL = import.meta.env.VITE_API_URL

const isLoggedIn = inject('isLoggedIn')
const username = inject('username')
const checkSession = inject('checkSession')

const callback = async (response) => {
  try {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    console.log(userData)
    username.value = userData.given_name
    cookies.set('user_session', response.credential)

    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: userData.email,
        uniqueSub: userData.sub
      })
    })
    if (res.ok) {
      console.log(`${username.value}, has successfully logged in`)
    }
  } catch (err) {
    console.error(err)
    console.error(err.message)
  }
}

const handleLogout = () => {
  googleLogout()
  cookies.remove('user_session')
  isLoggedIn.value = false
}

onMounted(checkSession)

</script>

<template>
  <section>
    <h1>Login</h1>
    <div v-if="isLoggedIn">
      <h2>Hello {{ username }}</h2>
      <button class="btn btn-warning" @click="handleLogout">Log Out</button>
    </div>
    <div v-else>
      <GoogleLogin :callback="callback" />
    </div>
  </section>
</template>

<style scoped>
h1,
h2,
div {
  color: white;
}
</style>