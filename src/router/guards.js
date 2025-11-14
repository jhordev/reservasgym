import { getCurrentAuthUser } from '@/config/firebase/auth'
import { getUserByUid } from '@/config/firebase/users'

/**
 * Guard para rutas que requieren autenticación
 * Redirige a /login si el usuario no está autenticado
 */
export async function requireAuth(to, from, next) {
  const user = getCurrentAuthUser()

  if (!user) {
    // Usuario no autenticado, redirigir a login
    next({
      path: '/login',
      query: { redirect: to.fullPath } // Guardar la ruta a la que intentaba acceder
    })
  } else {
    next()
  }
}

/**
 * Guard para rutas que requieren roles específicos
 * @param {string[]} allowedRoles - Array de roles permitidos
 */
export function requireRole(allowedRoles) {
  return async (to, from, next) => {
    const user = getCurrentAuthUser()

    if (!user) {
      // Usuario no autenticado
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }

    try {
      // Obtener el perfil del usuario desde Firestore
      const profile = await getUserByUid(user.uid)

      if (!profile) {
        // Perfil no encontrado
        return next({
          path: '/login',
          query: { error: 'profile_not_found' }
        })
      }

      // Verificar si el usuario tiene alguno de los roles permitidos
      if (allowedRoles.includes(profile.role)) {
        next()
      } else {
        // Usuario autenticado pero sin el rol necesario
        // Redirigir a su dashboard según su rol
        const defaultRoutes = {
          cliente: '/user/dashboard',
          instructor: '/instructor/clases',
          recepcion: '/admin/dashboard',
          admin: '/admin/dashboard',
          superadmin: '/admin/dashboard'
        }

        next({
          path: defaultRoutes[profile.role] || '/',
          query: { error: 'unauthorized' }
        })
      }
    } catch (error) {
      console.error('Error al verificar rol:', error)
      next({
        path: '/login',
        query: { error: 'auth_error' }
      })
    }
  }
}

/**
 * Guard para rutas de guest (solo accesibles si NO estás autenticado)
 * Por ejemplo: login, register
 */
export async function requireGuest(to, from, next) {
  const user = getCurrentAuthUser()

  if (user) {
    // Usuario ya autenticado, obtener su perfil y redirigir a su dashboard
    try {
      const profile = await getUserByUid(user.uid)

      const defaultRoutes = {
        cliente: '/user/dashboard',
        instructor: '/instructor/clases',
        recepcion: '/admin/dashboard',
        admin: '/admin/dashboard',
        superadmin: '/admin/dashboard'
      }

      next(defaultRoutes[profile?.role] || '/')
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      next('/')
    }
  } else {
    next()
  }
}

/**
 * Guard específico para admin/superadmin
 */
export const requireAdmin = requireRole(['admin', 'superadmin'])

/**
 * Guard específico para superadmin
 */
export const requireSuperAdmin = requireRole(['superadmin'])

/**
 * Guard para staff (recepción, admin, superadmin)
 */
export const requireStaff = requireRole(['recepcion', 'admin', 'superadmin'])

/**
 * Guard para instructor
 */
export const requireInstructor = requireRole(['instructor'])

/**
 * Guard para cliente
 */
export const requireCliente = requireRole(['cliente'])
