<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Configuracion</h1>
      <p class="mt-2 text-gray-600">Configuracion general del gimnasio</p>
    </div>

    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Datos del Gimnasio</h2>
      </template>

      <div class="text-center py-12 text-gray-500">
        <p>Módulo de configuracion</p>
        <p class="text-sm mt-2">Funcionalidad en desarrollo</p>
      </div>

      <template #footer>
        <BaseButton variant="primary">Guardar Cambios</BaseButton>
      </template>
    </BaseCard>
  </div>
</template>
