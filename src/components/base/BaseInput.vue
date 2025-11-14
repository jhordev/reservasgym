<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  helper: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hasError = computed(() => !!props.error)
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-0.5">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Icon (si existe) -->
      <div
        v-if="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <component :is="icon" class="h-5 w-5" />
      </div>

      <!-- Input -->
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-xl border transition-all duration-200',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500',

          // Padding según tamaño
          {
            'px-3 py-2 text-sm': size === 'sm',
            'px-4 py-2.5 text-base': size === 'md',
            'px-5 py-3 text-lg': size === 'lg',
            'pl-10': icon // Espacio adicional si hay icono
          },

          // Estados de error
          {
            'border-gray-300 focus:border-primary-500 focus:ring-primary-500': !hasError,
            'border-error focus:border-error focus:ring-error': hasError
          }
        ]"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <!-- Slot para contenido adicional a la derecha (ej: botón mostrar/ocultar contraseña) -->
      <div v-if="$slots.append" class="absolute right-2 top-1/2 -translate-y-1/2">
        <slot name="append" />
      </div>
    </div>

    <!-- Helper text o error -->
    <div class="mt-1.5 min-h-[20px]">
      <p v-if="hasError" class="text-sm text-error">
        {{ error }}
      </p>
      <p v-else-if="helper" class="text-sm text-gray-500">
        {{ helper }}
      </p>
    </div>
  </div>
</template>
