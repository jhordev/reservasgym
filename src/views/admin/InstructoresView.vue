<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Gestión de Instructores</h1>
        <p class="mt-2 text-gray-600">Administrar instructores y sus clases</p>
      </div>
      <BaseButton variant="primary">Nuevo Instructor</BaseButton>
    </div>

    <BaseCard>
      <div class="text-center py-12 text-gray-500">
        <p>Módulo de gestión de instructores</p>
        <p class="text-sm mt-2">Funcionalidad en desarrollo</p>
      </div>
    </BaseCard>
  </div>
</template>
