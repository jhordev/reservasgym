<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { IconUsers, IconCreditCard, IconCash, IconTrendingUp } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
      <p class="mt-2 text-gray-600">Resumen general del gimnasio</p>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Usuarios Activos</p>
            <p class="text-2xl font-bold text-gray-900">156</p>
            <p class="text-xs text-green-600 mt-1">+12 este mes</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <IconUsers class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Membresías Activas</p>
            <p class="text-2xl font-bold text-gray-900">142</p>
            <p class="text-xs text-green-600 mt-1">+8 este mes</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <IconCreditCard class="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Ingresos del Mes</p>
            <p class="text-2xl font-bold text-gray-900">S/. 18,450</p>
            <p class="text-xs text-green-600 mt-1">+15% vs mes anterior</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
            <IconCash class="h-6 w-6 text-green-600" />
          </div>
        </div>
      </BaseCard>

      <BaseCard padding="md" hover>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Asistencias Hoy</p>
            <p class="text-2xl font-bold text-gray-900">68</p>
            <p class="text-xs text-gray-600 mt-1">Promedio: 65/día</p>
          </div>
          <div class="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <IconTrendingUp class="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Accesos Rápidos -->
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Accesos Rápidos</h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RouterLink
          to="/admin/usuarios"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
        >
          <IconUsers class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="font-semibold text-gray-900">Usuarios</p>
        </RouterLink>

        <RouterLink
          to="/admin/membresias"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
        >
          <IconCreditCard class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="font-semibold text-gray-900">Membresías</p>
        </RouterLink>

        <RouterLink
          to="/admin/pagos"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
        >
          <IconCash class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="font-semibold text-gray-900">Pagos</p>
        </RouterLink>

        <RouterLink
          to="/admin/asistencias"
          class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
        >
          <IconTrendingUp class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="font-semibold text-gray-900">Asistencias</p>
        </RouterLink>
      </div>
    </BaseCard>
  </div>
</template>
