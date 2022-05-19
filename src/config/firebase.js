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

const secondaryAppConfig = {
  apiKey: 'AIzaSyCPwYP5mBLfQECGXv20cs2EV7RPLA6or9o',
  authDomain: 'nama-product.firebaseapp.com',
  projectId: 'nama-product',
  storageBucket: 'nama-product.appspot.com',
  messagingSenderId: '1098507387881',
  appId: '1:1098507387881:web:3a94d85d60551291464178',
  measurementId: 'G-LE43H1ZQEG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const secondaryApp = initializeApp(secondaryAppConfig, 'secondary')
const firestore = getFirestore(app)
const storage = getStorage(app)
const secFirestore = getFirestore(secondaryApp)
const secStorage = getStorage(secondaryApp)

export { firestore, storage, secFirestore, secStorage }
