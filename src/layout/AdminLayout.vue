<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import {
  IconDashboard,
  IconUsers,
  IconCreditCard,
  IconCalendar,
  IconCash,
  IconUserCheck,
  IconBarbell,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconX,
  IconChevronDown
} from '@tabler/icons-vue'

const router = useRouter()
const { userProfile, logout, isSuperAdmin, isAdmin } = useAuth()

const sidebarOpen = ref(true)
const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: IconDashboard, roles: ['admin', 'superadmin', 'recepcion'] },
  { name: 'Usuarios', path: '/admin/usuarios', icon: IconUsers, roles: ['admin', 'superadmin', 'recepcion'] },
  { name: 'Membresías', path: '/admin/membresias', icon: IconCreditCard, roles: ['admin', 'superadmin', 'recepcion'] },
  { name: 'Pagos', path: '/admin/pagos', icon: IconCash, roles: ['admin', 'superadmin', 'recepcion'] },
  { name: 'Clases', path: '/admin/clases', icon: IconCalendar, roles: ['admin', 'superadmin'] },
  { name: 'Asistencias', path: '/admin/asistencias', icon: IconUserCheck, roles: ['admin', 'superadmin', 'recepcion'] },
  { name: 'Rutinas', path: '/admin/rutinas', icon: IconBarbell, roles: ['admin', 'superadmin'] },
  { name: 'Reportes', path: '/admin/reportes', icon: IconChartBar, roles: ['admin', 'superadmin'] },
  { name: 'Configuración', path: '/admin/configuracion', icon: IconSettings, roles: ['superadmin'] }
]

// Filtrar menú según rol
const filteredMenu = menuItems.filter(item =>
  item.roles.includes(userProfile.value?.role)
)

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar Desktop -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 hidden lg:block',
        sidebarOpen ? 'w-64' : 'w-20'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 grid place-items-center shadow-sm flex-shrink-0">
            <IconBarbell class="h-6 w-6 text-white" />
          </div>
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <h1 v-if="sidebarOpen" class="text-xl font-bold text-gray-900">GymReservas</h1>
          </Transition>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1">
        <RouterLink
          v-for="item in filteredMenu"
          :key="item.path"
          :to="item.path"
          :title="!sidebarOpen ? item.name : ''"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors group"
          active-class="bg-primary-50 text-primary-600 font-semibold"
        >
          <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <span v-if="sidebarOpen">{{ item.name }}</span>
          </Transition>
        </RouterLink>
      </nav>

      <!-- User Section -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div :class="['flex items-center gap-3', !sidebarOpen && 'justify-center']">
          <div class="h-10 w-10 rounded-full bg-primary-100 grid place-items-center flex-shrink-0">
            <span class="text-sm font-semibold text-primary-700">
              {{ userProfile?.nombre?.charAt(0) }}
            </span>
          </div>
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="sidebarOpen" class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ userProfile?.nombre }}</p>
              <p class="text-xs text-gray-500 capitalize">{{ userProfile?.role }}</p>
            </div>
          </Transition>
        </div>

        <button
          v-if="sidebarOpen"
          @click="handleLogout"
          class="mt-3 flex items-center gap-3 w-full px-4 py-2 rounded-lg text-error hover:bg-red-50 transition-colors text-sm"
        >
          <IconLogout class="h-5 w-5" />
          <span>Cerrar sesión</span>
        </button>
        <button
          v-else
          @click="handleLogout"
          class="mt-3 w-full p-2 rounded-lg text-error hover:bg-red-50 transition-colors"
          title="Cerrar sesión"
        >
          <IconLogout class="h-5 w-5 mx-auto" />
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div :class="['transition-all duration-300', sidebarOpen ? 'lg:ml-64' : 'lg:ml-20']">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Toggle Sidebar Button (Desktop) -->
            <button
              @click="toggleSidebar"
              class="hidden lg:block p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <IconMenu2 class="h-6 w-6" />
            </button>

            <!-- Mobile Header -->
            <div class="flex lg:hidden items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 grid place-items-center shadow-sm">
                <IconBarbell class="h-6 w-6 text-white" />
              </div>
              <h1 class="text-xl font-bold text-gray-900">GymReservas</h1>
            </div>

            <!-- Right Side -->
            <div class="flex items-center gap-4">
              <!-- User info (Desktop) -->
              <div class="hidden lg:flex items-center gap-3">
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900">{{ userProfile?.nombre }}</p>
                  <p class="text-xs text-gray-500 capitalize">{{ userProfile?.role }}</p>
                </div>
              </div>

              <!-- Mobile menu button -->
              <button
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <IconMenu2 v-if="!mobileMenuOpen" class="h-6 w-6" />
                <IconX v-else class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <nav class="px-4 py-4 space-y-1">
            <RouterLink
              v-for="item in filteredMenu"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              active-class="bg-primary-50 text-primary-600 font-semibold"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
            </RouterLink>

            <div class="border-t border-gray-200 pt-3 mt-3">
              <button
                @click="handleLogout"
                class="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-error hover:bg-red-50 transition-colors"
              >
                <IconLogout class="h-5 w-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </nav>
        </div>
      </Transition>

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
