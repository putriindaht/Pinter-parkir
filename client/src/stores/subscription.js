import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '../constant'

export const useSubscriptionStore = defineStore('subscription', {
  state: () => {
    return {
      subscription: []
    }
  },
  actions: {
    async fetchSubscription() {
      try {
        const { data } = await axios({
          url: baseUrl + '/subscriptions',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
        this.subscription = data
      } catch (err) {
        console.log(err)
      }
    }
  }
})
