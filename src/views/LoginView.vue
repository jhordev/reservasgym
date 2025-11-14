<!-- LoginGym.vue -->
<script setup>
import { ref } from "vue";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGoogle,
} from "@tabler/icons-vue";

import ForgotPasswordDialog from "@/components/ForgotPasswordDialog.vue";

const showDialog = ref(false);

const email = ref("");
const password = ref("");
const showPwd = ref(false);
const loading = ref(false);

const submit = async (e) => {
  e.preventDefault();
  loading.value = true;
  // TODO: valida y haz tu request
  setTimeout(() => (loading.value = false), 800);
};

const signInWithGoogle = () => {
  // TODO: integra tu flujo de Google
  console.log("Google sign-in");
};
</script>

<template>
  <section class="min-h-screen relative overflow-hidden">
    <!-- Fondo / halo -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
    ></div>
    <div
      aria-hidden="true"
      class="absolute -top-24 left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-blue-600/20 blur-3xl"
    ></div>

    <div class="relative container mx-auto px-4 py-10 md:py-16">
      <!-- Header simple -->
      <RouterLink to="/" class="flex items-center gap-3 text-white/90 mb-8">
        <span
          class="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center shadow-sm"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12h14M9 6l-4 6 4 6M15 6l4 6-4 6"
            />
          </svg>
        </span>
        <h1 class="text-xl font-semibold tracking-tight">GymReservas</h1>
      </RouterLink>

      <div class="mx-auto max-w-md">
        <!-- Card -->
        <div
          class="rounded-3xl bg-white/90 backdrop-blur shadow-xl ring-1 ring-gray-200/60 overflow-hidden"
        >
          <!-- Encabezado -->
          <div class="px-6 pt-6 pb-4 text-center">
            <h2 class="text-2xl font-extrabold text-gray-900">Inicia sesión</h2>
            <p class="mt-1 text-gray-500">Accede a tu cuenta para continuar</p>
          </div>

          <form class="px-6 pb-6" @submit="submit">
            <!-- Email -->
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="email"
              >Correo</label
            >
            <div class="relative mb-4">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="tucorreo@dominio.com"
              />
              <IconMail
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>

            <!-- Password -->
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="password"
              >Contraseña</label
            >
            <div class="relative">
              <input
                id="password"
                :type="showPwd ? 'text' : 'password'"
                v-model="password"
                required
                autocomplete="current-password"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                @click="showPwd = !showPwd"
                :aria-label="
                  showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'
                "
              >
                <IconEye v-if="!showPwd" class="h-5 w-5" />
                <IconEyeOff v-else class="h-5 w-5" />
              </button>
              <IconLock
                class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-transparent"
              />
            </div>

            <!-- Acción -->
            <button
              type="submit"
              :disabled="loading"
              class="mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg
                v-if="loading"
                class="mr-2 h-5 w-5 animate-spin"
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
              {{ loading ? "Ingresando..." : "Iniciar sesión" }}
            </button>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center">
                <span
                  class="bg-white/90 px-3 text-xs uppercase tracking-wider text-gray-500"
                  >o continúa con</span
                >
              </div>
            </div>

            <!-- Botón Google (estilo inspirado en ejemplos oficiales y UI modernas) -->
            <button
              type="button"
              @click="signInWithGoogle"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              <IconBrandGoogle class="h-5 w-5" />
              Continuar con Google
            </button>

            <!-- Helpers -->
            <div class="mt-4 flex justify-center text-sm">
              <a
                @click="showDialog = true"
                class="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >¿Olvidaste tu contraseña?</a
              >
            </div>
          </form>
        </div>

        <!-- mini-copy -->
        <p class="mt-6 text-center text-sm text-white/70">
          ¿No tienes cuenta?
          <RouterLink
            to="/register"
            class="font-semibold text-white hover:underline"
            >Crear cuenta</RouterLink
          >
        </p>
      </div>
    </div>
  </section>

  <!-- Forgot Password Dialog -->
  <ForgotPasswordDialog v-model:open="showDialog" />
</template>

<style scoped>
/* Sin @apply para evitar problemas con Tailwind v4 en <style scoped> */
</style>
