<!-- UserHomeView.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  IconCalendar,
  IconChartLine,
  IconHistory,
  IconIdBadge,
  IconBell,
  IconUser,
  IconHelpCircle,
  IconTrophy,
  IconPlus,
  IconChevronRight,
  IconArrowRight,
  IconCreditCard,
  IconClockHour4,
  IconCheck,
  IconX,
  IconSearch
} from '@tabler/icons-vue'

/* =========================
   Estado de la vista
========================= */
const sidebarOpen = ref(false)

// Mock de usuario y métricas rápidas
const user = ref({
  name: 'WayUp',
  avatar: null,
  membershipStatus: 'Vigente',
  plan: 'Premium',
  planEndsAt: '2025-12-31',
  remainingDays: 27,
})

// Próxima reserva y KPIs
const kpis = computed(() => ([
  { title: 'Próxima reserva', value: 'Mar 12 · 7:00 AM', icon: IconCalendar, accent: 'from-blue-600 to-indigo-600' },
  { title: 'Estado membresía', value: user.value.membershipStatus, icon: IconIdBadge, accent: 'from-emerald-600 to-teal-600' },
  { title: 'Días restantes', value: String(user.value.remainingDays), icon: IconClockHour4, accent: 'from-violet-600 to-fuchsia-600' },
  { title: 'Entrenos del mes', value: '9', icon: IconChartLine, accent: 'from-rose-600 to-orange-600' },
]))

/* =========================
   2) Reservas (Calendario + lista)
========================= */
// Semana actual (lun-dom)
const startOfWeek = (() => {
  const d = new Date()
  const day = d.getDay() // 0-dom ... 6-sab
  const diff = (day === 0 ? -6 : 1 - day) // mover a lunes
  d.setDate(d.getDate() + diff)
  d.setHours(0,0,0,0)
  return d
})()

const weekDays = [...Array(7)].map((_, i) => {
  const d = new Date(startOfWeek)
  d.setDate(startOfWeek.getDate() + i)
  return d
})

const reservations = ref([
  { id: 1, date: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()+1, 7, 0), area: 'Spinning', status: 'confirmada' },
  { id: 2, date: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()+3, 19, 0), area: 'Área de pesas', status: 'pendiente' },
  { id: 3, date: new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()+5, 9, 30), area: 'Yoga', status: 'confirmada' },
])

const isSameDay = (a, b) =>
  a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()

const reservationsByDay = computed(() =>
  weekDays.map(day => reservations.value.filter(r => isSameDay(r.date, day)))
)

/* =========================
   3) Progreso (simple)
========================= */
const goalPerWeek = 4
const attendedThisWeek = computed(() => reservations.value.filter(r => r.status === 'confirmada').length)
const progressPct = computed(() => Math.min(100, Math.round(attendedThisWeek.value / goalPerWeek * 100)))

// Distribución simple por tipo (mock)
const distribution = computed(() => ([
  { label: 'Pesas', value: 40 },
  { label: 'Clases', value: 35 },
  { label: 'Cardio', value: 25 },
]))

/* =========================
   4) Historial
========================= */
const history = ref([
  { id: 101, date: '2025-10-31', area: 'Pesas', status: 'asistió' },
  { id: 102, date: '2025-10-29', area: 'Yoga', status: 'asistió' },
  { id: 103, date: '2025-10-27', area: 'Spinning', status: 'canceló' },
  { id: 104, date: '2025-10-25', area: 'HIIT', status: 'no asistió' },
])

const historyQuery = ref('')
const filteredHistory = computed(() => {
  const q = historyQuery.value.trim().toLowerCase()
  if (!q) return history.value
  return history.value.filter(h =>
    h.area.toLowerCase().includes(q) ||
    h.status.toLowerCase().includes(q) ||
    h.date.includes(q)
  )
})

/* =========================
   5) Plan y Membresía
========================= */
const benefits = [
  'Acceso total 24/7',
  'Todas las clases grupales',
  'Casillero premium',
  'Evaluación mensual',
]

/* =========================
   6) Notificaciones
========================= */
const notifications = ref([
  { id: 1, title: 'Nueva clase de Functional', text: 'Disponible los jueves 7:00 PM', date: '2025-11-08' },
  { id: 2, title: 'Mantenimiento de sauna', text: 'Domingo 10:00–13:00', date: '2025-11-07' },
  { id: 3, title: 'Promo Black Week', text: '15% off en upgrade de plan', date: '2025-11-05' },
])

/* =========================
   7) Perfil
========================= */
const profile = ref({
  name: 'WayUp',
  email: 'wayup@example.com',
  phone: '+51 999 999 999',
})

/* =========================
   8) Soporte
========================= */
const faqs = [
  { q: '¿Cómo cambio o cancelo una reserva?', a: 'Desde Reservas > Próximas reservas, abre los 3 puntos y elige la acción.' },
  { q: '¿Puedo invitar a alguien?', a: 'Depende de tu plan. En Premium puedes invitar 1 vez/mes.' },
  { q: '¿Cómo renuevo mi plan?', a: 'En la sección Membresía encontrarás el botón Renovar o Mejorar plan.' },
]

/* =========================
   9) Logros
========================= */
const achievements = ref([
  { id: 'streak-5', title: 'Racha de 5 días', desc: 'Entrenaste 5 días seguidos', color: 'from-emerald-500 to-teal-500' },
  { id: 'goal-80', title: 'Meta 80% cumplida', desc: 'Alcanzaste tu objetivo semanal', color: 'from-blue-600 to-indigo-600' },
])

onMounted(() => {
  // podrías cargar data real aquí
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top bar -->
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="md:hidden rounded-lg p-2 hover:bg-gray-100" @click="sidebarOpen = true" aria-label="Abrir menú">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <div class="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white shadow">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M9 6l-4 6 4 6M15 6l4 6-4 6"/></svg>
          </div>
          <div>
            <p class="text-sm text-gray-500">Bienvenido</p>
            <p class="font-semibold text-gray-900">Hola, {{ user.name }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button class="relative rounded-lg p-2 hover:bg-gray-100" aria-label="Notificaciones">
            <IconBell class="h-6 w-6 text-gray-700" />
            <span class="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500"></span>
          </button>
          <div class="h-9 w-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 grid place-items-center text-slate-600">
            <IconUser class="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>

    <!-- Layout -->
    <div class="container mx-auto px-4 py-6 flex gap-6">
      <!-- Sidebar -->
      <aside
        class="hidden md:block w-64 shrink-0"
      >
        <nav class="space-y-1">
          <a class="nav-item active"><IconCalendar class="h-5 w-5" /> Inicio</a>
          <a class="nav-item"><IconCalendar class="h-5 w-5" /> Reservas</a>
          <a class="nav-item"><IconChartLine class="h-5 w-5" /> Progreso</a>
          <a class="nav-item"><IconHistory class="h-5 w-5" /> Historial</a>
          <a class="nav-item"><IconIdBadge class="h-5 w-5" /> Membresía</a>
          <a class="nav-item"><IconBell class="h-5 w-5" /> Notificaciones</a>
          <a class="nav-item"><IconUser class="h-5 w-5" /> Perfil</a>
          <a class="nav-item"><IconHelpCircle class="h-5 w-5" /> Ayuda</a>
          <a class="nav-item"><IconTrophy class="h-5 w-5" /> Logros</a>
        </nav>
      </aside>

      <!-- Mobile drawer -->
      <transition enter-active-class="duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100"
                  leave-active-class="duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="sidebarOpen" class="fixed inset-0 z-50 bg-black/40 md:hidden" @click="sidebarOpen=false"></div>
      </transition>
      <transition enter-active-class="duration-200" enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
                  leave-active-class="duration-150" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
        <aside v-if="sidebarOpen" class="fixed z-50 inset-y-0 left-0 w-72 bg-white border-r p-4 md:hidden">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <div class="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white shadow">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M9 6l-4 6 4 6M15 6l4 6-4 6"/></svg>
              </div>
              <span class="font-semibold">GymReservas</span>
            </div>
            <button class="rounded-lg p-2 hover:bg-gray-100" @click="sidebarOpen=false" aria-label="Cerrar">
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <nav class="space-y-1">
            <a class="nav-item active"><IconCalendar class="h-5 w-5" /> Inicio</a>
            <a class="nav-item"><IconCalendar class="h-5 w-5" /> Reservas</a>
            <a class="nav-item"><IconChartLine class="h-5 w-5" /> Progreso</a>
            <a class="nav-item"><IconHistory class="h-5 w-5" /> Historial</a>
            <a class="nav-item"><IconIdBadge class="h-5 w-5" /> Membresía</a>
            <a class="nav-item"><IconBell class="h-5 w-5" /> Notificaciones</a>
            <a class="nav-item"><IconUser class="h-5 w-5" /> Perfil</a>
            <a class="nav-item"><IconHelpCircle class="h-5 w-5" /> Ayuda</a>
            <a class="nav-item"><IconTrophy class="h-5 w-5" /> Logros</a>
          </nav>
        </aside>
      </transition>

      <!-- Main -->
      <main class="flex-1 space-y-8">
        <!-- 1) Encabezado / KPIs -->
        <section>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="k in kpis" :key="k.title" class="rounded-2xl border bg-white p-4 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-br" :class="k.accent + ' text-white grid place-items-center'">
                  <component :is="k.icon" class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">{{ k.title }}</p>
                  <p class="font-semibold text-gray-900">{{ k.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2) Reservas -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-gray-900">Reservas</h2>
            <button class="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow">
              <IconPlus class="h-5 w-5" /> Nueva reserva
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <!-- Calendario semanal -->
            <div class="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
              <div class="grid grid-cols-7 gap-2">
                <div v-for="(d, idx) in weekDays" :key="idx" class="rounded-xl border p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-gray-500">
                      {{ d.toLocaleDateString(undefined, { weekday: 'short' }) }}
                    </span>
                    <span class="text-sm font-semibold text-gray-900">
                      {{ d.getDate() }}
                    </span>
                  </div>
                  <ul class="space-y-2">
                    <li
                      v-for="r in reservationsByDay[idx]"
                      :key="r.id"
                      class="rounded-lg px-2 py-1 text-sm flex items-center justify-between"
                      :class="r.status==='confirmada'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'"
                    >
                      <span class="truncate">{{ r.area }}</span>
                      <span class="ml-2 shrink-0 text-xs text-gray-600">
                        {{ r.date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Próximas reservas -->
            <div class="rounded-2xl border bg-white p-4 shadow-sm">
              <p class="font-semibold text-gray-900 mb-3">Próximas reservas</p>
              <ul class="space-y-3">
                <li v-for="r in reservations" :key="r.id" class="rounded-xl border p-3 flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">{{ r.area }}</p>
                    <p class="text-sm text-gray-600">
                      {{ r.date.toLocaleDateString() }} ·
                      {{ r.date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) }}
                    </p>
                  </div>
                  <span class="text-xs rounded-full px-2 py-1"
                        :class="r.status==='confirmada'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'">
                    {{ r.status }}
                  </span>
                </li>
              </ul>
              <button class="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                Ver todas <IconChevronRight class="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <!-- 3) Progreso -->
        <section>
          <h2 class="text-lg font-semibold text-gray-900 mb-3">Progreso</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
              <p class="text-sm text-gray-600 mb-2">Objetivo semanal: {{ goalPerWeek }} sesiones</p>
              <div class="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all" :style="{ width: progressPct + '%' }"></div>
              </div>
              <p class="mt-2 text-sm text-gray-700">Avance: <span class="font-semibold">{{ progressPct }}%</span></p>
            </div>
            <div class="rounded-2xl border bg-white p-4 shadow-sm">
              <p class="font-medium text-gray-900 mb-2">Distribución del mes</p>
              <ul class="space-y-2">
                <li v-for="d in distribution" :key="d.label" class="flex items-center gap-3">
                  <span class="w-24 text-sm text-gray-600">{{ d.label }}</span>
                  <div class="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-500" :style="{ width: d.value + '%' }"></div>
                  </div>
                  <span class="w-10 text-right text-sm text-gray-700">{{ d.value }}%</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 4) Historial -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-gray-900">Historial de reservas</h2>
            <div class="relative">
              <IconSearch class="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                v-model="historyQuery"
                type="text"
                placeholder="Buscar (área, estado, fecha)"
                class="pl-9 pr-3 py-2 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div class="rounded-2xl border bg-white p-4 shadow-sm overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="text-left text-gray-600">
                <tr>
                  <th class="py-2 pr-4">Fecha</th>
                  <th class="py-2 pr-4">Área</th>
                  <th class="py-2 pr-4">Estado</th>
                  <th class="py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in filteredHistory" :key="h.id" class="border-t">
                  <td class="py-3 pr-4 text-gray-800">{{ h.date }}</td>
                  <td class="py-3 pr-4 text-gray-800">{{ h.area }}</td>
                  <td class="py-3 pr-4">
                    <span class="text-xs rounded-full px-2 py-1"
                          :class="{
                            'bg-emerald-100 text-emerald-700': h.status==='asistió',
                            'bg-amber-100 text-amber-700': h.status==='canceló',
                            'bg-rose-100 text-rose-700': h.status==='no asistió'
                          }">
                      {{ h.status }}
                    </span>
                  </td>
                  <td class="py-3">
                    <button class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700">
                      Ver detalle <IconArrowRight class="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 5) Plan y Membresía -->
        <section>
          <h2 class="text-lg font-semibold text-gray-900 mb-3">Membresía</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p class="text-sm text-gray-500">Plan actual</p>
                  <p class="text-xl font-bold text-gray-900">{{ user.plan }}</p>
                  <p class="text-sm text-gray-600">Vence: {{ user.planEndsAt }}</p>
                </div>
                <div class="flex gap-2">
                  <button class="rounded-xl px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Renovar
                  </button>
                  <button class="rounded-xl px-4 py-2 border hover:bg-gray-50">
                    Mejorar plan
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <p class="font-medium text-gray-900 mb-2">Beneficios</p>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-gray-700">
                    <span class="h-5 w-5 grid place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <IconCheck class="h-3.5 w-3.5" />
                    </span>
                    {{ b }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="rounded-2xl border bg-white p-4 shadow-sm">
              <p class="font-medium text-gray-900 mb-2">Pagos</p>
              <div class="rounded-xl border p-3 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 grid place-items-center text-white">
                    <IconCreditCard class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Método</p>
                    <p class="font-medium">**** 4242</p>
                  </div>
                </div>
                <button class="text-sm text-blue-600 hover:text-blue-700">Cambiar</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 6) Notificaciones -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold text-gray-900">Notificaciones</h2>
            <button class="text-sm text-blue-600 hover:text-blue-700">Marcar todo como leído</button>
          </div>
          <div class="rounded-2xl border bg-white p-4 shadow-sm">
            <ul class="divide-y">
              <li v-for="n in notifications" :key="n.id" class="py-3 flex items-start justify-between gap-3">
                <div>
                  <p class="font-medium text-gray-900">{{ n.title }}</p>
                  <p class="text-sm text-gray-600">{{ n.text }}</p>
                </div>
                <span class="text-xs text-gray-500 shrink-0">{{ n.date }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 7) Perfil -->
        <section>
          <h2 class="text-lg font-semibold text-gray-900 mb-3">Perfil</h2>
          <div class="rounded-2xl border bg-white p-4 shadow-sm">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-gray-500">Nombre</p>
                <p class="font-medium text-gray-900">{{ profile.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Correo</p>
                <p class="font-medium text-gray-900">{{ profile.email }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Teléfono</p>
                <p class="font-medium text-gray-900">{{ profile.phone }}</p>
              </div>
            </div>
            <div class="mt-4 flex gap-2">
              <button class="rounded-xl px-4 py-2 border hover:bg-gray-50">Editar perfil</button>
              <button class="rounded-xl px-4 py-2 border hover:bg-gray-50">Cambiar contraseña</button>
            </div>
          </div>
        </section>

        <!-- 8) Ayuda / Soporte -->
        <section>
          <h2 class="text-lg font-semibold text-gray-900 mb-3">Ayuda</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
              <p class="font-medium text-gray-900 mb-2">Preguntas frecuentes</p>
              <ul class="divide-y">
                <li v-for="(f, idx) in faqs" :key="idx" class="py-3">
                  <p class="font-medium text-gray-900">{{ f.q }}</p>
                  <p class="text-sm text-gray-600">{{ f.a }}</p>
                </li>
              </ul>
            </div>
            <div class="rounded-2xl border bg-white p-4 shadow-sm">
              <p class="font-medium text-gray-900 mb-2">Contacto</p>
              <p class="text-sm text-gray-600">¿Necesitas ayuda? Escríbenos:</p>
              <a href="mailto:soporte@gymreservas.com" class="mt-2 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                soporte@gymreservas.com <IconArrowRight class="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <!-- 9) Logros -->
        <section class="pb-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-3">Logros</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="a in achievements"
              :key="a.id"
              class="rounded-2xl border bg-white p-4 shadow-sm flex items-center gap-3"
            >
              <div class="h-12 w-12 rounded-xl bg-gradient-to-br text-white grid place-items-center" :class="a.color">
                <IconTrophy class="h-6 w-6" />
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ a.title }}</p>
                <p class="text-sm text-gray-600">{{ a.desc }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "@/style.css";
.nav-item {
  @apply flex items-center gap-2 rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100;
}
.nav-item.active {
  @apply bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700;
}
</style>
