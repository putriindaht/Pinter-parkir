import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '../constant'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

export const useTransactionStore = defineStore('transaction', {
  state: () => {
    return {
      transactions: []
    }
  },
  actions: {
    async finishTransaction(id) {
      try {
        const { data } = await axios({
          url: baseUrl + '/transactions/finish/' + id,
          method: 'patch',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchTransaction() {
      try {
        const { data } = await axios({
          url: baseUrl + '/transactions',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
        this.transactions = data
      } catch (err) {
        console.log(err)
      }
    },
    async handleCallback(subsId) {
      try {
        const { data } = await axios({
          url: baseUrl + '/transactions',
          method: 'post',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: { subsId }
        })
        console.log(data.token)

        const callback = this.finishTransaction

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            callback(result.order_id)
          },
          onPending: function (result) {
            console.log({ result })
            console.log('===PENDING===')
          },
          onError: function (result) {
            console.log({ result })
            console.log('===ERROR===')
          },
          onClose: function () {
            console.log('===CLOSED===')
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
})
