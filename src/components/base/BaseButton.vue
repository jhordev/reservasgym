<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, secondary, outline, ghost, danger
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',

      // Tamaños
      {
        'px-3 py-1.5 text-sm': size === 'sm' && !icon,
        'px-4 py-2.5 text-base': size === 'md' && !icon,
        'px-6 py-3 text-lg': size === 'lg' && !icon,
        'p-1.5': size === 'sm' && icon,
        'p-2.5': size === 'md' && icon,
        'p-3': size === 'lg' && icon,
        'w-full': fullWidth
      },

      // Variantes
      {
        // Primary - Naranja
        'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500':
          variant === 'primary',

        // Secondary - Gris
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400':
          variant === 'secondary',

        // Outline - Borde naranja
        'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500':
          variant === 'outline',

        // Ghost - Sin fondo
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-400':
          variant === 'ghost',

        // Danger - Rojo
        'bg-error text-white hover:bg-error-dark focus:ring-error':
          variant === 'danger'
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="mr-2 h-5 w-5 animate-spin"
      :class="{ 'mr-0': icon }"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Contenido del slot -->
    <slot />
  </button>
</template>
