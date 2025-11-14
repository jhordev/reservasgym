<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Gestión de Membresías</h1>
        <p class="mt-2 text-gray-600">Administrar membresías activas</p>
      </div>
      <BaseButton variant="primary">Asignar Membresía</BaseButton>
    </div>

    <BaseCard>
      <div class="text-center py-12 text-gray-500">
        <p>Módulo de gestión de membresías</p>
        <p class="text-sm mt-2">Funcionalidad en desarrollo</p>
      </div>
    </BaseCard>
  </div>
</template>
