<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import {
  IconHome,
  IconCalendar,
  IconCreditCard,
  IconUser,
  IconBarbell,
  IconChartLine,
  IconLogout,
  IconMenu2,
  IconX
} from '@tabler/icons-vue'

const router = useRouter()
const { userProfile, logout } = useAuth()

const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'Dashboard', path: '/user/dashboard', icon: IconHome },
  { name: 'Mi Membresía', path: '/user/membresia', icon: IconCreditCard },
  { name: 'Reservar Clases', path: '/user/clases', icon: IconCalendar },
  { name: 'Mi Rutina', path: '/user/rutina', icon: IconBarbell },
  { name: 'Mi Progreso', path: '/user/progreso', icon: IconChartLine },
  { name: 'Mi Perfil', path: '/user/perfil', icon: IconUser }
]

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 grid place-items-center shadow-sm">
              <IconBarbell class="h-6 w-6 text-white" />
            </div>
            <h1 class="text-xl font-bold text-gray-900">GymReservas</h1>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1">
            <RouterLink
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
              active-class="bg-primary-50 text-primary-600 font-semibold"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>

          <!-- User Menu -->
          <div class="hidden md:flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">{{ userProfile?.nombre }}</p>
              <p class="text-xs text-gray-500">Cliente</p>
            </div>

            <div class="h-10 w-10 rounded-full bg-primary-100 grid place-items-center">
              <span class="text-sm font-semibold text-primary-700">
                {{ userProfile?.nombre?.charAt(0) }}
              </span>
            </div>

            <button
              @click="handleLogout"
              class="p-2 text-gray-600 hover:text-error hover:bg-red-50 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <IconLogout class="h-5 w-5" />
            </button>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <IconMenu2 v-if="!mobileMenuOpen" class="h-6 w-6" />
            <IconX v-else class="h-6 w-6" />
          </button>
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
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-b border-gray-200 shadow-lg">
        <nav class="px-4 py-4 space-y-1">
          <RouterLink
            v-for="item in menuItems"
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

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>
