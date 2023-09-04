<script>
    import { mapActions, mapState } from 'pinia';
import QRScannerComponent from '../components/QRScannerComponent.vue';
import { useNewStore } from '../stores/newStore';
    export default {
        name: "TapInView",
        data() {
            return {}
        },
        components: {
            QRScannerComponent
        },
        computed: {
            ...mapState(useNewStore, ['selectedLocations'])
        },
        methods: {
            ...mapActions(useNewStore, ['tapinFunc']),
            onDetectHandler(value) {
                const vehicleId = value && value.split('-')[1]
                this.tapinFunc(vehicleId, this.selectedLocations)
                this.$swal("TAPPED IN")
            }
        }
    }
</script>

<template>
    <div class="flex justify-center">
        <QRScannerComponent @on-detect="onDetectHandler" />
    </div>
</template>