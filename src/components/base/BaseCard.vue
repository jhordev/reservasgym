<script setup>
const props = defineProps({
  padding: {
    type: String,
    default: 'md', // sm, md, lg, none
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  shadow: {
    type: String,
    default: 'md', // none, sm, md, lg
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<template>
  <div
    :class="[
      'bg-white rounded-xl border border-gray-200 transition-all duration-200',

      // Padding
      {
        'p-0': padding === 'none',
        'p-4': padding === 'sm',
        'p-6': padding === 'md',
        'p-8': padding === 'lg'
      },

      // Shadow
      {
        'shadow-none': shadow === 'none',
        'shadow-sm': shadow === 'sm',
        'shadow-md': shadow === 'md',
        'shadow-lg': shadow === 'lg'
      },

      // Hover
      {
        'hover:shadow-lg hover:border-primary-200': hover,
        'cursor-pointer': clickable
      }
    ]"
    @click="handleClick"
  >
    <!-- Header slot -->
    <div v-if="$slots.header" class="mb-4 pb-4 border-b border-gray-200">
      <slot name="header" />
    </div>

    <!-- Default slot -->
    <slot />

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>
