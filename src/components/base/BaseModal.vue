<script setup>
import { watch, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const modalRef = ref(null)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = (event) => {
  if (props.closeOnBackdrop && event.target === modalRef.value) {
    close()
  }
}

const handleEscape = (event) => {
  if (props.closeOnEscape && event.key === 'Escape' && props.modelValue) {
    close()
  }
}

// Agregar listener de escape cuando el modal está abierto
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        ref="modalRef"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 backdrop-blur-sm"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            :class="[
              'bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto w-full',
              {
                'max-w-sm': size === 'sm',
                'max-w-md': size === 'md',
                'max-w-2xl': size === 'lg',
                'max-w-4xl': size === 'xl'
              }
            ]"
            @click.stop
          >
            <!-- Header -->
            <div v-if="title || $slots.header" class="flex items-center justify-between p-6 border-b border-gray-200">
              <div v-if="$slots.header">
                <slot name="header" />
              </div>
              <h3 v-else class="text-xl font-bold text-gray-900">
                {{ title }}
              </h3>

              <button
                type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
                @click="close"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="p-6">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="p-6 border-t border-gray-200">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
