<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router';
export default {
    name: "login",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        ...mapActions(useUserStore, ['login', 'googleLogin'])
    },
    components: { RouterLink }
}
</script>

<template>
    <div class="flex mx-auto my-auto items-center h-full bg-white dark:bg-gray-900">
        <div class="container mx-auto">
            <div class="max-w-md mx-auto my-40">
                <div class="text-center">
                    <h1 class="my-5 text-3xl font-semibold text-gray-700 dark:text-gray-200">Welcome to Pinter-Parkir!</h1>
                    <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                </div>
                <div class="m-7">
                    <form action="" @submit.prevent="login(this.email, this.password)">
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email
                                Address</label>
                            <input v-model="email" type="email" name="email" id="email" placeholder="you@company.com"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <div class="flex justify-between mb-2">
                                <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                            </div>
                            <input v-model="password" type="password" name="password" id="password"
                                placeholder="Your Password"
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <button type="submit"
                                class="w-full px-3 py-4 text-white bg-[#06283D] rounded-md focus:bg-[#1363DF] focus:outline-none">Sign
                                in</button>
                        </div>
                        <div class="mb-6">
                            <GoogleLogin :callback="googleLogin" />
                        </div>
                        <p class="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <RouterLink
                                to="register"
                                class="text-[#1363DF] focus:outline-none focus:underline dark:focus:border-[#1363DF]">Sign
                                up</RouterLink>.</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>