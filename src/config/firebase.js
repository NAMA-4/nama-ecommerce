import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDqAdPW325ed6LrW9lTPwDjIcn820gD9dM',
  authDomain: 'nama-ecommerce-669de.firebaseapp.com',
  projectId: 'nama-ecommerce-669de',
  storageBucket: 'nama-ecommerce-669de.appspot.com',
  messagingSenderId: '617057406473',
  appId: '1:617057406473:web:87b5d995ef966b0f70f2d8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore()
const storage = getStorage(app)
export { firestore, storage }
