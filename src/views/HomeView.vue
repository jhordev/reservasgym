<!-- LandingGym.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconActivity, // Entrenamiento personal
  IconCategoryPlus, // Área de peso libre
  IconUsers, // Clases grupales
  IconClipboardHeart, // Evaluación física
  IconMapPin,
  IconPhone,
  IconRecordMail,
  IconMail,
} from "@tabler/icons-vue";
import { RouterLink } from "vue-router";

// ===== Datos (sin emojis; usando Tabler Icons como componentes) =====
const services = [
  {
    icon: IconActivity,
    title: "Entrenamiento Personal",
    description:
      "Programas personalizados con entrenadores certificados para alcanzar tus objetivos.",
  },
  {
    icon: IconCategoryPlus,
    title: "Área de Peso Libre",
    description:
      "Equipamiento de última generación para entrenamiento de fuerza y musculación.",
  },
  {
    icon: IconUsers,
    title: "Clases Grupales",
    description:
      "Variedad de clases desde yoga hasta HIIT con instructores expertos.",
  },
  {
    icon: IconClipboardHeart,
    title: "Evaluación Física",
    description:
      "Seguimiento detallado de tu progreso y ajustes personalizados a tu rutina.",
  },
];

const memberships = [
  {
    name: "Básico",
    price: "29.99",
    period: "mes",
    features: [
      "Acceso a área de pesas",
      "Casillero básico",
      "Horario limitado",
      "App de seguimiento",
    ],
  },
  {
    name: "Premium",
    price: "49.99",
    period: "mes",
    features: [
      "Acceso total 24/7",
      "Todas las clases grupales",
      "Casillero premium",
      "Evaluación mensual",
      "App de seguimiento",
      "Invitado gratis 1 vez/mes",
    ],
  },
  {
    name: "Elite",
    price: "79.99",
    period: "mes",
    features: [
      "Todo lo de Premium",
      "2 sesiones PT/mes",
      "Nutricionista",
      "Spa y sauna",
      "Estacionamiento",
      "Invitados ilimitados",
    ],
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    alt: "Área de pesas",
  },
  {
    src: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
    alt: "Clase grupal",
  },
  {
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2",
    alt: "Cardio",
  },
  {
    src: "https://images.unsplash.com/photo-1591291621164-2c6367723315",
    alt: "Yoga",
  },
  {
    src: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    alt: "Personal Training",
  },
  {
    src: "https://images.unsplash.com/photo-1561214078-f3247647fc5e",
    alt: "Equipamiento",
  },
];

// ===== Estado =====
const openNav = ref(false);
const atTop = ref(true);

// ===== Helpers =====
const scrollToId = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Header blur / sombra
const onScroll = () => {
  atTop.value = window.scrollY < 10;
};
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

// ===== Directiva de revelado al hacer scroll =====
const vReveal = {
  mounted(el, binding) {
    const dir = binding.value || "up";
    const base = "opacity-0 will-change-transform duration-700 ease-out";
    const map = {
      up: "translate-y-6",
      down: "-translate-y-6",
      left: "translate-x-6",
      right: "-translate-x-6",
    };
    el.classList.add(...`${base} ${map[dir]}`.split(" "));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(
            "opacity-0",
            "translate-y-6",
            "-translate-y-6",
            "translate-x-6",
            "-translate-x-6"
          );
          el.classList.add("opacity-100", "translate-x-0", "translate-y-0");
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
  },
};
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800">
    <!-- ===== Header ===== -->
    <header
      :class="[
        'fixed inset-x-0 top-0 z-50 transition-all',
        atTop
          ? 'bg-white/60 backdrop-blur-sm'
          : 'bg-white/90 shadow-md backdrop-blur',
      ]"
      aria-label="Principal"
    >
      <nav class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <button
            class="flex items-center gap-2 group"
            @click="scrollToId('#top')"
            aria-label="Ir al inicio"
          >
            <span
              class="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white shadow-sm group-hover:scale-105 transition"
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
            <span class="text-xl font-bold tracking-tight">GymReservas</span>
          </button>

          <div class="hidden md:flex items-center gap-2">
            <a href="#servicios" class="nav-link">Servicios</a>
            <a href="#membresias" class="nav-link">Membresías</a>
            <a href="#galeria" class="nav-link">Galería</a>
            <a href="#contacto" class="nav-link">Contacto</a>
            <button
              class="ml-4 rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition shadow-sm"
              @click="scrollToId('#membresias')"
            >
              Reserva ahora
            </button>
          </div>

          <button
            class="md:hidden rounded-lg p-2 hover:bg-gray-100"
            @click="openNav = !openNav"
            aria-label="Abrir menú"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                v-if="!openNav"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
              <path
                v-else
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile -->
        <transition
          enter-active-class="duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="openNav" class="md:hidden pb-4 space-y-2">
            <a href="#servicios" class="mobile-link" @click="openNav = false"
              >Servicios</a
            >
            <a href="#membresias" class="mobile-link" @click="openNav = false"
              >Membresías</a
            >
            <a href="#galeria" class="mobile-link" @click="openNav = false"
              >Galería</a
            >
            <a href="#contacto" class="mobile-link" @click="openNav = false"
              >Contacto</a
            >
            <button
              class="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm"
              @click="
                openNav = false;
                scrollToId('#membresias');
              "
            >
              Reserva ahora
            </button>
          </div>
        </transition>
      </nav>
    </header>

    <!-- ===== Hero ===== -->
    <section id="top" class="relative overflow-hidden">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
      ></div>
      <div
        aria-hidden="true"
        class="absolute -top-24 left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-blue-600/20 blur-3xl"
      ></div>

      <div
        class="relative container mx-auto px-4 pt-28 md:pt-36 pb-20 text-center text-white"
      >
        <h1
          class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          <span
            class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            >Transforma tu cuerpo,</span
          >
          <br class="hidden md:block" />
          <span
            class="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300"
            >eleva tu energía</span
          >
        </h1>
        <p
          class="mt-5 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          v-reveal
        >
          Equipamiento de última generación, entrenadores expertos y una
          comunidad que te impulsa a superar tus límites.
        </p>
        <div class="mt-8 flex items-center justify-center gap-3">
          <RouterLink
            class="group rounded-xl px-6 py-3 font-semibold text-gray-900 bg-white hover:bg-gray-100 transition shadow"
            to="/login"
          >
            Comenzar ahora
            <span
              class="inline-block transition-transform group-hover:translate-x-0.5"
              >→</span
            >
          </RouterLink>
          <button
            class="rounded-xl px-6 py-3 font-semibold border border-white/40 text-white hover:bg-white/10 transition backdrop-blur"
          >
            Ver instalaciones
          </button>
        </div>

        <div
          class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          v-reveal
        >
          <div class="stat-card">
            <p class="stat-value">24/7</p>
            <p class="stat-label">Acceso</p>
          </div>
          <div class="stat-card">
            <p class="stat-value">+50</p>
            <p class="stat-label">Máquinas pro</p>
          </div>
          <div class="stat-card">
            <p class="stat-value">+30</p>
            <p class="stat-label">Clases/semana</p>
          </div>
          <div class="stat-card">
            <p class="stat-value">+10k</p>
            <p class="stat-label">Miembros felices</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Servicios ===== -->
    <section id="servicios" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="section-title" v-reveal>
          Servicios que potencian tu progreso
        </h2>

        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article
            v-for="(s, i) in services"
            :key="s.title"
            class="group service-card"
            :style="`transition-delay:${i * 60}ms`"
            v-reveal="'up'"
          >
            <div
              class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100"
            >
              <component :is="s.icon" class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold">{{ s.title }}</h3>
            <p class="mt-2 text-gray-600">{{ s.description }}</p>
            <div
              class="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium"
            >
              Saber más
              <svg
                class="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <span
              class="pointer-events-none absolute inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-100/40 to-indigo-100/40"
            ></span>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== Membresías ===== -->
    <section id="membresias" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="section-title" v-reveal>Planes claros, resultados reales</h2>

        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(plan, i) in memberships"
            :key="plan.name"
            class="relative rounded-2xl border bg-white/80 backdrop-blur shadow-sm hover:shadow-lg transition overflow-hidden"
            :class="i === 1 ? 'ring-2 ring-blue-500' : ''"
            v-reveal="'up'"
            :style="`transition-delay:${i * 80}ms`"
          >
            <div class="p-6 border-b">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold">{{ plan.name }}</h3>
                <span
                  v-if="i === 1"
                  class="rounded-full bg-blue-600 text-white text-xs px-3 py-1"
                  >Recomendado</span
                >
              </div>
              <div class="mt-2">
                <span class="text-4xl font-extrabold text-blue-600"
                  >${{ plan.price }}</span
                >
                <span class="text-gray-500">/{{ plan.period }}</span>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-3">
                <li
                  v-for="f in plan.features"
                  :key="f"
                  class="flex items-start gap-3 text-gray-700"
                >
                  <svg
                    class="w-5 h-5 mt-0.5 text-green-600 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>{{ f }}</span>
                </li>
              </ul>
              <button
                class="w-full mt-6 rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Elegir plan
              </button>
            </div>
            <div
              v-if="i === 1"
              aria-hidden="true"
              class="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-2xl"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Galería ===== -->
    <section id="galeria" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="section-title" v-reveal>Conoce nuestras instalaciones</h2>

        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <figure
            v-for="(img, i) in gallery"
            :key="img.alt"
            class="group relative overflow-hidden rounded-2xl bg-gray-200"
            v-reveal
            :style="`transition-delay:${i * 40}ms`"
          >
            <img
              :src="img.src + '?auto=format&fit=crop&w=1200&q=60'"
              :alt="img.alt"
              class="h-72 w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-[0.5deg]"
            />
            <figcaption
              class="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/50 to-transparent text-white opacity-0 group-hover:opacity-100 transition"
            >
              <span class="font-medium">{{ img.alt }}</span>
            </figcaption>
          </figure>
        </div>

        <div class="mt-10 text-center">
          <button
            class="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border border-gray-300 hover:bg-gray-100 transition"
          >
            Ver más fotos
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ===== CTA stripe ===== -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div
          class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8 md:p-12"
        >
          <div
            class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/30 blur-2xl"
            aria-hidden="true"
          ></div>
          <div
            class="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl"
            aria-hidden="true"
          ></div>

          <div class="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl md:text-3xl font-extrabold">
                ¿Listo para tu mejor versión?
              </h3>
              <p class="mt-2 text-gray-300">
                Prueba una clase gratuita y descubre por qué somos el gimnasio
                preferido de la ciudad.
              </p>
            </div>
            <div class="flex md:justify-end gap-3">
              <button
                class="rounded-xl px-5 py-3 font-semibold text-gray-900 bg-white hover:bg-gray-100 transition"
              >
                Clase gratis
              </button>
              <button
                class="rounded-xl px-5 py-3 font-semibold border border-white/40 text-white hover:bg-white/10 transition"
              >
                Ver horarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Footer ===== -->
    <footer id="contacto" class="bg-gray-950 text-gray-300">
      <div class="container mx-auto px-4 py-14">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center gap-2">
              <span
                class="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white shadow-sm"
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
              <h4 class="text-xl font-bold">GymReservas</h4>
            </div>
            <p class="mt-3 text-gray-400">
              Transformando vidas a través del fitness desde 2023.
            </p>
          </div>

          <div>
            <h5 class="footer-title">Contacto</h5>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-center gap-2">
                <IconMapPin /> Av. Principal #123
              </li>
              <li class="flex items-center gap-2">
                <IconPhone /> (123) 456-7890
              </li>
              <li class="flex items-center gap-2"><IconMail/> info@gymreservas.com</li>
            </ul>
          </div>

          <div>
            <h5 class="footer-title">Horario</h5>
            <ul class="space-y-2 text-gray-400">
              <li>Lun-Vie: 6:00 - 22:00</li>
              <li>Sáb: 8:00 - 20:00</li>
              <li>Dom: 9:00 - 18:00</li>
            </ul>
          </div>

          <div>
            <h5 class="footer-title">Síguenos</h5>
            <div class="flex gap-3">
              <a href="#" class="social-icon" aria-label="Facebook">
                <IconBrandFacebook class="h-5 w-5" />
              </a>
              <a href="#" class="social-icon" aria-label="Instagram">
                <IconBrandInstagram class="h-5 w-5" />
              </a>
              <a href="#" class="social-icon" aria-label="X (Twitter)">
                <IconBrandX class="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          class="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500"
        >
          © 2023–2025 GymReservas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* IMPORTANTE para Tailwind v4 con @apply dentro de <style scoped> */
@reference "@/style.css";

.nav-link {
  @apply px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition font-medium;
}
.mobile-link {
  @apply block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition;
}
.section-title {
  @apply text-center text-3xl md:text-4xl font-extrabold tracking-tight;
}
.service-card {
  @apply relative rounded-2xl border bg-white p-6 shadow-sm hover:-translate-y-0.5 transition-transform;
}
.stat-card {
  @apply rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4 text-center;
}
.stat-value {
  @apply text-2xl font-extrabold;
}
.stat-label {
  @apply text-sm text-gray-300;
}
.footer-title {
  @apply text-lg font-semibold text-white;
}
.social-icon {
  @apply grid place-items-center h-10 w-10 rounded-lg bg-white/5 hover:bg-white/10 transition;
}
</style>
