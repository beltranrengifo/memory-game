import * as firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: 'onesait-memory-game',
  storageBucket: 'onesait-memory-game.appspot.com',
  messagingSenderId: '854342630585',
  appId: process.env.FIREBASE_APP_ID
}

console.log(process.env.FIREBASE_API_KEY)

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

export {
  database
}
