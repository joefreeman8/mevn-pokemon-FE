import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonIndexView from '@/views/PokemonIndexView.vue'
import PokemonShowView from '@/views/PokemonShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: PokemonIndexView
    },
    {
      path: '/pokemon/:id',
      name: 'pokemonShow',
      component: PokemonShowView
    }
  ]
})

export default router
