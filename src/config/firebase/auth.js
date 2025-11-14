import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { app } from './app'
import { createUserProfile, getUserByUid } from './users'

const auth = getAuth(app)

// Función para registrar un nuevo usuario
export const registerUser = async (email, password, userData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Crear perfil en Firestore
    await createUserProfile(user.uid, {
      email,
      ...userData,
      role: userData.role || 'cliente' // Por defecto, los nuevos usuarios son clientes
    })

    return user
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

// Obtener usuario actual de Firebase Auth
export const getCurrentAuthUser = () => {
  return auth.currentUser
}

// Obtener perfil completo del usuario actual (Auth + Firestore)
export const getCurrentUserProfile = async () => {
  const authUser = getCurrentAuthUser()
  if (!authUser) return null

  try {
    const profile = await getUserByUid(authUser.uid)
    return profile
  } catch (error) {
    console.error('Error al obtener perfil del usuario:', error)
    return null
  }
}

export { auth }