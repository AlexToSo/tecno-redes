import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC3tFEjC1ubtsa-7Ho0TYP1vAILKwxY714',
  authDomain: 'tecno-redes.firebaseapp.com',
  projectId: 'tecno-redes',
  storageBucket: 'tecno-redes.appspot.com',
  messagingSenderId: '690454372038',
  appId: '1:690454372038:web:8c1fcbbf189cf9312241c7'
}
// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore()
