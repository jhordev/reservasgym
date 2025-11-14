<script setup>
import { IconInfoCircle, IconCheck, IconAlertTriangle, IconX } from '@tabler/icons-vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info', // info, success, warning, error
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const iconComponent = {
  info: IconInfoCircle,
  success: IconCheck,
  warning: IconAlertTriangle,
  error: IconX
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200"
    enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-1"
  >
    <div
      v-if="modelValue"
      :class="[
        'rounded-xl p-4 border',
        {
          // Info - Azul
          'bg-blue-50 border-blue-200': variant === 'info',

          // Success - Verde
          'bg-green-50 border-green-200': variant === 'success',

          // Warning - Amarillo
          'bg-yellow-50 border-yellow-200': variant === 'warning',

          // Error - Rojo
          'bg-red-50 border-red-200': variant === 'error'
        }
      ]"
    >
      <div class="flex items-start">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <component
            :is="iconComponent[variant]"
            :class="[
              'h-5 w-5',
              {
                'text-blue-600': variant === 'info',
                'text-green-600': variant === 'success',
                'text-yellow-600': variant === 'warning',
                'text-red-600': variant === 'error'
              }
            ]"
          />
        </div>

        <!-- Content -->
        <div class="ml-3 flex-1">
          <h3
            v-if="title"
            :class="[
              'text-sm font-semibold',
              {
                'text-blue-800': variant === 'info',
                'text-green-800': variant === 'success',
                'text-yellow-800': variant === 'warning',
                'text-red-800': variant === 'error'
              }
            ]"
          >
            {{ title }}
          </h3>

          <div
            :class="[
              'text-sm',
              {
                'text-blue-700': variant === 'info',
                'text-green-700': variant === 'success',
                'text-yellow-700': variant === 'warning',
                'text-red-700': variant === 'error',
                'mt-1': title
              }
            ]"
          >
            <slot />
          </div>
        </div>

        <!-- Close button -->
        <div v-if="closable" class="ml-3 flex-shrink-0">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5 hover:bg-white/50 transition-colors"
            @click="close"
          >
            <IconX class="h-5 w-5" :class="{
              'text-blue-600': variant === 'info',
              'text-green-600': variant === 'success',
              'text-yellow-600': variant === 'warning',
              'text-red-600': variant === 'error'
            }" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
