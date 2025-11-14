<!-- RegisterView.vue -->
<script setup>
import { ref, computed } from "vue";
import {
  IconUser,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGoogle,
} from "@tabler/icons-vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");
const showPwd = ref(false);
const showPwd2 = ref(false);
const accepted = ref(false);
const loading = ref(false);
const errorMsg = ref("");

// medidor simple de seguridad (solo visual)
const strength = computed(() => {
  const p = password.value;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return Math.min(s, 4);
});
const strengthLabel = computed(() => {
  return ["Débil", "Básica", "Media", "Fuerte", "Muy fuerte"][strength.value];
});

const submit = async (e) => {
  e.preventDefault();
  errorMsg.value = "";

  if (password.value !== confirm.value) {
    errorMsg.value = "Las contraseñas no coinciden.";
    return;
  }
  if (!accepted.value) {
    errorMsg.value = "Debes aceptar los Términos y la Política de privacidad.";
    return;
  }

  loading.value = true;
  // TODO: reemplaza por tu request real (Firebase/Auth/etc.)
  setTimeout(() => {
    loading.value = false;
    // navegación o feedback
  }, 900);
};

const signUpWithGoogle = () => {
  // TODO: integra tu flujo de Google (Firebase Auth, etc.)
  console.log("Google sign-up");
};
</script>

<template>
  <section class="min-h-screen relative overflow-hidden">
    <!-- Fondo -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
    ></div>
    <div
      aria-hidden="true"
      class="absolute -top-24 left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-blue-600/20 blur-3xl"
    ></div>

    <div class="relative container mx-auto px-4 py-10 md:py-16">
      <!-- Header -->
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
            <h2 class="text-2xl font-extrabold text-gray-900">
              Crea tu cuenta
            </h2>
            <p class="mt-1 text-gray-500">Regístrate para empezar</p>
          </div>

          <form class="px-6 pb-6" @submit="submit">
            <!-- Nombre -->
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="name"
              >Nombre</label
            >
            <div class="relative mb-4">
              <input
                id="name"
                v-model="name"
                type="text"
                required
                autocomplete="name"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu nombre"
              />
              <IconUser
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>

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
            <div class="relative mb-2">
              <input
                id="password"
                :type="showPwd ? 'text' : 'password'"
                v-model="password"
                required
                autocomplete="new-password"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Mínimo 8 caracteres"
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

            <!-- Barra de fuerza -->
            <div class="mb-4">
              <div class="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :class="[
                    strength <= 1
                      ? 'bg-red-500'
                      : strength === 2
                      ? 'bg-yellow-500'
                      : strength === 3
                      ? 'bg-blue-500'
                      : 'bg-green-600',
                  ]"
                  :style="{ width: strength * 25 + '%' }"
                ></div>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Seguridad: {{ strengthLabel }}
              </p>
            </div>

            <!-- Confirm -->
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="confirm"
              >Confirmar contraseña</label
            >
            <div class="relative">
              <input
                id="confirm"
                :type="showPwd2 ? 'text' : 'password'"
                v-model="confirm"
                required
                autocomplete="new-password"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Repite la contraseña"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                @click="showPwd2 = !showPwd2"
                :aria-label="
                  showPwd2 ? 'Ocultar contraseña' : 'Mostrar contraseña'
                "
              >
                <IconEye v-if="!showPwd2" class="h-5 w-5" />
                <IconEyeOff v-else class="h-5 w-5" />
              </button>
            </div>

            <!-- Terms -->
            <div class="mt-4 flex items-start gap-3 text-sm">
              <input
                id="terms"
                type="checkbox"
                v-model="accepted"
                class="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <label for="terms" class="text-gray-600">
                Acepto los
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-700"
                  >Términos</a
                >
                y la
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-700"
                  >Política de privacidad</a
                >.
              </label>
            </div>

            <!-- Error -->
            <p v-if="errorMsg" class="mt-3 text-sm text-red-600">
              {{ errorMsg }}
            </p>

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
              {{ loading ? "Creando cuenta..." : "Crear cuenta" }}
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

            <!-- Google -->
            <button
              type="button"
              @click="signUpWithGoogle"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              <IconBrandGoogle class="h-5 w-5" />
              Registrarme con Google
            </button>

            <!-- Link a login -->
            <p class="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes cuenta?
              <RouterLink
                to="/login"
                class="font-semibold text-blue-600 hover:text-blue-700"
                >Inicia sesión</RouterLink
              >
            </p>
          </form>
        </div>

        <!-- mini-copy -->
        <p class="mt-6 text-center text-sm text-white/70">
          © 2023–2025 GymReservas. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* sin @apply para evitar conflictos con Tailwind v4 en <style scoped> */
</style>
