<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from "../stores/user"
export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(useUserStore, ['logout', 'setIsLogin'])
    },
    computed: {
        ...mapState(useUserStore, ['isLogin'])
    },
    created() {
        this.setIsLogin()
    }
}
</script>
<template>
    <header class="bg-[#06283D]" style="position: fixed; width: 100%;">
        <nav class="flex text-white justify-between items-center sm:h-12">
            <div class="p-10 font-bold text-xl flex-1">Pinter-Parkir</div>
            <div class="flex-2">
                <ul class="flex justify-between">
                    <li class="p-3">
                        <RouterLink v-if="isLogin === true" to="/">Home</RouterLink>
                    </li>
                    <li class="p-3">
                        <RouterLink v-if="isLogin === true" to="/transactionRecord">Transaction Records</RouterLink>
                    </li>
                    <li class="p-3">
                        <RouterLink v-if="isLogin === true" to="/parkingRecord">Parking Records</RouterLink>
                    </li>
                    <li class="p-3">
                        <RouterLink v-if="isLogin === true" to="/subscription">Subscription</RouterLink>
                    </li>
                    <li class="p-3">
                        <RouterLink v-if="isLogin === true" to="/addVehicle">Add Vehicle</RouterLink>
                    </li>
                    <li class="p-3">
                        <RouterLink v-if="isLogin === true" to="/parkingVehicle">Parking Vehicle</RouterLink>
                    </li>

                </ul>
            </div>
            <div class=" mr-10">
                <RouterLink v-if="isLogin === false" to="/login">Sign In</RouterLink>
                <button v-if="isLogin === true" @click="logout()">Sign Out</button>
            </div>
        </nav>
    </header>
</template>