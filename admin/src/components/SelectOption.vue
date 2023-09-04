<script>
    export default {
        name: "SelectOption",
        props: ["options"],
        emits: ["onSelected"],
        data() {
            selected: null
        },
        methods: {
            onChangeHandler(value) {
                this.$emit("onSelected", value)
            }
        }
    }
</script>
<template>
    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="selected" @change="onChangeHandler(this.selected)">
        <option selected disabled>--Please select one--</option>
        <option v-for="option in options" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
</template>