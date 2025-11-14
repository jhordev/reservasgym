<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { IconBarbell } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mi Rutina</h1>
      <p class="mt-2 text-gray-600">Rutina de ejercicios asignada</p>
    </div>

    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Rutina de Fuerza - Semana 1</h2>
      </template>

      <div class="space-y-4">
        <!-- Lunes -->
        <div class="border-l-4 border-primary-500 pl-4">
          <h3 class="font-bold text-gray-900 mb-2">Lunes - Pecho y Tríceps</h3>
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Press de banca - 4x12</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Press inclinado - 3x12</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Fondos - 3x15</span>
            </div>
          </div>
        </div>

        <!-- Miércoles -->
        <div class="border-l-4 border-primary-500 pl-4">
          <h3 class="font-bold text-gray-900 mb-2">Miércoles - Espalda y Bíceps</h3>
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Dominadas - 4x10</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Remo con barra - 4x12</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Curl con mancuernas - 3x12</span>
            </div>
          </div>
        </div>

        <!-- Viernes -->
        <div class="border-l-4 border-primary-500 pl-4">
          <h3 class="font-bold text-gray-900 mb-2">Viernes - Pierna</h3>
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Sentadillas - 4x12</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Peso muerto - 4x10</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <IconBarbell class="h-4 w-4 text-gray-400" />
              <span class="text-gray-700">Zancadas - 3x12</span>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
