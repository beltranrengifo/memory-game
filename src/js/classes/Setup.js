import Modal from '@/js/classes/Modal'
import axios from 'axios'
import { getUser, getLocation, getGameLevel } from '@/js/utils/modal-templates'
import { geolocationUrl } from '@/js/utils/locationiq'

export default class Setup {
  constructor () {
    this.modal = new Modal()
    this.modal.showModal()
    this.user = null
    this.userLocation = null
    this.level = null
  }

  getUser () {
    return new Promise(resolve => {
      this.modal.setContent(getUser())
      const button = this.modal.modalBody.querySelector('#user-modal .button')
      button.addEventListener('click', () => {
        const value = this.modal.modalBody.querySelector('#input-user').value
        if (value) {
          this.user = this.modal.modalBody.querySelector('#input-user').value
          this.modal.deleteContent()
          resolve(this.user)
        } else {
          button.innerText = 'Please, type your name'
        }
      })
    })
  }

  getUserLocation () {
    return new Promise(resolve => {
      this.modal.setContent(getLocation())
      const buttons = this.modal.modalBody.querySelectorAll('#location-modal .button')
      Array.from(buttons).forEach(button => {
        button.addEventListener('click', event => {
          if (event.target.value) {
            this.modal.showLoader()
            navigator.geolocation.getCurrentPosition(
              position => {
                axios.get(geolocationUrl(position.coords.latitude, position.coords.longitude))
                  .then(data => {
                    this.userLocation = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      geocode: data.data
                    }
                    this.modal.hideLoader()
                    resolve(this.userLocation)
                  })
              },
              error => {
                this.userLocation = false
                console.log(error)
                resolve(this.userLocation)
              }
            )
          } else {
            this.userLocation = false
          }
        })
      })
    })
  }

  getGameLevel () {
    return new Promise(resolve => {
      this.modal.setContent(getGameLevel(this.user, this.userLocation && this.userLocation.geocode.address.city))
      const buttons = this.modal.modalBody.querySelectorAll('#level-modal button.levels__level')
      Array.from(buttons).forEach(button => {
        button.addEventListener('click', event => {
          this.level = parseInt(event.target.value)
          setTimeout(() => this.modal.destroyModal(), 100)
          resolve(this.getGameConfig())
        })
      })
    })
  }

  getGameConfig () {
    return {
      user: this.user,
      userLocation: this.userLocation,
      level: this.level
    }
  }
}
