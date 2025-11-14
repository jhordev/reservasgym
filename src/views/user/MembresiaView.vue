<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { IconCreditCard, IconCalendar, IconCheck } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <!-- Título -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mi Membresía</h1>
      <p class="mt-2 text-gray-600">Detalles de tu plan actual</p>
    </div>

    <!-- Membresía Activa -->
    <BaseCard padding="lg">
      <div class="flex items-start justify-between mb-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <h2 class="text-2xl font-bold text-gray-900">Plan Full</h2>
            <BaseBadge variant="success" dot>Activa</BaseBadge>
          </div>
          <p class="text-gray-600">Membresía mensual</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Vence en</p>
          <p class="text-2xl font-bold text-primary-600">15 días</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p class="text-sm text-gray-600 mb-1">Fecha de inicio</p>
          <p class="font-semibold text-gray-900">01 Nov 2025</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-1">Fecha de vencimiento</p>
          <p class="font-semibold text-gray-900">30 Nov 2025</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-1">Precio</p>
          <p class="font-semibold text-gray-900">S/. 120.00</p>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-6">
        <h3 class="font-semibold text-gray-900 mb-3">Beneficios incluidos:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="flex items-center gap-2">
            <IconCheck class="h-5 w-5 text-green-600" />
            <span class="text-gray-700">Acceso ilimitado al gym</span>
          </div>
          <div class="flex items-center gap-2">
            <IconCheck class="h-5 w-5 text-green-600" />
            <span class="text-gray-700">Clases grupales ilimitadas</span>
          </div>
          <div class="flex items-center gap-2">
            <IconCheck class="h-5 w-5 text-green-600" />
            <span class="text-gray-700">Todas las áreas del gimnasio</span>
          </div>
          <div class="flex items-center gap-2">
            <IconCheck class="h-5 w-5 text-green-600" />
            <span class="text-gray-700">Rutinas personalizadas</span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <BaseButton variant="primary" full-width>
            Renovar Membresía
          </BaseButton>
          <BaseButton variant="outline" full-width>
            Ver Historial
          </BaseButton>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
