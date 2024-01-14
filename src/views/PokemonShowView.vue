<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

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
    <h1>#{{ pokemon.number }} - {{ pokemon.name }}</h1>
    <img :src="pokemon.image" :alt="pokemon.name" />
    <p>Type: 
      <span v-for="type, index in pokemon.type" :key="index">
        <strong>
          {{ type[0].toUpperCase() + type.slice(1, type.length) }}{{ index < pokemon.type.length - 1 ? ', ' : '' }}
        </strong>
      </span>
    </p>
    <p>Habitat: {{ pokemon.habitat }}</p>
    <p>Pokedex: {{ pokemon.pokedexEntry }}</p>
    <br />
    <RouterLink :to="'/pokemon'">Back To All Pokemon</RouterLink>
  </main>
</template>