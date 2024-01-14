<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemon = ref({})
const API_URL = import.meta.env.VITE_API_URL

const fetchSinglePokemon = async () => {
  try {
    const res = await fetch(`${API_URL}/pokemon/${route.params.id}`)
    const result = await res.json()
    pokemon.value = result
    console.log(result)
  } catch (err) {
    console.error('Error fetching single Pokemon: ', err.message)
  }
}

onMounted(fetchSinglePokemon)
</script>

<template>
  <main>
    <h1>{{ pokemon.name }} Info Page</h1>
  </main>
</template>