<script setup>
import { ref, onMounted, inject } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const isLoggedIn = inject('isLoggedIn')
const userSub = inject('userSub')
const checkSession = inject('checkSession')
const userEmail = inject('userEmail')

const route = useRoute()
const router = useRouter()
const pokemon = ref({})
const API_URL = import.meta.env.VITE_API_URL
const id = route.params.id


function isOwner(pokemonUniqueSub) {
  return userSub.value === pokemonUniqueSub
}

const fetchSinglePokemon = async () => {
  try {
    const res = await fetch(`${API_URL}/pokemon/${id}`)
    const result = await res.json()
    pokemon.value = result
    console.log(result)
  } catch (err) {
    console.error('Error fetching single Pokemon: ', err.message)
  }
}

const deletePokemon = async () => {
  try {
    const res = await fetch(`${API_URL}/pokemon/${id}`, {
      method: "DELETE",
      headers: {
        "User-Email": userEmail.value
      }
    })
    if (res.ok) {
      console.log('Pokemon Deleted')
      router.replace({ name: 'pokemon' })
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchSinglePokemon()
  checkSession()
})

</script>

<template>
  <main class="container mt-5 d-flex flex-column align-items-center">
    <div class="mt-5 card h-75 border p-5 shadow-lg pokemon-card card-shine-effect-metal" style="--bs-border-color: #ffd508; background-color: #bf4af3; --bs-border-width: 1em;" >
      <div class="pokemon-title-and-image border d-flex flex-column justify-content-center align-items-center rounded p-1 shadow" style="--bs-border-color: #ffd508; --bs-border-width: 0.5em;">
        <h2>#{{ pokemon.number }} - {{ pokemon.name }}</h2>
        <img class="h-75" :src="pokemon.image" :alt="pokemon.name" />
      </div>
      <div class="px-4 pb-2">
    <p class="mt-4"><strong>Type: </strong>
      <span v-for="type, index in pokemon.type" :key="index">
          {{ type[0].toUpperCase() + type.slice(1, type.length) }}{{ index < pokemon.type.length - 1 ? ', ' : '' }}
      </span>
    </p>
    <p class=""><strong>Habitat:</strong> {{ pokemon.habitat }}</p>
    <p><strong>Pokedex:</strong> {{ pokemon.pokedexEntry }}</p>
  </div>
    <!-- <br /> -->
    <div v-if="isLoggedIn && isOwner(pokemon.addedBy?.uniqueSub)" class="d-grid gap-2 d-md-flex justify-content-md-center">
      <RouterLink class="btn btn-sm btn-warning" :to="`/pokemon/${pokemon._id}/edit`">Edit Pokemon</RouterLink>
      <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Pokemon</button>
    </div>
  </div>
    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">Are you sure you want to Delete {{ pokemon.name }}?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
            <button @click="deletePokemon" type="button" class="btn btn-danger" data-bs-dismiss="modal">Delete {{ pokemon.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 95dvh;
}

.pokemon-card {
  width: 60dvw;
}

h2,
p {
  color: white;
}

.pokemon-title-and-image {
  width: 100%;
  height: 60%;
  background: linear-gradient(to bottom, #d39df3, #84559f);
}

.card-shine-effect-metal {
  --shine-deg: 45deg;
  position: relative;
  overflow: hidden;
  border-radius: 0.875rem;
  padding: 4rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(to bottom, #d39df3, #c370f3, #84559f);
}

.card-shine-effect-metal:after {
  content: "";
  top: 0;
  transform: translateX(100%) rotate(var(--shine-deg));
  width: 300%;
  height: 300%;
  position: absolute;
  z-index: 1;
  background: linear-gradient(30deg,
      transparent 20%,
      transparent 40%,
      rgb(255, 255, 255, 0.4) 50%,
      rgb(255, 255, 255, 0.4) 55%,
      transparent 70%,
      transparent 100%);
  transition: transform 2s ease-in;
  transform: translateX(100%) rotate(var(--shine-deg));
  animation: shine 5s infinite ease-in;
}


@keyframes shine {
  0% {
    transform: translateX(100%) rotate(var(--shine-deg));
  }

  100% {
    transform: translateX(-100%) rotate(var(--shine-deg));
  }
}
</style>