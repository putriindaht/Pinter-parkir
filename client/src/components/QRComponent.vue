<template>
    <qrcode-vue :value="qrValue" :size="size" level="H" />
</template>
<script>
import QrcodeVue from 'qrcode.vue'

export default {
    data() {
        return {
            qrValue: "",
            size: 300,
        }
    },
    props: ["value"],
    components: {
        QrcodeVue,
    },
    created() {
        this.qrValue = this.value
    }
}
</script>