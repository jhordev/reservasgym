# Arquitectura del Sistema - GymReservas

## 🗄️ MODELO DE DATOS (Firestore Collections)

### 1. **users** (Colección de Usuarios)
```javascript
{
  uid: string,                    // ID de Firebase Auth
  email: string,
  role: 'superadmin' | 'admin' | 'recepcion' | 'instructor' | 'cliente',

  // Datos personales
  nombre: string,
  apellidos: string,
  dni: string,
  telefono: string,
  foto_perfil: string,            // URL de Firebase Storage
  fecha_nacimiento: Date,
  direccion: string,

  // Datos físicos (opcional para progreso)
  genero: 'masculino' | 'femenino' | 'otro',

  // Estado
  estado: 'activo' | 'inactivo' | 'suspendido',

  // Metadata
  fecha_registro: Timestamp,
  ultima_actualizacion: Timestamp,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 2. **membership_plans** (Tipos de Planes)
```javascript
{
  id: string,
  nombre: string,                 // "Plan Básico", "Plan Full", "Plan VIP"
  descripcion: string,
  duracion_tipo: 'mensual' | 'trimestral' | 'semestral' | 'anual' | 'personalizado',
  duracion_dias: number,          // 30, 90, 180, 365

  // Precio
  precio_base: number,
  descuento_porcentaje: number,   // 0-100
  precio_final: number,

  // Beneficios
  acceso_ilimitado: boolean,
  clases_incluidas: number,       // -1 para ilimitado, 0 para ninguna, N para cantidad
  acceso_areas: string[],         // ['pesas', 'cardio', 'funcional', 'spinning', etc.]
  entrenamientos_personales: number, // cantidad incluida

  // Características
  caracteristicas: string[],      // ["Acceso 24/7", "Nutricionista", etc.]

  // Estado
  activo: boolean,
  destacado: boolean,             // Para mostrar en landing

  // Metadata
  orden: number,                  // Para ordenar en UI
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 3. **memberships** (Membresías Asignadas)
```javascript
{
  id: string,
  user_id: string,                // Referencia a users
  plan_id: string,                // Referencia a membership_plans

  // Detalles del plan (snapshot al momento de compra)
  plan_nombre: string,
  plan_tipo: string,

  // Fechas
  fecha_inicio: Timestamp,
  fecha_vencimiento: Timestamp,
  dias_restantes: number,         // calculado

  // Estado
  estado: 'activa' | 'vencida' | 'pendiente_pago' | 'suspendida' | 'cancelada',

  // Pricing
  precio_base: number,
  descuento: number,
  precio_final: number,

  // Pago
  pago_id: string,                // Referencia a payments
  metodo_pago: 'efectivo' | 'yape' | 'plin' | 'tarjeta' | 'transferencia',
  referencia_pago: string,        // Código de operación
  comprobante_url: string,        // URL del voucher/foto

  // Uso
  clases_disponibles: number,     // Si tiene límite
  clases_usadas: number,

  // Renovación
  auto_renovacion: boolean,

  // Observaciones
  observaciones: string,          // Notas del admin
  motivo_suspension: string,      // Si está suspendida
  motivo_cancelacion: string,     // Si está cancelada

  // Metadata
  creado_por: string,             // user_id del admin que creó
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 4. **payments** (Historial de Pagos)
```javascript
{
  id: string,
  user_id: string,
  membership_id: string,

  // Monto
  monto: number,
  concepto: string,               // "Membresía Mensual Full"

  // Método
  metodo_pago: 'efectivo' | 'yape' | 'plin' | 'tarjeta' | 'transferencia',
  referencia: string,
  comprobante_url: string,

  // Estado
  estado: 'pagado' | 'pendiente' | 'rechazado' | 'reembolsado',

  // Fechas
  fecha_pago: Timestamp,
  fecha_registro: Timestamp,

  // Admin
  registrado_por: string,         // user_id del admin/recepción
  notas: string,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 5. **classes** (Clases Grupales)
```javascript
{
  id: string,
  nombre: string,                 // "Spinning", "Yoga", "Funcional"
  descripcion: string,
  categoria: string,              // "Cardio", "Fuerza", "Flexibilidad"

  // Instructor
  instructor_id: string,          // user_id del instructor
  instructor_nombre: string,      // desnormalizado para performance

  // Horario
  dia_semana: number,             // 0=Domingo, 1=Lunes, etc.
  hora_inicio: string,            // "18:00"
  hora_fin: string,               // "19:00"
  duracion_minutos: number,       // 60

  // Espacio
  sala: string,                   // "Sala Principal", "Sala 2"

  // Capacidad
  cupo_maximo: number,
  cupo_actual: number,            // calculado desde reservations

  // Estado
  activa: boolean,

  // Recurrencia
  recurrente: boolean,            // Si se repite semanalmente
  fecha_inicio_recurrencia: Timestamp,
  fecha_fin_recurrencia: Timestamp,

  // Metadata
  color: string,                  // Para calendario
  icono: string,                  // URL o nombre de icono

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 6. **class_schedules** (Horarios Específicos de Clases)
```javascript
{
  id: string,
  class_id: string,               // Referencia a classes

  // Fecha y hora específica
  fecha: Timestamp,               // Fecha específica de esta sesión
  hora_inicio: string,
  hora_fin: string,

  // Instructor (puede cambiar por día)
  instructor_id: string,
  instructor_nombre: string,

  // Capacidad
  cupo_maximo: number,
  reservas_count: number,
  asistencias_count: number,

  // Estado
  estado: 'programada' | 'en_curso' | 'finalizada' | 'cancelada' | 'reprogramada',
  motivo_cancelacion: string,

  // Sala
  sala: string,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 7. **reservations** (Reservas de Clases)
```javascript
{
  id: string,
  user_id: string,
  class_schedule_id: string,      // Horario específico
  class_id: string,               // Clase general (para filtros)

  // Detalles
  clase_nombre: string,
  clase_fecha: Timestamp,
  clase_hora: string,
  instructor_nombre: string,

  // Estado
  estado: 'reservada' | 'confirmada' | 'cancelada' | 'asistio' | 'no_asistio',

  // Asistencia
  asistio: boolean,
  hora_checkin: Timestamp,

  // Cancelación
  fecha_cancelacion: Timestamp,
  motivo_cancelacion: string,

  // Metadata
  reservado_por: string,          // user_id (puede ser admin o el mismo user)
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 8. **gym_checkins** (Asistencias al Gimnasio)
```javascript
{
  id: string,
  user_id: string,

  // Fecha y hora
  fecha: Timestamp,
  hora_entrada: string,           // "14:30"
  hora_salida: string,            // "16:15" (opcional)

  // Duración
  duracion_minutos: number,

  // Tipo
  tipo: 'libre' | 'clase',        // Libre o por clase reservada

  // Registrado por
  registrado_por: string,         // user_id (puede ser recepción o auto check-in)
  metodo: 'qr' | 'manual' | 'app',

  createdAt: Timestamp
}
```

### 9. **workout_routines** (Rutinas de Ejercicio)
```javascript
{
  id: string,
  user_id: string,

  // Información
  nombre: string,
  descripcion: string,
  objetivo: string,               // "Ganancia muscular", "Pérdida de peso"

  // Asignación
  asignado_por: string,           // instructor_id
  instructor_nombre: string,

  // Fechas
  fecha_inicio: Timestamp,
  fecha_fin: Timestamp,

  // Estado
  activa: boolean,

  // Ejercicios (estructura anidada o referencia a otra colección)
  ejercicios: [
    {
      dia: string,                // "Lunes", "Martes"
      grupo_muscular: string,     // "Pecho", "Espalda"
      ejercicios: [
        {
          nombre: string,
          series: number,
          repeticiones: string,   // "8-12" o "10"
          descanso: string,       // "60 seg"
          peso: string,           // "20kg" o "peso corporal"
          notas: string,
          video_url: string,
          orden: number
        }
      ]
    }
  ],

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 10. **physical_progress** (Progreso Físico)
```javascript
{
  id: string,
  user_id: string,

  // Fecha de medición
  fecha: Timestamp,

  // Medidas corporales
  peso: number,                   // kg
  altura: number,                 // cm
  imc: number,                    // calculado

  // Perímetros (cm)
  cuello: number,
  pecho: number,
  cintura: number,
  cadera: number,
  brazo_derecho: number,
  brazo_izquierdo: number,
  pierna_derecha: number,
  pierna_izquierda: number,

  // Composición corporal
  porcentaje_grasa: number,
  masa_muscular: number,

  // Fotos
  foto_frente: string,            // URL
  foto_lateral: string,
  foto_espalda: string,

  // Notas
  notas: string,

  // Registrado por
  registrado_por: string,         // user_id (instructor o admin)

  createdAt: Timestamp
}
```

### 11. **notifications** (Notificaciones)
```javascript
{
  id: string,
  user_id: string,

  // Contenido
  tipo: 'vencimiento_membresia' | 'clase_cancelada' | 'pago_pendiente' | 'nueva_rutina' | 'recordatorio_clase',
  titulo: string,
  mensaje: string,

  // Estado
  leida: boolean,
  fecha_lectura: Timestamp,

  // Acción
  accion_url: string,             // Para navegar al hacer click

  // Prioridad
  prioridad: 'baja' | 'media' | 'alta',

  createdAt: Timestamp
}
```

### 12. **gym_config** (Configuración del Gimnasio)
```javascript
{
  id: 'config',                   // Documento único

  // Info del gimnasio
  nombre: string,
  logo_url: string,
  direccion: string,
  telefono: string,
  email: string,
  redes_sociales: {
    facebook: string,
    instagram: string,
    whatsapp: string
  },

  // Horarios
  horarios: {
    lunes: { apertura: "06:00", cierre: "22:00" },
    martes: { apertura: "06:00", cierre: "22:00" },
    // ... resto de días
  },

  // Métodos de pago aceptados
  metodos_pago: ['efectivo', 'yape', 'plin', 'tarjeta'],

  // Configuraciones
  dias_aviso_vencimiento: number,  // 7 días antes
  tiempo_cancelacion_reserva: number, // horas antes

  // Políticas
  politicas_cancelacion: string,
  reglamento: string,

  updatedAt: Timestamp
}
```

---

## 🎨 ESTRUCTURA DE PANTALLAS

### 👤 PANEL CLIENTE (Usuario Normal)

#### 1. Dashboard Cliente (`/user/dashboard`)
- Resumen de membresía actual (estado, días restantes, progreso visual)
- Próximas clases reservadas
- Últimas asistencias al gym
- Notificaciones recientes

#### 2. Mi Membresía (`/user/membresia`)
- Detalle completo de membresía activa
- Historial de membresías anteriores
- Opción de renovar

#### 3. Mis Pagos (`/user/pagos`)
- Historial de pagos
- Descargar comprobantes
- Pagos pendientes

#### 4. Reservar Clases (`/user/clases`)
- Calendario semanal de clases
- Filtros por tipo/instructor
- Reservar/cancelar
- Mis próximas clases

#### 5. Mis Reservas (`/user/reservas`)
- Reservas activas
- Historial de reservas
- Asistencias

#### 6. Mi Rutina (`/user/rutina`)
- Rutina actual asignada
- Ver ejercicios por día
- Historial de rutinas

#### 7. Mi Progreso (`/user/progreso`)
- Gráficas de peso, medidas
- Fotos de progreso
- Historial de mediciones

#### 8. Mi Perfil (`/user/perfil`)
- Datos personales
- Cambiar contraseña
- Foto de perfil

---

### 👨‍💼 PANEL SUPERADMIN/ADMIN

#### 1. Dashboard Admin (`/admin/dashboard`)
- KPIs: usuarios activos, ingresos del mes, membresías activas
- Gráficas de crecimiento
- Membresías próximas a vencer
- Resumen de clases del día

#### 2. Gestión de Usuarios (`/admin/usuarios`)
- Lista de usuarios (tabla con filtros)
- Crear usuario manualmente
- Editar usuario
- Ver detalle (membresía, pagos, asistencias)
- Activar/desactivar

#### 3. Gestión de Membresías (`/admin/membresias`)
- Ver todas las membresías activas
- Asignar nueva membresía
- Renovar membresía
- Suspender/cancelar
- Filtros por estado

#### 4. Planes de Membresía (`/admin/planes`)
- Lista de planes
- Crear/editar/eliminar planes
- Configurar precios y beneficios

#### 5. Gestión de Pagos (`/admin/pagos`)
- Registrar pago manual
- Ver historial de pagos
- Filtros por método, fecha, usuario
- Exportar reporte

#### 6. Gestión de Clases (`/admin/clases`)
- Lista de clases configuradas
- Crear/editar/eliminar clase
- Asignar instructor
- Configurar horarios recurrentes

#### 7. Horarios y Reservas (`/admin/horarios`)
- Calendario semanal/mensual
- Ver reservas por clase
- Cancelar/reprogramar clases
- Ver asistencias

#### 8. Gestión de Instructores (`/admin/instructores`)
- Lista de instructores
- Crear/editar instructor
- Asignar a clases
- Ver horarios asignados

#### 9. Asistencias (`/admin/asistencias`)
- Registrar check-in manual
- Ver asistencias del día
- Historial de asistencias
- Exportar reporte

#### 10. Rutinas (`/admin/rutinas`)
- Crear rutinas personalizadas
- Asignar rutinas a usuarios
- Biblioteca de ejercicios

#### 11. Progreso Físico (`/admin/progreso`)
- Registrar mediciones de usuarios
- Ver evolución de usuarios

#### 12. Reportes (`/admin/reportes`)
- Ingresos por período
- Usuarios nuevos vs bajas
- Asistencia promedio
- Clases más populares
- Exportar a Excel/PDF

#### 13. Configuración (`/admin/configuracion`)
- Datos del gimnasio
- Horarios de atención
- Métodos de pago
- Políticas y reglamento

---

### 🎭 PANEL RECEPCIÓN

(Subset del panel admin, sin acceso a configuración ni reportes sensibles)
- Registrar usuarios
- Asignar membresías
- Registrar pagos
- Check-in de asistencias
- Ver y gestionar reservas

---

### 🏋️ PANEL INSTRUCTOR

#### 1. Mis Clases (`/instructor/clases`)
- Clases asignadas
- Ver alumnos reservados
- Marcar asistencia

#### 2. Mis Alumnos (`/instructor/alumnos`)
- Lista de alumnos activos
- Ver rutinas asignadas
- Registrar progreso

#### 3. Crear Rutinas (`/instructor/rutinas`)
- Crear/editar rutinas
- Asignar a alumnos

---

## 🔐 SISTEMA DE PERMISOS

```javascript
const PERMISOS = {
  superadmin: ['*'], // Acceso total

  admin: [
    'usuarios:leer', 'usuarios:crear', 'usuarios:editar', 'usuarios:eliminar',
    'membresias:*',
    'pagos:*',
    'clases:*',
    'reservas:*',
    'asistencias:*',
    'rutinas:*',
    'progreso:*',
    'reportes:*',
    'configuracion:editar'
  ],

  recepcion: [
    'usuarios:leer', 'usuarios:crear', 'usuarios:editar',
    'membresias:leer', 'membresias:crear', 'membresias:editar',
    'pagos:leer', 'pagos:crear',
    'reservas:*',
    'asistencias:*'
  ],

  instructor: [
    'clases:leer',
    'reservas:leer',
    'asistencias:crear',
    'rutinas:*',
    'progreso:*',
    'usuarios:leer' // Solo sus alumnos
  ],

  cliente: [
    'perfil:*',
    'membresias:leer',
    'pagos:leer',
    'clases:leer',
    'reservas:*',
    'rutinas:leer',
    'progreso:leer'
  ]
}
```

---

## 📱 COMPONENTES PRINCIPALES A CREAR

### Componentes Base
- `Card.vue` - Tarjeta contenedora
- `Button.vue` - Botón reutilizable
- `Input.vue` - Input con label y validación
- `Select.vue` - Select estilizado
- `Modal.vue` - Modal genérico
- `Table.vue` - Tabla con filtros y paginación
- `Badge.vue` - Badge de estado
- `Alert.vue` - Alertas/notificaciones
- `Loader.vue` - Spinner de carga
- `DatePicker.vue` - Selector de fechas
- `TimePicker.vue` - Selector de hora

### Componentes de Negocio
- `MembershipCard.vue` - Tarjeta de membresía
- `ClassCard.vue` - Tarjeta de clase
- `UserCard.vue` - Tarjeta de usuario
- `PaymentForm.vue` - Formulario de pago
- `ClassCalendar.vue` - Calendario de clases
- `StatsCard.vue` - Tarjeta de estadística
- `ProgressChart.vue` - Gráfica de progreso
- `ExerciseList.vue` - Lista de ejercicios
- `CheckInButton.vue` - Botón de check-in

### Layouts
- `ClientLayout.vue` - Layout para clientes
- `AdminLayout.vue` - Layout para admin/superadmin
- `InstructorLayout.vue` - Layout para instructores
- `AuthLayout.vue` - Layout para login/register

---

## 🚀 FASES DE IMPLEMENTACIÓN

### FASE 1: Infraestructura Base (2-3 días)
1. ✅ Modelo de datos documentado
2. ⬜ Crear colecciones en Firestore
3. ⬜ Servicios Firebase (CRUD para cada colección)
4. ⬜ Sistema de autenticación con roles
5. ⬜ Guards de navegación por rol
6. ⬜ Componentes base (Card, Button, Input, etc.)
7. ⬜ Layouts principales

### FASE 2: Panel de Cliente (3-4 días)
1. ⬜ Dashboard cliente
2. ⬜ Perfil y datos personales
3. ⬜ Visualización de membresía
4. ⬜ Historial de pagos
5. ⬜ Sistema de reservas de clases
6. ⬜ Vista de rutinas
7. ⬜ Progreso físico

### FASE 3: Panel de Admin (4-5 días)
1. ⬜ Dashboard admin con KPIs
2. ⬜ Gestión de usuarios (CRUD)
3. ⬜ Gestión de planes de membresía
4. ⬜ Asignación de membresías
5. ⬜ Registro de pagos
6. ⬜ Gestión de clases y horarios
7. ⬜ Gestión de instructores

### FASE 4: Funcionalidades Avanzadas (3-4 días)
1. ⬜ Sistema de asistencias (check-in)
2. ⬜ Creación de rutinas
3. ⬜ Registro de progreso físico
4. ⬜ Sistema de notificaciones
5. ⬜ Calendarios interactivos
6. ⬜ Reportes básicos

### FASE 5: Optimización y Mejoras (2-3 días)
1. ⬜ Mejorar diseño UI/UX
2. ⬜ Responsive design
3. ⬜ Validaciones y manejo de errores
4. ⬜ Performance optimization
5. ⬜ Testing integral
6. ⬜ Documentación

---

## 🎯 TIEMPO ESTIMADO TOTAL
**14-19 días de desarrollo** (dependiendo de complejidad y ajustes)

¿Procedemos con la implementación?
