import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '../constant'

export const useParkingStore = defineStore('parking', {
  state: () => {
    return {
      parkingRecords: []
    }
  },
  actions: {
    async generateQR(vehicleId) {
      try {
        const { data } = await axios({
          url: baseUrl + '/parkingrecords',
          method: 'post',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            vehicleId
          }
        })
        const head = Math.floor(Math.random() * 10 + 1)
        const tail = Math.floor(Math.random() * 10 + 1)
        const code = `${head}-${vehicleId}-${tail}`

        console.log({ data, code }, '<<<<')
        return code
      } catch (err) {
        console.log(err)
      }
    },
    async fetchParkirRecord() {
      try {
        const { data } = await axios({
          url: baseUrl + '/parkingrecords',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
        this.parkingRecords = data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
