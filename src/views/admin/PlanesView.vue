<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Planes de Membresía</h1>
        <p class="mt-2 text-gray-600">Configurar tipos de planes</p>
      </div>
      <BaseButton variant="primary">Nuevo Plan</BaseButton>
    </div>

    <BaseCard>
      <div class="text-center py-12 text-gray-500">
        <p>Módulo de planes de membresía</p>
        <p class="text-sm mt-2">Funcionalidad en desarrollo</p>
      </div>
    </BaseCard>
  </div>
</template>
