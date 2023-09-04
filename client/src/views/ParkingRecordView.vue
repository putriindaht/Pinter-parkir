<script>
import { mapActions, mapState } from 'pinia';
import { useParkingStore } from '../stores/parking';

export default {
    name: "parkingRecord",
    methods: {
        ...mapActions(useParkingStore, ['fetchParkirRecord'])
    },
    computed: {
        ...mapState(useParkingStore, ['parkingRecords'])
    },
    created() {
        this.fetchParkirRecord()
    }
}
</script>
<template>
    <div class="my-20">
        <h1 class="mx-10 my-1 text-2xl font-bold">My Parking Records:</h1>
        <table class="tabel-auto mx-10 border-collapse w-full">
            <thead>
                <th class="border px-4 py-2 bg-[#DFF6FF]">Vehicle</th>
                <th class="border px-4 py-2 bg-[#DFF6FF]">Duration (minutes)</th>
                <th class="border px-4 py-2 bg-[#DFF6FF]">Location</th>
            </thead>
            <tbody>
                <tr v-for="record in parkingRecords" :key="record.id">
                    <td class="border px-4 py-2">{{ record.Vehicle.nickname }}</td>
                    <td class="border px-4 py-2">{{ Math.ceil((new Date(record.outTime) - new Date(record.inTime)) / 60000)
                    }}</td>
                    <td class="border px-4 py-2">{{ record.Location.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.border {
    border-color: #06283D;
}
</style>