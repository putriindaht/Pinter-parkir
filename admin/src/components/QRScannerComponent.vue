<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
    name: "QRScannerComponent",
    emits: ["onDetect"],
    components: {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    },
    methods: {
        onDetect(detectedCodes) {
            console.log(detectedCodes[0].rawValue)
            this.$emit("onDetect", detectedCodes[0].rawValue)
        }
    }
}
</script>

<template>
    <qrcode-stream @detect="onDetect"></qrcode-stream>
</template>