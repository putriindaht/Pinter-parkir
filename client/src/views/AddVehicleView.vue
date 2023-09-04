<script>
import { mapActions } from 'pinia';
import { useVehicleStore } from '../stores/vehicle'
import router from '../router';

export default {
    name: 'addVehicle',
    data() {
        return {
            nickname: '',
            licenseNumber: '',
            brand: '',
            color: ''
        }
    },
    methods: {
        ...mapActions(useVehicleStore, ['addVehicle']),
    }
}
</script>

<template>
    <div class="flex items-center h-full bg-white dark:bg-gray-900 mx-auto my-20">
        <div class="container mx-auto">
            <div class="max-w-md mx-auto">
                <div class="text-center">
                    <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Add Vehicle</h1>
                </div>
                <div class="m-7">
                    <form action="" @submit.prevent="addVehicle(nickname, licenseNumber, brand, color)">
                        <div class="mb-6">
                            <label for="username"
                                class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Nickname</label>
                            <input v-model="nickname" type="text" name="username" id="username" placeholder="your name"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <label for="licenseNumber" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">License
                                Number</label>
                            <input v-model="licenseNumber" type="text" name="licenseNumber" id="licenseNumber"
                                placeholder="license number"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <label for="brand" class="text-sm text-gray-600 dark:text-gray-400 mb-2">Brand</label>
                            <input v-model="brand" type="text" name="brand" id="brand" placeholder="Brand"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <label for="color" class="text-sm text-gray-600 dark:text-gray-400 mb-2">Color</label>
                            <input v-model="color" type="text" name="color" id="color" placeholder="Color"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6 flex gap-3">
                            <button type="submit"
                                class="px-3 py-4 text-white rounded-md bg-[#47B5FF] focus:bg-[#1363DF] focus:outline-none">Add</button>
                            <button type="reset"
                                class="px-3 py-4 text-black rounded-md bg-[#DFF6FF] focus:bg-[#1363DF] focus:outline-none">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>