<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router';

const pokemon = ref([])
const API_URL = import.meta.env.VITE_API_URL


const fetchPokemon = async () => {
  try {
    const response = await fetch(`${API_URL}/pokemon`)
    const result = await response.json()
    pokemon.value = result
    console.log(result)
  } catch (err) {
    console.log('Fetch failed: ', err.message)
  }
}

onMounted(fetchPokemon)

</script>

<template>
  <main class="container">
    <h1>Pokemon Index Page</h1>
    <ul>
      <li v-for="p in pokemon" :key="pokemon._id">
        <RouterLink :to="`/pokemon/${p._id}`"># {{ p.number }} - {{ p.name }}</RouterLink>
      </li>
    </ul>
  </main>
</template>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  li {
    list-style: none;
  }
}
</style>