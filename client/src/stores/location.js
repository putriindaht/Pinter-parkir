import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '../constant'

export const useLocationStore = defineStore('location', {
  state: () => {
    return {
      locations: []
    }
  },
  actions: {
    async fetchLocations() {
      try {
        const { data } = await axios({
          url: baseUrl + '/locations',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.locations = data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
