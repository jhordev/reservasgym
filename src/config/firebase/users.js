import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './firestore'

/**
 * Obtener usuario por UID
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<Object|null>} Usuario o null
 */
export async function getUserByUid(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return { uid: userDoc.id, ...userDoc.data() }
    }
    return null
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    throw error
  }
}

/**
 * Obtener usuario por email
 * @param {string} email - Email del usuario
 * @returns {Promise<Object|null>} Usuario o null
 */
export async function getUserByEmail(email) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0]
      return { uid: userDoc.id, ...userDoc.data() }
    }
    return null
  } catch (error) {
    console.error('Error al buscar usuario por email:', error)
    throw error
  }
}

/**
 * Crear perfil de usuario en Firestore
 * @param {string} uid - Firebase Auth UID
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<void>}
 */
export async function createUserProfile(uid, userData) {
  try {
    const userRef = doc(db, 'users', uid)
    await setDoc(userRef, {
      uid,
      email: userData.email,
      role: userData.role || 'cliente',

      // Datos personales
      nombre: userData.nombre || '',
      apellidos: userData.apellidos || '',
      dni: userData.dni || '',
      telefono: userData.telefono || '',
      foto_perfil: userData.foto_perfil || '',
      fecha_nacimiento: userData.fecha_nacimiento || null,
      direccion: userData.direccion || '',
      genero: userData.genero || '',

      // Estado
      estado: 'activo',

      // Metadata
      fecha_registro: serverTimestamp(),
      ultima_actualizacion: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error al crear perfil de usuario:', error)
    throw error
  }
}

/**
 * Actualizar perfil de usuario
 * @param {string} uid - Firebase Auth UID
 * @param {Object} updates - Campos a actualizar
 * @returns {Promise<void>}
 */
export async function updateUserProfile(uid, updates) {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      ...updates,
      ultima_actualizacion: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error al actualizar perfil de usuario:', error)
    throw error
  }
}

/**
 * Verificar si el usuario tiene un rol específico
 * @param {string} uid - Firebase Auth UID
 * @param {string|string[]} allowedRoles - Rol o array de roles permitidos
 * @returns {Promise<boolean>}
 */
export async function hasRole(uid, allowedRoles) {
  try {
    const user = await getUserByUid(uid)
    if (!user) return false

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
    return roles.includes(user.role)
  } catch (error) {
    console.error('Error al verificar rol:', error)
    return false
  }
}

/**
 * Verificar si el usuario es admin o superadmin
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<boolean>}
 */
export async function isAdmin(uid) {
  return hasRole(uid, ['admin', 'superadmin'])
}

/**
 * Verificar si el usuario es superadmin
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<boolean>}
 */
export async function isSuperAdmin(uid) {
  return hasRole(uid, 'superadmin')
}

/**
 * Obtener todos los usuarios (con filtros opcionales)
 * @param {Object} filters - Filtros opcionales
 * @returns {Promise<Array>}
 */
export async function getAllUsers(filters = {}) {
  try {
    let q = collection(db, 'users')

    // Aplicar filtros
    const constraints = []
    if (filters.role) {
      constraints.push(where('role', '==', filters.role))
    }
    if (filters.estado) {
      constraints.push(where('estado', '==', filters.estado))
    }

    if (constraints.length > 0) {
      q = query(q, ...constraints)
    }

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    throw error
  }
}

/**
 * Cambiar el rol de un usuario
 * @param {string} uid - Firebase Auth UID
 * @param {string} newRole - Nuevo rol
 * @returns {Promise<void>}
 */
export async function changeUserRole(uid, newRole) {
  const validRoles = ['superadmin', 'admin', 'recepcion', 'instructor', 'cliente']
  if (!validRoles.includes(newRole)) {
    throw new Error(`Rol inválido: ${newRole}`)
  }

  return updateUserProfile(uid, { role: newRole })
}

/**
 * Activar o desactivar usuario
 * @param {string} uid - Firebase Auth UID
 * @param {string} estado - 'activo' | 'inactivo' | 'suspendido'
 * @returns {Promise<void>}
 */
export async function changeUserStatus(uid, estado) {
  const validStates = ['activo', 'inactivo', 'suspendido']
  if (!validStates.includes(estado)) {
    throw new Error(`Estado inválido: ${estado}`)
  }

  return updateUserProfile(uid, { estado })
}
