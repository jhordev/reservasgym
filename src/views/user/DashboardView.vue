<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import {
  IconCreditCard,
  IconCalendar,
  IconBarbell,
  IconTrendingUp
} from '@tabler/icons-vue'

const { userProfile } = useAuth()

// Datos de ejemplo (después se obtendrán de Firebase)
const membershipStatus = ref('activa')
const diasRestantes = ref(15)
const proximasClases = ref([
  { nombre: 'Spinning', fecha: '2025-11-15', hora: '18:00' },
  { nombre: 'Funcional', fecha: '2025-11-16', hora: '19:00' }
])
</script>

<template>
  <div class="space-y-6">
    <!-- Título -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">
        ¡Bienvenido, {{ userProfile?.nombre }}! 👋
      </h1>
      <p class="mt-2 text-gray-600">
        Este es tu panel principal de GymReservas
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Membresía -->
      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Membresía</p>
            <BaseBadge :variant="membershipStatus === 'activa' ? 'success' : 'error'" dot>
              {{ membershipStatus }}
            </BaseBadge>
          </div>
          <div class="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <IconCreditCard class="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </BaseCard>

      <!-- Días restantes -->
      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Días restantes</p>
            <p class="text-2xl font-bold text-gray-900">{{ diasRestantes }}</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <IconCalendar class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </BaseCard>

      <!-- Clases reservadas -->
      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Clases reservadas</p>
            <p class="text-2xl font-bold text-gray-900">{{ proximasClases.length }}</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
            <IconBarbell class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </BaseCard>

      <!-- Progreso -->
      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Asistencias (mes)</p>
            <p class="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <IconTrendingUp class="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Proximas Clases -->
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Proximas Clases</h2>
      </template>

      <div v-if="proximasClases.length > 0" class="space-y-3">
        <div
          v-for="(clase, index) in proximasClases"
          :key="index"
          class="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <IconBarbell class="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ clase.nombre }}</p>
              <p class="text-sm text-gray-600">{{ clase.fecha }} - {{ clase.hora }}</p>
            </div>
          </div>
          <BaseBadge variant="primary">Reservada</BaseBadge>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        <p>No tienes clases reservadas</p>
        <RouterLink to="/user/clases" class="text-primary-600 hover:text-primary-700 font-semibold mt-2 inline-block">
          Reservar ahora
        </RouterLink>
      </div>
    </BaseCard>

    <!-- Accesos Rápidos -->
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Accesos Rápidos</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RouterLink
          to="/user/clases"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
        >
          <IconCalendar class="h-8 w-8 text-primary-600 mb-2" />
          <p class="font-semibold text-gray-900">Reservar Clases</p>
          <p class="text-sm text-gray-600 mt-1">Ver horarios disponibles</p>
        </RouterLink>

        <RouterLink
          to="/user/membresia"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
        >
          <IconCreditCard class="h-8 w-8 text-primary-600 mb-2" />
          <p class="font-semibold text-gray-900">Mi Membresía</p>
          <p class="text-sm text-gray-600 mt-1">Ver detalles y renovar</p>
        </RouterLink>

        <RouterLink
          to="/user/progreso"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
        >
          <IconTrendingUp class="h-8 w-8 text-primary-600 mb-2" />
          <p class="font-semibold text-gray-900">Mi Progreso</p>
          <p class="text-sm text-gray-600 mt-1">Ver mi evolución</p>
        </RouterLink>
      </div>
    </BaseCard>
  </div>
</template>
