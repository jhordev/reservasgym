<!-- ForgotPasswordDialog.vue -->
<script setup>
import { ref, watch } from "vue";
import { IconMail, IconSend, IconCheck } from "@tabler/icons-vue";

const open = defineModel("open", { type: Boolean, default: false }); // para controlar el diálogo externamente
const email = ref("");
const sent = ref(false);
const loading = ref(false);
const message = ref("");

// Cerrar con Escape
watch(open, (val) => {
  if (!val) {
    email.value = "";
    sent.value = false;
    message.value = "";
  }
});

const sendResetLink = async () => {
  if (!email.value) return (message.value = "Ingresa tu correo electrónico.");

  loading.value = true;
  message.value = "";
  // Simulación de envío de correo
  setTimeout(() => {
    loading.value = false;
    sent.value = true;
    message.value = `Se envió el enlace de restablecimiento a ${email.value}`;
  }, 1500);
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div
        class="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden"
      >
        <!-- Header -->
        <div class="border-b px-6 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">
            Recuperar contraseña
          </h2>
          <button
            @click="open = false"
            class="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div class="px-6 py-5">
          <template v-if="!sent">
            <p class="text-gray-600 mb-4">
              Ingresa el correo electrónico asociado a tu cuenta. Te enviaremos
              un enlace para restablecer tu contraseña.
            </p>

            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <div class="relative mb-5">
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="tucorreo@dominio.com"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <IconMail
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5"
              />
            </div>

            <p v-if="message" class="text-sm text-red-600 mb-2">
              {{ message }}
            </p>

            <button
              @click="sendResetLink"
              :disabled="loading"
              class="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg
                v-if="loading"
                class="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  class="opacity-30"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  d="M22 12a10 10 0 0 1-10 10"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                />
              </svg>
              <IconSend v-else class="h-5 w-5" />
              <span>{{ loading ? "Enviando..." : "Enviar enlace" }}</span>
            </button>
          </template>

          <template v-else>
            <div class="flex flex-col items-center text-center space-y-3 py-8">
              <div
                class="h-14 w-14 rounded-full bg-green-100 text-green-600 grid place-items-center"
              >
                <IconCheck class="h-8 w-8" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">
                ¡Correo enviado!
              </h3>
              <p class="text-gray-600 text-sm max-w-sm">
                {{ message }}
              </p>
              <button
                @click="open = false"
                class="mt-4 rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Cerrar
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
