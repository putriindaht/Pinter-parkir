import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = 'http://localhost:4900'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

export const useVehicleStore = defineStore('vehicle', {
  state: () => {
    return {
      vehicles: [],
      newVehicle: {}
    }
  },
  actions: {
    async addVehicle(nickname, licenseNumber, brand, color) {
      const { data } = await axios({
        url: baseUrl + '/vehicles',
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: { nickname, licenseNumber, brand, color }
      })
      this.newVehicle = data
      this.router.push({ path: '/parkingVehicle' })
      try {
      } catch (err) {
        console.log(err.response.data.message)
        this.showError(err.response.data.message)
      }
    },
    async fetchVehicle() {
      try {
        const { data } = await axios({
          url: baseUrl + '/vehicles',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.vehicles = data
      } catch (err) {
        console.log(err)
      }
    },
    async deleteVehicle(id) {
      try {
        const { data } = await axios({
          url: baseUrl + '/vehicles/' + id,
          method: 'delete',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.fetchVehicle()
      } catch (err) {
        console.log(err.response.data.message)
        this.showError(err.response.data.message)
      }
    }
  }
})
