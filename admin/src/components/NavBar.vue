<script>
import { RouterLink } from 'vue-router'
import SelectOption from './SelectOption.vue';
import { mapActions, mapState } from 'pinia';
import { useNewStore } from '../stores/newStore';
    export default {
        name: "NavBar",
        components: {
            RouterLink,
            SelectOption
        },
        computed: {
            ...mapState(useNewStore, ['availableLocations'])
        },
        methods: {
            ...mapActions(useNewStore, ['logoutFunc', 'getLocationFunc', 'selectLocationFunc']),
            handleLogout() {
                this.$swal({
                title: 'Are you sure?',
                text: 'You will be logged out',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Yes, I'm out!"
                }).then((result) => {
                if (result.isConfirmed) {
                    // If the user clicks 'Yes', do something here
                    this.$swal(
                    'Logged out!',
                    'You are logged out',
                    'success'
                    )
                    this.logoutFunc()
                }
                })
            }
        },
        async created() {
            await this.getLocationFunc()
        }
    }
</script>

<template>
    <div class="flex gap-10 round-md dark:text-gray-900">
        <button @click.prevent="handleLogout" class="text-white bg-[#06283D] rounded-sm px-4 py-1 focus:bg-[#1363DF] focus:outline-none">Log out</button>
        <button class="text-white bg-[#06283D] rounded-sm px-4 py-1 focus:bg-[#1363DF] focus:outline-none"><RouterLink to="/tap-in">Tap in</RouterLink></button>
        <button class="text-white bg-[#06283D] rounded-sm px-4 py-1 focus:bg-[#1363DF] focus:outline-none"><RouterLink to="/tap-out">Tap out</RouterLink></button>
        <SelectOption :options="availableLocations" @on-selected="selectLocationFunc" />
    </div>
</template>