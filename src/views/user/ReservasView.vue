<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { IconBarbell } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
      <p class="mt-2 text-gray-600">Clases que has reservado</p>
    </div>

    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Proximas Clases</h2>
      </template>

      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <IconBarbell class="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">Spinning</p>
              <p class="text-sm text-gray-600">15 Nov 2025 - 18:00</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <BaseBadge variant="success">Confirmada</BaseBadge>
            <BaseButton variant="danger" size="sm">Cancelar</BaseButton>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <IconBarbell class="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">Funcional</p>
              <p class="text-sm text-gray-600">16 Nov 2025 - 19:00</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <BaseBadge variant="success">Confirmada</BaseBadge>
            <BaseButton variant="danger" size="sm">Cancelar</BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
