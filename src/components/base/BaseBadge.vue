<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default', // default, primary, success, warning, error, info
    validator: (value) => ['default', 'primary', 'success', 'warning', 'error', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  dot: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium rounded-full',

      // Tamaños
      {
        'px-2 py-0.5 text-xs': size === 'sm',
        'px-2.5 py-1 text-sm': size === 'md',
        'px-3 py-1.5 text-base': size === 'lg'
      },

      // Variantes
      {
        // Default
        'bg-gray-100 text-gray-800': variant === 'default',

        // Primary - Naranja
        'bg-primary-100 text-primary-700': variant === 'primary',

        // Success - Verde
        'bg-green-100 text-green-700': variant === 'success',

        // Warning - Amarillo
        'bg-yellow-100 text-yellow-700': variant === 'warning',

        // Error - Rojo
        'bg-red-100 text-red-700': variant === 'error',

        // Info - Azul
        'bg-blue-100 text-blue-700': variant === 'info'
      }
    ]"
  >
    <!-- Dot indicator -->
    <span
      v-if="dot"
      :class="[
        'mr-1.5 h-2 w-2 rounded-full',
        {
          'bg-gray-500': variant === 'default',
          'bg-primary-500': variant === 'primary',
          'bg-green-500': variant === 'success',
          'bg-yellow-500': variant === 'warning',
          'bg-red-500': variant === 'error',
          'bg-blue-500': variant === 'info'
        }
      ]"
    />

    <slot />
  </span>
</template>
