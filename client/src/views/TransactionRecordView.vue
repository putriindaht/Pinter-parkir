<script>
import { mapActions, mapState } from 'pinia';
import { useTransactionStore } from '../stores/transaction';

export default {
    name: "transactionRecord",
    computed: {
        ...mapState(useTransactionStore, ['transactions'])
    },
    methods: {
        ...mapActions(useTransactionStore, ['fetchTransaction']),
        formatDate(date) {
            const newDate = new Date(date)
            const year = date.getFullYear(); // 2023
            const month = date.getMonth() + 1; // 8 (Note: JavaScript months are zero-based, so we add 1)
            const day = date.getDate(); // 1
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        }
    },
    created() {
        this.fetchTransaction()

    }
}
</script>

<template>
    <div class="my-20">
        <h1 class="mx-10 my-1 text-2xl font-bold">My Transaction Records:</h1>
        <table class="tabel-auto mx-10 border-collapse w-full">
            <thead>
                <tr>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Order Id</th>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Status</th>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Start Date</th>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Expired Date</th>
                    <th class="border px-4 py-2 bg-[#DFF6FF]">Subscription Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trx in transactions" :key="trx.id">
                    <td class="border px-4 py-2">{{ trx.orderId }}</td>
                    <td class="border px-4 py-2">{{ trx.status }}</td>
                    <td class="border px-4 py-2">{{ trx.startDate.split("T")[0] }}</td>
                    <td class="border px-4 py-2">{{ trx.expiredDate.split("T")[0] }}</td>
                    <td class="border px-4 py-2">{{ trx.Subscription.name }}</td>
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