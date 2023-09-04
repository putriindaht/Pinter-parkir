<script>
import { mapActions, mapState } from 'pinia';
import { useParkingStore } from '../stores/parking';
import QRComponent from '../components/QRComponent.vue'
import { useVehicleStore } from '../stores/vehicle';


export default {
    name: 'parkingVehicle',
    data() {
        return {
            localCode: null,
            selectedVehicle: null
        };
    },
    computed: {
        ...mapState(useVehicleStore, ['vehicles'])
    },
    methods: {
        ...mapActions(useParkingStore, ['generateQR']),
        ...mapActions(useVehicleStore, ['fetchVehicle', 'deleteVehicle']),
        async localGenerateQR(id) {
            this.localCode = await this.generateQR(id)
            this.selectedVehicle = id
        }
    },
    async created() {
        await this.fetchVehicle()
    },
    components: {
        QRComponent
    },
}
</script>
<template>
    <div class="my-20">
        <h1 class="mx-10 my-2 text-2xl font-bold">Let's start your parking journey!</h1>
        <p class="mx-10 my-2 text-xl font-bold"> To start parking you have to subscribe to our package, check packages
            <RouterLink class="text-blue-500" to="/subscription">here!</RouterLink>
        </p>
        <table class="table-auto mx-10">
            <thead>
                <tr>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Vehicle</th>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Actions</th>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">QR code for parking!</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="vehicle in vehicles" :key="vehicle.id">
                    <td class="border px-4 py-2">
                        {{ vehicle.nickname }}
                    </td>
                    <td class="border px-4 py-2">
                        <div class="flex">
                            <div class="flex gap-2">
                                <span class="material-symbols-outlined" style="color: #06283D;"
                                    @click="deleteVehicle(vehicle.id)">
                                    delete
                                </span>
                                <button class="" @click.prevent="localGenerateQR(vehicle.id)">Start parking</button>
                            </div>
                        </div>
                    </td>
                    <td class="border px-4 py-2">
                        <QRComponent v-if="localCode && selectedVehicle === vehicle.id" :value="localCode" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>