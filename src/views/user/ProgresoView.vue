<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { IconTrendingUp } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mi Progreso</h1>
      <p class="mt-2 text-gray-600">Seguimiento de tu evolución fisica</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseCard padding="md">
        <div class="text-center">
          <IconTrendingUp class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="text-sm text-gray-600 mb-1">Peso Actual</p>
          <p class="text-3xl font-bold text-gray-900">75 kg</p>
          <p class="text-xs text-green-600 mt-1">-3 kg del mes pasado</p>
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <div class="text-center">
          <IconTrendingUp class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="text-sm text-gray-600 mb-1">IMC</p>
          <p class="text-3xl font-bold text-gray-900">23.5</p>
          <p class="text-xs text-green-600 mt-1">Normal</p>
        </div>
      </BaseCard>

      <BaseCard padding="md">
        <div class="text-center">
          <IconTrendingUp class="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p class="text-sm text-gray-600 mb-1">Grasa Corporal</p>
          <p class="text-3xl font-bold text-gray-900">18%</p>
          <p class="text-xs text-green-600 mt-1">-2% del mes pasado</p>
        </div>
      </BaseCard>
    </div>

    <!-- Historial -->
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Historial de Mediciones</h2>
      </template>

      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div>
            <p class="font-semibold text-gray-900">01 Nov 2025</p>
            <p class="text-sm text-gray-600">Peso: 75kg | IMC: 23.5 | Grasa: 18%</p>
          </div>
        </div>
        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div>
            <p class="font-semibold text-gray-900">01 Oct 2025</p>
            <p class="text-sm text-gray-600">Peso: 78kg | IMC: 24.5 | Grasa: 20%</p>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
