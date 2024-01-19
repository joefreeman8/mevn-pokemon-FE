<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const API_URL = import.meta.env.VITE_API_URL

const router = useRouter()
const route = useRoute()

const userEmail = inject('userEmail');
const checkSession = inject('checkSession');

const id = route.params.id

const pokemon = ref({
  number: '',
  name: '',
  habitat: '',
  type: [],
  pokedexEntry: '',
  sprite: '',
  image: ''
})

const pokemonTypes = [
  'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark',
  'dragon', 'steel', 'fairy',
]

const loadPokemonData = async () => {
  try {
    const response = await fetch(`${API_URL}/pokemon/${id}`)
    const result = await response.json()
    pokemon.value = {
      number: result.number,
      name: result.name,
      habitat: result.habitat,
      type: result.type,
      pokedexEntry: result.pokedexEntry,
      sprite: result.sprite,
      image: result.image,
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  checkSession()
  loadPokemonData()
})

async function handleSubmit(e) {
  e.preventDefault()
  try {
    const response = await fetch(`${API_URL}/pokemon/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "User-Email": userEmail.value,
      },
      body: JSON.stringify({ ...pokemon.value })
    })

    if (response.ok) {
      router.push(`/pokemon/${id}`)
    } else {
      console.error(`Error: ${response.status}`)
    }
  } catch (err) {
    console.log(err.message)
  }
}

</script>

<template>
  <section>
  <h3>Edit Pokemon</h3>
  <div class="pokemon-form">
    <form  @submit="handleSubmit">
      <div>
        <label for="number">Number: </label>
        <input 
          type="number" 
          id="number" 
          v-model="pokemon.number" 
          name="number" 
          placeholder="Pokemon Number" 
          required
        />
      </div>
      <div>
      <label for="name">Name: </label>
      <input 
        type="text" 
        id="name" 
        v-model="pokemon.name" 
        name="name" 
        placeholder="Pokemon Name" 
        required
      />
      </div>
      <div>
      <label for="habitat">Habitat: </label>
      <input 
        type="text" 
        id="habitat" 
        v-model="pokemon.habitat" 
        name="habitat" 
        placeholder="Pokemon Habitat" 
        required
      />
      </div>
      <div>
        <label for="type">Type: </label>
        <span v-for="type, index in pokemonTypes" :key="index">
          <input 
          type="checkbox" 
          :id="type" 
          v-model="pokemon.type" 
          :value="type"
          name="type" 
          placeholder="Pokemon type" 
        
          />
          <span>&nbsp;{{ type }} &nbsp;</span>
        </span>
      </div>
      <div>
      <label for="pokedexEntry">Pokedex: </label>
      <textarea 
        id="pokedexEntry"
        v-model="pokemon.pokedexEntry" 
        placeholder="Pokedex Entry"
      >
        Replace this text with your Pokedex entry
      </textarea>
    </div>
    <div>
      <label for="sprite">Sprite: </label>
      <input 
        type="text" 
        id="sprite" 
        v-model="pokemon.sprite" 
        name="sprite" 
        placeholder="Pokemon Sprite" 
        required
      />
    </div>
    <div>
      <label for="image">Image: </label>
      <input 
        type="text" 
        id="image" 
        v-model="pokemon.image" 
        name="image" 
        placeholder="Pokemon Image" 
        required
      />
    </div>
      <button type="submit">Edit Pokemon</button>
    </form>
  </div>
</section>
</template>