<script>
import { mapActions, mapState } from 'pinia';
import { useSubscriptionStore } from '../stores/subscription';
import { useVehicleStore } from '../stores/vehicle';
import { useTransactionStore } from '../stores/transaction';

export default {
    computed: {
        ...mapState(useSubscriptionStore, ['subscription']),
        ...mapState(useVehicleStore, ['vehicles'])
    },
    methods: {
        ...mapActions(useSubscriptionStore, ['fetchSubscription']),
        ...mapActions(useVehicleStore, ['fetchVehicle']),
        ...mapActions(useTransactionStore, ['addTransaction', 'handleCallback'])
    },
    created() {
        this.fetchSubscription()
        this.fetchVehicle()
    },
    data() {
        return {
            vehicleId: 0,
        }
    }
}
</script>
<template>
    <div class="grid grid-cols-5 gap-6 p-10 my-7">
        <div class="flex bg-[#DFF6FF] border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
            v-for="sub in subscription" :key="sub.id">
            <div class="p-4 md:p-5">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white">
                    {{ sub.name }}
                </h3>
                <p class="mt-1 text-gray-800 dark:text-gray-400 flex grow text-ellipsis truncate">
                    {{ sub.description }}
                </p>
                <p class="mt-1 text-gray-800 dark:text-gray-400 flex grow text-ellipsis truncate">
                    Duration : {{ sub.durationAmount }} {{ sub.durationUnit }}
                </p>
                <p class="text-gray-800 dark:text-gray-400 flex grow text-ellipsis truncate">
                    Price : Rp {{ sub.price }}
                </p>
                <label for="vehicles" class="block mb-[10px] text-sm font-medium text-gray-900 dark:text-gray-400">Choose
                    your
                    vehicle:</label>
                <select name="vehicle" v-model="vehicleId"
                    class="bg-[#DFF6FF] border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled>--select--</option>
                    <option v-for="vehicle in vehicles" :value="vehicle.id" value="">{{ vehicle.nickname }}</option>
                </select>
                <button type="submit" @click="handleCallback(sub.id)"
                    class="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#47B5FF] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    Buy
                </button>
            </div>
        </div>
    </div>
</template>