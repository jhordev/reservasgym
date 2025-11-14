<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { IconBarbell } from '@tabler/icons-vue'

const clases = [
  { nombre: 'Spinning', horario: 'Lun, Mié, Vie - 18:00', cupo: 12, instructor: 'Carlos Pérez', nivel: 'Intermedio' },
  { nombre: 'Funcional', horario: 'Mar, Jue - 19:00', cupo: 15, instructor: 'Ana García', nivel: 'Todos' },
  { nombre: 'Yoga', horario: 'Lun, Mié - 07:00', cupo: 10, instructor: 'María López', nivel: 'Principiante' }
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Reservar Clases</h1>
      <p class="mt-2 text-gray-600">Encuentra y reserva tus clases favoritas</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BaseCard v-for="clase in clases" :key="clase.nombre" hover>
        <div class="flex items-start gap-4">
          <div class="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
            <IconBarbell class="h-7 w-7 text-primary-600" />
          </div>
          <div class="flex-1">
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-lg font-bold text-gray-900">{{ clase.nombre }}</h3>
              <BaseBadge variant="primary">{{ clase.nivel }}</BaseBadge>
            </div>
            <p class="text-sm text-gray-600 mb-1">{{ clase.horario }}</p>
            <p class="text-sm text-gray-600 mb-1">Instructor: {{ clase.instructor }}</p>
            <p class="text-sm text-gray-600">Cupo: {{ clase.cupo }} personas</p>
          </div>
        </div>
        <template #footer>
          <BaseButton variant="primary" full-width>Reservar</BaseButton>
        </template>
      </BaseCard>
    </div>
  </div>
</template>
