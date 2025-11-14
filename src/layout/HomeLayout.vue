<script setup>
import { IconBarbell } from '@tabler/icons-vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 grid place-items-center shadow-sm">
              <IconBarbell class="h-6 w-6 text-white" />
            </div>
            <h1 class="text-xl font-bold text-gray-900">GymReservas</h1>
          </RouterLink>

          <!-- Navigation -->
          <nav class="flex items-center gap-4">
            <RouterLink
              to="/login"
              class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold transition-colors"
            >
              Iniciar sesión
            </RouterLink>
            <RouterLink
              to="/register"
              class="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-colors"
            >
              Registrarse
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2025 GymReservas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
