import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = 'https://pinterparkir.puthree.space'

export const useNewStore = defineStore('newStore', {
    state: () => {
        return {
            isLogin: false,
            availableLocations: [],
            selectedLocations: null
        }
    }, 
    actions: {
        testFunc() {
            console.log('works')
        },
        async loginFunc(email, password) {
            try {
                console.log(email, password)
                const { data } = await axios({
                    method: 'post',
                    baseURL: baseURL + '/login',
                    data: {
                        email,
                        password
                    }
                })
                localStorage.setItem('access_token', data.access_token)
                this.isLogin = true
                this.router.push('/tap-in')
            } catch (error) {
                console.log(error)
            }
        },
        logoutFunc() {
            localStorage.clear()
            this.isLogin = false
            this.router.push('/login')
        },
        async checkLoginFunc() {
            if (!localStorage.getItem('access_token')) {
                this.isLogin = false
            } else {
                this.isLogin = true
            }
        },
        async tapinFunc(vehicleId, locationId) {
            try {
                const { data } = await axios({
                    url: baseURL + '/admin/parkingrecords/in',
                    method: 'patch',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        vehicleId,
                        locationId
                    }
                })
                console.log({ data })
                this.swal('Tapped in')
            } catch (error) {
                console.log(error, '<<<<')
            }
        },
        async tapoutFunc(vehicleId, locationId) {
            try {
                const { data } = await axios({
                    url: baseURL + '/admin/parkingrecords/out',
                    method: 'patch',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        vehicleId,
                        locationId
                    }
                })
                this.swal('Tapped out')
            } catch (error) {
                console.log(error)
            }
        },
        selectLocationFunc(locationId) {
            this.selectedLocations = locationId
        },
        async getLocationFunc() {
            try {
                const { data } = await axios({
                    url: baseURL + '/locations',
                    method: 'get',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                console.log(data, "<<<<")
                this.availableLocations = data
            } catch (error) {
                console.log(error)
            }
        }
    }
})