import * as firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAvU2osvjRG7ZRa3xfQ75uxEfj1bLAPaPE',
  authDomain: 'onesait-memory-game.firebaseapp.com',
  databaseURL: 'https://onesait-memory-game.firebaseio.com',
  projectId: 'onesait-memory-game',
  storageBucket: 'onesait-memory-game.appspot.com',
  messagingSenderId: '854342630585',
  appId: '1:854342630585:web:7d0a061970d83994c9af68'
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

export {
  database
}
