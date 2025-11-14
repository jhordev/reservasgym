<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import { IconHome } from '@tabler/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-600">404</h1>
      <h2 class="text-3xl font-bold text-gray-900 mt-4">Página no encontrada</h2>
      <p class="text-gray-600 mt-2 mb-8">
        Lo sentimos, la página que buscas no existe
      </p>
      <BaseButton variant="primary" @click="goHome">
        <IconHome class="h-5 w-5 mr-2" />
        Volver al inicio
      </BaseButton>
    </div>
  </div>
</template>
