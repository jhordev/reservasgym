import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
import { app } from './firebase'

const storage = getStorage(app)

// Función para subir un archivo
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return {
      path: snapshot.ref.fullPath,
      url: downloadURL
    }
  } catch (error) {
    throw error
  }
}

// Función para obtener la URL de descarga de un archivo
export const getFileURL = async (path) => {
  try {
    const storageRef = ref(storage, path)
    return await getDownloadURL(storageRef)
  } catch (error) {
    throw error
  }
}

// Función para eliminar un archivo
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
    return true
  } catch (error) {
    throw error
  }
}

// Función para listar archivos en una carpeta
export const listFiles = async (folderPath) => {
  try {
    const storageRef = ref(storage, folderPath)
    const res = await listAll(storageRef)
    const items = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        return {
          name: itemRef.name,
          path: itemRef.fullPath,
          url
        }
      })
    )
    return items
  } catch (error) {
    throw error
  }
}

export { storage }