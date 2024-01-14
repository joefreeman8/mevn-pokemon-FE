<script setup>
import { ref } from 'vue';
const API_URL = import.meta.env.VITE_API_URL


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

async function handleSubmit(e) {
  e.preventDefault()
  try {
    const response = await fetch(`${API_URL}/pokemon/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...pokemon.value })
    })

    if (response.ok) {
      console.log('Success')
      clearForm()
    } else {
      console.error(`Error: ${response.status}`)
    }
  } catch (err) {
    console.log(err.message)
  }
}

function clearForm() {
  pokemon.value = {
    number: '',
    name: '',
    habitat: '',
    type: [],
    pokedexEntry: '',
    sprite: '',
    image: ''
  }
}
</script>

<template>
  <section>
  <h3>Add New Pokemon</h3>
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
          id="type" 
          v-model="pokemon.type" 
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
      <button type="submit">Add Pokemon</button>
    </form>
  </div>
</section>
</template>