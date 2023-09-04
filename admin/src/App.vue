<script>
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
import { mapActions, mapState } from 'pinia';
import { useNewStore } from './stores/newStore';

  export default {
    components: {
      RouterView,
      NavBar
    },
    computed: {
      ...mapState(useNewStore, ['isLogin'])
    },
    methods: {
      ...mapActions(useNewStore, ['checkLoginFunc'])
    },
    created() {
      this.checkLoginFunc()
    }
  }
</script>

<template>
  <div>
    <RouterView />
    <div v-if="isLogin === true" class="flex justify-center flex-1">
      <NavBar></NavBar>
    </div>
  </div>
</template>