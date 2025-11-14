import { createRouter, createWebHistory } from 'vue-router'
import {
  requireAuth,
  requireGuest,
  requireCliente,
  requireStaff,
  requireAdmin,
  requireSuperAdmin,
  requireInstructor
} from '../router/guards'

// Layouts
import ClientLayout from '../layout/ClientLayout.vue'
import AdminLayout from '../layout/AdminLayout.vue'
import HomeLayout from '../layout/HomeLayout.vue'

const routes = [
  // Rutas públicas
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue')
      }
    ]
  },

  // Rutas de autenticación (solo para invitados)
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    beforeEnter: requireGuest
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    beforeEnter: requireGuest
  },

  // Rutas de Cliente
  {
    path: '/user',
    component: ClientLayout,
    beforeEnter: requireCliente,
    children: [
      {
        path: 'dashboard',
        name: 'UserDashboard',
        component: () => import('../views/user/DashboardView.vue')
      },
      {
        path: 'membresia',
        name: 'UserMembresia',
        component: () => import('../views/user/MembresiaView.vue')
      },
      {
        path: 'pagos',
        name: 'UserPagos',
        component: () => import('../views/user/PagosView.vue')
      },
      {
        path: 'clases',
        name: 'UserClases',
        component: () => import('../views/user/ClasesView.vue')
      },
      {
        path: 'reservas',
        name: 'UserReservas',
        component: () => import('../views/user/ReservasView.vue')
      },
      {
        path: 'rutina',
        name: 'UserRutina',
        component: () => import('../views/user/RutinaView.vue')
      },
      {
        path: 'progreso',
        name: 'UserProgreso',
        component: () => import('../views/user/ProgresoView.vue')
      },
      {
        path: 'perfil',
        name: 'UserPerfil',
        component: () => import('../views/user/PerfilView.vue')
      }
    ]
  },

  // Rutas de Admin/Superadmin/Recepción
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireStaff,
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/DashboardView.vue')
      },
      {
        path: 'usuarios',
        name: 'AdminUsuarios',
        component: () => import('../views/admin/UsuariosView.vue')
      },
      {
        path: 'usuarios/:id',
        name: 'AdminUsuarioDetalle',
        component: () => import('../views/admin/UsuarioDetalleView.vue')
      },
      {
        path: 'membresias',
        name: 'AdminMembresias',
        component: () => import('../views/admin/MembresiasView.vue')
      },
      {
        path: 'planes',
        name: 'AdminPlanes',
        component: () => import('../views/admin/PlanesView.vue'),
        beforeEnter: requireAdmin
      },
      {
        path: 'pagos',
        name: 'AdminPagos',
        component: () => import('../views/admin/PagosView.vue')
      },
      {
        path: 'clases',
        name: 'AdminClases',
        component: () => import('../views/admin/ClasesView.vue'),
        beforeEnter: requireAdmin
      },
      {
        path: 'horarios',
        name: 'AdminHorarios',
        component: () => import('../views/admin/HorariosView.vue'),
        beforeEnter: requireAdmin
      },
      {
        path: 'instructores',
        name: 'AdminInstructores',
        component: () => import('../views/admin/InstructoresView.vue'),
        beforeEnter: requireAdmin
      },
      {
        path: 'asistencias',
        name: 'AdminAsistencias',
        component: () => import('../views/admin/AsistenciasView.vue')
      },
      {
        path: 'rutinas',
        name: 'AdminRutinas',
        component: () => import('../views/admin/RutinasView.vue'),
        beforeEnter: requireAdmin
      },
      {
        path: 'reportes',
        name: 'AdminReportes',
        component: () => import('../views/admin/ReportesView.vue'),
        beforeEnter: requireAdmin
      },
      {
        path: 'configuracion',
        name: 'AdminConfiguracion',
        component: () => import('../views/admin/ConfiguracionView.vue'),
        beforeEnter: requireSuperAdmin
      }
    ]
  },

  // Rutas de Instructor
  {
    path: '/instructor',
    component: AdminLayout, // Reutilizamos el layout admin
    beforeEnter: requireInstructor,
    children: [
      {
        path: 'clases',
        name: 'InstructorClases',
        component: () => import('../views/instructor/ClasesView.vue')
      },
      {
        path: 'alumnos',
        name: 'InstructorAlumnos',
        component: () => import('../views/instructor/AlumnosView.vue')
      },
      {
        path: 'rutinas',
        name: 'InstructorRutinas',
        component: () => import('../views/instructor/RutinasView.vue')
      }
    ]
  },

  // Ruta 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
