<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { IconCash } from '@tabler/icons-vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mis Pagos</h1>
      <p class="mt-2 text-gray-600">Historial de pagos y transacciones</p>
    </div>

    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Historial de Pagos</h2>
      </template>

      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <IconCash class="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">Membresía Mensual - Plan Full</p>
              <p class="text-sm text-gray-600">01 Nov 2025</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">S/. 120.00</p>
            <BaseBadge variant="success">Pagado</BaseBadge>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <IconCash class="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p class="font-semibold text-gray-900">Membresía Mensual - Plan Full</p>
              <p class="text-sm text-gray-600">01 Oct 2025</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">S/. 120.00</p>
            <BaseBadge variant="success">Pagado</BaseBadge>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
