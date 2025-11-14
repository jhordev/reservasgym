<script setup>
import { useRoute } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'

const route = useRoute()
const userId = route.params.id
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Detalle de Usuario</h1>
      <p class="mt-2 text-gray-600">ID: {{ userId }}</p>
    </div>

    <BaseCard>
      <div class="text-center py-12 text-gray-500">
        <p>Detalle del usuario</p>
        <p class="text-sm mt-2">Funcionalidad en desarrollo</p>
      </div>
    </BaseCard>
  </div>
</template>
