import { ref, computed, onMounted } from 'vue'
import { onAuthStateChange, logoutUser, getCurrentUserProfile } from '@/config/firebase/auth'
import { getUserByUid } from '@/config/firebase/users'

// Estado global compartido entre todas las instancias
const currentUser = ref(null)
const userProfile = ref(null)
const loading = ref(true)
const isAuthenticated = computed(() => currentUser.value !== null)

let unsubscribe = null

/**
 * Composable para manejar autenticación y permisos
 */
export function useAuth() {
  // Inicializar el listener de autenticación si aún no está activo
  const initAuth = () => {
    if (unsubscribe) return // Ya está inicializado

    unsubscribe = onAuthStateChange(async (firebaseUser) => {
      loading.value = true

      if (firebaseUser) {
        currentUser.value = firebaseUser

        // Obtener el perfil completo del usuario desde Firestore
        try {
          const profile = await getUserByUid(firebaseUser.uid)
          userProfile.value = profile
        } catch (error) {
          console.error('Error al cargar perfil del usuario:', error)
          userProfile.value = null
        }
      } else {
        currentUser.value = null
        userProfile.value = null
      }

      loading.value = false
    })
  }

  // Inicializar cuando el composable se monta
  onMounted(() => {
    initAuth()
  })

  // Si no está montado aún, inicializar inmediatamente
  if (!unsubscribe) {
    initAuth()
  }

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      await logoutUser()
      currentUser.value = null
      userProfile.value = null
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  /**
   * Recargar perfil del usuario
   */
  const reloadProfile = async () => {
    if (!currentUser.value) return

    try {
      const profile = await getUserByUid(currentUser.value.uid)
      userProfile.value = profile
    } catch (error) {
      console.error('Error al recargar perfil:', error)
      throw error
    }
  }

  // Computed properties para roles
  const userRole = computed(() => userProfile.value?.role || null)
  const isCliente = computed(() => userRole.value === 'cliente')
  const isInstructor = computed(() => userRole.value === 'instructor')
  const isRecepcion = computed(() => userRole.value === 'recepcion')
  const isAdmin = computed(() => userRole.value === 'admin')
  const isSuperAdmin = computed(() => userRole.value === 'superadmin')

  // Verificar si es admin o superior
  const isAdminOrAbove = computed(() =>
    isAdmin.value || isSuperAdmin.value
  )

  // Verificar si es staff (recepción, admin o superadmin)
  const isStaff = computed(() =>
    isRecepcion.value || isAdmin.value || isSuperAdmin.value
  )

  /**
   * Verificar si el usuario tiene un rol específico
   * @param {string|string[]} roles - Rol o array de roles
   * @returns {boolean}
   */
  const hasRole = (roles) => {
    if (!userRole.value) return false
    const allowedRoles = Array.isArray(roles) ? roles : [roles]
    return allowedRoles.includes(userRole.value)
  }

  /**
   * Verificar si el usuario tiene permiso
   * @param {string} permission - Permiso a verificar (ej: 'usuarios:crear')
   * @returns {boolean}
   */
  const hasPermission = (permission) => {
    if (!userRole.value) return false

    // SuperAdmin tiene todos los permisos
    if (isSuperAdmin.value) return true

    // Mapa de permisos por rol
    const permissions = {
      admin: [
        'usuarios:leer', 'usuarios:crear', 'usuarios:editar', 'usuarios:eliminar',
        'membresias:leer', 'membresias:crear', 'membresias:editar', 'membresias:eliminar',
        'pagos:leer', 'pagos:crear', 'pagos:editar',
        'clases:leer', 'clases:crear', 'clases:editar', 'clases:eliminar',
        'reservas:leer', 'reservas:crear', 'reservas:editar', 'reservas:eliminar',
        'asistencias:leer', 'asistencias:crear',
        'rutinas:leer', 'rutinas:crear', 'rutinas:editar', 'rutinas:eliminar',
        'progreso:leer', 'progreso:crear', 'progreso:editar',
        'reportes:leer',
        'configuracion:editar'
      ],
      recepcion: [
        'usuarios:leer', 'usuarios:crear', 'usuarios:editar',
        'membresias:leer', 'membresias:crear', 'membresias:editar',
        'pagos:leer', 'pagos:crear',
        'reservas:leer', 'reservas:crear', 'reservas:editar', 'reservas:eliminar',
        'asistencias:leer', 'asistencias:crear'
      ],
      instructor: [
        'clases:leer',
        'reservas:leer',
        'asistencias:crear',
        'rutinas:leer', 'rutinas:crear', 'rutinas:editar', 'rutinas:eliminar',
        'progreso:leer', 'progreso:crear', 'progreso:editar',
        'usuarios:leer' // Solo sus alumnos
      ],
      cliente: [
        'perfil:leer', 'perfil:editar',
        'membresias:leer',
        'pagos:leer',
        'clases:leer',
        'reservas:leer', 'reservas:crear', 'reservas:eliminar',
        'rutinas:leer',
        'progreso:leer'
      ]
    }

    const rolePermissions = permissions[userRole.value] || []
    return rolePermissions.includes(permission)
  }

  /**
   * Obtener la ruta de redirección según el rol
   * @returns {string}
   */
  const getDefaultRoute = () => {
    if (!userRole.value) return '/login'

    switch (userRole.value) {
      case 'superadmin':
      case 'admin':
      case 'recepcion':
        return '/admin/dashboard'
      case 'instructor':
        return '/instructor/clases'
      case 'cliente':
        return '/user/dashboard'
      default:
        return '/'
    }
  }

  return {
    // Estado
    currentUser,
    userProfile,
    loading,
    isAuthenticated,

    // Roles
    userRole,
    isCliente,
    isInstructor,
    isRecepcion,
    isAdmin,
    isSuperAdmin,
    isAdminOrAbove,
    isStaff,

    // Métodos
    logout,
    reloadProfile,
    hasRole,
    hasPermission,
    getDefaultRoute
  }
}
