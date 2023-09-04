import { defineStore } from 'pinia'
import axios from 'axios'
import { baseUrl } from '../constant'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false
    }
  },
  actions: {
    async register(username, email, password) {
      try {
        const { data } = await axios({
          url: baseUrl + '/register',
          method: 'post',
          data: { username, email, password }
        })
        this.showSuccessNotif('success')
        this.router.push('/login')
      } catch (err) {
        console.log(err.response.data.message)
        this.showError(err.response.data.message)
      }
    },
    async login(email, password) {
      try {
        const { data } = await axios({
          url: baseUrl + '/login',
          method: 'post',
          data: { email, password }
        })
        const { access_token } = data
        localStorage.setItem('access_token', access_token)
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err.response.data.message)
        this.showError(err.response.data.message)
      }
    },
    logout() {
      localStorage.clear()
      this.isLogin = false
      this.router.push('/login')
    },
    setIsLogin() {
      if (localStorage.getItem('access_token')) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    async googleLogin(response) {
      try {
        const dataGlogin = await axios({
          url: baseUrl + '/glogin',
          method: 'POST',
          headers: { google_token: response.credential }
        })
        const token = dataGlogin.data.message
        this.isLogin = true
        localStorage.setItem('access_token', token)
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    showError(error) {
      $toast.error('Error: ' + error, {
        position: 'top-right',
        duration: 5000,
        dismissible: true
      })
    },
    showSuccessNotif(message) {
      $toast.success(message, {
        position: 'top-right',
        duration: 3000,
        dismissible: true
      })
    }
  }
})
