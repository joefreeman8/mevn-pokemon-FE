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
  <section class="container d-flex justify-content-center align-items-center flex-column w-100">
  <h1 class="text-center mt-5 mb-2">Edit Pokemon</h1>
  <div class="mt-2 d-flex justify-content-center align-items-center w-50">
    <form  @submit="handleSubmit">
      <div>
        <label for="number" class="form-label text-warning">Number: </label>
        <input 
        class="form-control"
          type="number" 
          id="number" 
          v-model="pokemon.number" 
          name="number" 
          placeholder="Pokemon Number" 
          required
        />
      </div>
      <div>
      <label for="name" class="form-label text-warning">Name: </label>
      <input 
      class="form-control"
        type="text" 
        id="name" 
        v-model="pokemon.name" 
        name="name" 
        placeholder="Pokemon Name" 
        required
      />
      </div>
      <div>
      <label for="habitat" class="form-label text-warning">Habitat: </label>
      <input 
      class="form-control"
        type="text" 
        id="habitat" 
        v-model="pokemon.habitat" 
        name="habitat" 
        placeholder="Pokemon Habitat" 
        required
      />
      </div>
      <div>
        <label for="type" class="text-warning">Type: </label><br />
        <div v-for="type, index in pokemonTypes" :key="index" class="btn-group m-1" role="group" aria-label="Basic checkbox toggle button group" >
          <input 
          autocomplete="off"
          type="checkbox" 
          class="btn-check"
          :id="type" 
          v-model="pokemon.type" 
          :value="type"
          name="type" 
          placeholder="Pokemon type" 
          />
          <label class="btn btn-outline-warning" :for="type">&nbsp;{{ type }} &nbsp;&nbsp;</label>
        </div>
      </div>
      <div>
      <label for="pokedexEntry" class="form-label text-warning">Pokedex: </label>
      <textarea 
      class="form-control"
        id="pokedexEntry"
        v-model="pokemon.pokedexEntry" 
        placeholder="Pokedex Entry"
      >
        Replace this text with your Pokedex entry
      </textarea>
    </div>
    <div>
      <label for="sprite" class="form-label text-warning">Sprite: </label>
      <input 
      class="form-control"
        type="text" 
        id="sprite" 
        v-model="pokemon.sprite" 
        name="sprite" 
        placeholder="Pokemon Sprite" 
        required
      />
    </div>
    <div>
      <label for="image" class="form-label text-warning">Image: </label>
      <input 
        class="form-control"
        type="text" 
        id="image" 
        v-model="pokemon.image" 
        name="image" 
        placeholder="Pokemon Image" 
        required
      />
    </div>
    <div class="d-flex justify-content-center m-0">
      <button class="btn btn-warning m-5 btn-lg" type="submit">Edit Pokemon</button>
    </div>
    </form>
  </div>
</section>
</template>

<style scoped>
h1 {
  color: white;
}

span {
  color: white;
}
</style>