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
  } catch (err) {
    console.log('Fetch failed: ', err.message)
  }
}

onMounted(fetchPokemon)

</script>

<template>
  <main class="container">
    <h1 class="mt-5 text-center">Pokemon Index Page</h1>
    <div class="row mt-5">
      <div v-for="p in pokemon" :key="p._id" class="col-md-4 mb-4">
        <RouterLink class="text-decoration" :to="`/pokemon/${p._id}`">
        <div class="card bg-warning h-100 d-flex align-items-center">
          <div class="card-body">
            <p class="hello">{{ p.number }} - {{ p.name }}</p>
            <img :src="p.sprite" :alt="p.name" />
          </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>


<style scoped>
h1 {
  color: white;
}

.text-decoration {
  text-decoration: none;
}

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