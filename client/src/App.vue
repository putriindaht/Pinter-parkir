<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <div class="flex">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
