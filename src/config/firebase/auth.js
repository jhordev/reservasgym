import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase'

const auth = getAuth(app)

// Función para registrar un nuevo usuario
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

// Observable para el estado de autenticación
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export { auth }