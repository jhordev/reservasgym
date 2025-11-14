<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { IconUser, IconMail, IconPhone, IconLock } from '@tabler/icons-vue'

const { userProfile } = useAuth()

const nombre = ref(userProfile.value?.nombre || '')
const email = ref(userProfile.value?.email || '')
const telefono = ref(userProfile.value?.telefono || '')
const dni = ref(userProfile.value?.dni || '')
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
      <p class="mt-2 text-gray-600">Gestiona tu información personal</p>
    </div>

    <!-- Información Personal -->
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Información Personal</h2>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="nombre"
            label="Nombre completo"
            :icon="IconUser"
            placeholder="Ingresa tu nombre"
          />
          <BaseInput
            v-model="dni"
            label="DNI"
            placeholder="12345678"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="email"
            label="Correo electrónico"
            type="email"
            :icon="IconMail"
            placeholder="correo@ejemplo.com"
            disabled
          />
          <BaseInput
            v-model="telefono"
            label="Teléfono"
            :icon="IconPhone"
            placeholder="999 999 999"
          />
        </div>
      </div>

      <template #footer>
        <BaseButton variant="primary">
          Guardar Cambios
        </BaseButton>
      </template>
    </BaseCard>

    <!-- Cambiar Contrasena -->
    <BaseCard>
      <template #header>
        <h2 class="text-xl font-bold text-gray-900">Cambiar Contrasena</h2>
      </template>

      <div class="space-y-4">
        <BaseInput
          type="password"
          label="Contrasena actual"
          :icon="IconLock"
          placeholder="••••••••"
        />
        <BaseInput
          type="password"
          label="Nueva contrasena"
          :icon="IconLock"
          placeholder="••••••••"
        />
        <BaseInput
          type="password"
          label="Confirmar nueva contrasena"
          :icon="IconLock"
          placeholder="••••••••"
        />
      </div>

      <template #footer>
        <BaseButton variant="primary">
          Actualizar Contrasena
        </BaseButton>
      </template>
    </BaseCard>
  </div>
</template>
