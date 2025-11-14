# CLAUDE.md - AI Assistant Guide for GymReservas

## Project Overview

**GymReservas** is a gym reservation system built with modern web technologies. The application allows users to register, authenticate, and manage gym reservations through a responsive web interface.

**Project Name:** gymreservas
**Version:** 0.0.0
**Type:** Single Page Application (SPA)

## Tech Stack

### Core Technologies
- **Vue 3** (v3.5.22) - Progressive JavaScript framework using Composition API with `<script setup>` syntax
- **Vite** (v7.1.7) - Next-generation frontend build tool
- **Vue Router** (v4.6.3) - Official router for Vue.js with HTML5 History mode
- **TailwindCSS** (v4.1.17) - Utility-first CSS framework
- **Firebase** (v12.5.0) - Backend services (Authentication, Firestore, Storage)

### UI Components & Icons
- **@tabler/icons-vue** (v3.35.0) - Icon library for Vue 3

### Development Tools
- **@vitejs/plugin-vue** (v6.0.1) - Official Vue plugin for Vite
- **@tailwindcss/vite** (v4.1.17) - TailwindCSS integration for Vite

## Project Structure

```
reservasgym/
├── public/                      # Static assets
│   └── vite.svg
├── src/
│   ├── assets/                  # Static assets (images, fonts, etc.)
│   │   └── vue.svg
│   ├── components/              # Reusable Vue components
│   │   └── ForgotPasswordDialog.vue
│   ├── config/                  # Configuration files
│   │   └── firebase/           # Firebase configuration modules
│   │       ├── app.js          # Firebase app initialization
│   │       ├── auth.js         # Authentication functions
│   │       ├── firestore.js    # Firestore database operations
│   │       └── storage.js      # Firebase Storage operations
│   ├── layout/                  # Layout components
│   │   └── HomeLayout.vue
│   ├── routes/                  # Router configuration
│   │   └── index.js
│   ├── views/                   # Page/View components
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   └── UserHomeView.vue
│   ├── App.vue                  # Root component
│   ├── main.js                  # Application entry point
│   └── style.css                # Global styles
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies and scripts
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation
```

## Development Setup

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Firebase project with enabled services

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reservasgym
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Fill in Firebase credentials:
     ```env
     VITE_FIREBASE_API_KEY="your-api-key"
     VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
     VITE_FIREBASE_PROJECT_ID="your-project-id"
     VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
     VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
     VITE_FIREBASE_APP_ID="your-app-id"
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Firebase Configuration

### Environment Variables
All Firebase configuration is managed through environment variables prefixed with `VITE_`. These are accessed in the code using `import.meta.env.VITE_*`.

**⚠️ SECURITY NOTE:** Never commit `.env` file to version control. Always use `.env.example` as a template.

### Firebase Modules

#### 1. **Firebase App** (`src/config/firebase/app.js`)
- Initializes Firebase application with environment-based configuration
- Exports the Firebase app instance

#### 2. **Authentication** (`src/config/firebase/auth.js`)
- **Functions:**
  - `registerUser(email, password)` - Create new user account
  - `loginUser(email, password)` - Sign in existing user
  - `logoutUser()` - Sign out current user
  - `onAuthStateChange(callback)` - Listen to auth state changes
- **Export:** `auth` - Firebase Auth instance

#### 3. **Firestore Database** (`src/config/firebase/firestore.js`)
- **Helper Functions:**
  - `colRef(path)` - Get collection reference
  - `docRef(path, id)` - Get document reference
  - `getById(path, id)` - Fetch single document
  - `getAll(path, options)` - Query collection with filters, sorting, and limits
  - `create(path, data)` - Add new document (auto-generates ID)
  - `set(path, id, data, options)` - Set document with specific ID
  - `patch(path, id, data)` - Update specific fields
  - `remove(path, id)` - Delete document
- **Auto-timestamps:** `createdAt` and `updatedAt` fields are automatically managed
- **Export:** `db`, `serverTimestamp`, `Timestamp`

#### 4. **Storage** (`src/config/firebase/storage.js`)
- **Functions:**
  - `uploadFile(file, path)` - Upload file and return URL
  - `getFileURL(path)` - Get download URL for existing file
  - `deleteFile(path)` - Delete file from storage
  - `listFiles(folderPath)` - List all files in a folder with URLs
- **Export:** `storage` - Firebase Storage instance

## Coding Conventions

### Vue Component Structure

#### Use `<script setup>` Syntax
All Vue components use the Composition API with `<script setup>` syntax:

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
</script>

<template>
  <div>{{ count }}</div>
</template>

<style scoped>
/* Component-specific styles */
</style>
```

### File Naming Conventions

- **Components:** PascalCase with descriptive names (e.g., `ForgotPasswordDialog.vue`)
- **Views:** PascalCase ending with `View` (e.g., `LoginView.vue`, `UserHomeView.vue`)
- **Layouts:** PascalCase ending with `Layout` (e.g., `HomeLayout.vue`)
- **JavaScript files:** camelCase (e.g., `index.js`, `auth.js`)
- **Configuration folders:** lowercase (e.g., `firebase/`, `routes/`)

### Import Conventions

- Use `@/` alias for absolute imports from `src/` directory
  ```javascript
  import ForgotPasswordDialog from '@/components/ForgotPasswordDialog.vue'
  import { loginUser } from '@/config/firebase/auth'
  ```

### Styling Conventions

#### TailwindCSS Usage
- **Primary approach:** Use Tailwind utility classes in templates
- **Avoid `@apply` in `<style scoped>`:** TailwindCSS v4 has issues with `@apply` in scoped styles
- **Color scheme:** Blue/Indigo gradients for primary actions
- **Design system:**
  - Rounded corners: `rounded-xl`, `rounded-3xl`
  - Shadows: `shadow-sm`, `shadow-xl`
  - Spacing: Consistent use of Tailwind spacing scale
  - Focus states: Always include `focus:outline-none focus:ring-2`

#### Example Button Styling
```vue
<button
  class="inline-flex w-full items-center justify-center rounded-xl
         px-4 py-3 font-semibold text-white
         bg-gradient-to-r from-blue-600 to-indigo-600
         shadow-sm hover:from-blue-700 hover:to-indigo-700
         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
         focus-visible:ring-blue-600
         disabled:opacity-70 disabled:cursor-not-allowed"
>
  Button Text
</button>
```

### State Management

- **Local state:** Use `ref()` for reactive values
- **Computed values:** Use `computed()` for derived state
- **Props:** Use `defineProps()` (automatically available in `<script setup>`)
- **Emits:** Use `defineEmits()` for component events
- **v-model:** Use `v-model:open` pattern for dialog/modal components

### Router Configuration

- **Route structure:** Define routes in `src/routes/index.js`
- **Lazy loading:** Use dynamic imports for non-critical routes
  ```javascript
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  }
  ```
- **Navigation:** Use `<RouterLink>` for internal navigation
- **History mode:** Uses `createWebHistory()` for clean URLs

## Common Development Patterns

### 1. Form Handling
```vue
<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)

const submit = async (e) => {
  e.preventDefault()
  loading.value = true
  try {
    // Form submission logic
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
```

### 2. Password Visibility Toggle
```vue
<script setup>
import { ref } from 'vue'
import { IconEye, IconEyeOff } from '@tabler/icons-vue'

const showPwd = ref(false)
</script>

<template>
  <input :type="showPwd ? 'text' : 'password'" />
  <button @click="showPwd = !showPwd">
    <IconEye v-if="!showPwd" />
    <IconEyeOff v-else />
  </button>
</template>
```

### 3. Loading States
```vue
<button :disabled="loading">
  <svg v-if="loading" class="animate-spin"><!-- spinner --></svg>
  {{ loading ? 'Loading...' : 'Submit' }}
</button>
```

### 4. Firebase CRUD Operations

**Create:**
```javascript
import { create } from '@/config/firebase/firestore'

const newId = await create('reservations', {
  userId: 'user123',
  date: new Date(),
  status: 'pending'
})
```

**Read:**
```javascript
import { getById, getAll } from '@/config/firebase/firestore'

// Single document
const reservation = await getById('reservations', 'doc-id')

// Query with filters
const activeReservations = await getAll('reservations', {
  w: [['status', '==', 'active']],
  sort: { field: 'date', dir: 'desc' },
  take: 10
})
```

**Update:**
```javascript
import { patch } from '@/config/firebase/firestore'

await patch('reservations', 'doc-id', {
  status: 'confirmed'
})
```

**Delete:**
```javascript
import { remove } from '@/config/firebase/firestore'

await remove('reservations', 'doc-id')
```

### 5. Authentication Flow
```javascript
import { loginUser, onAuthStateChange } from '@/config/firebase/auth'

// Sign in
const user = await loginUser('email@example.com', 'password')

// Listen to auth changes
onAuthStateChange((user) => {
  if (user) {
    // User is signed in
  } else {
    // User is signed out
  }
})
```

## Key Files Reference

### Configuration Files

| File | Purpose | Key Content |
|------|---------|-------------|
| `vite.config.js` | Vite configuration | Vue plugin, Tailwind plugin, path alias `@` → `./src` |
| `package.json` | Dependencies and scripts | Project metadata, dependencies, dev scripts |
| `.env.example` | Environment template | Required Firebase environment variables |

### Application Entry Points

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point, loads `/src/main.js` |
| `src/main.js` | JavaScript entry point, initializes Vue app and router |
| `src/App.vue` | Root Vue component, renders `<router-view>` |

### Views (Pages)

| View | Route | Purpose |
|------|-------|---------|
| `HomeView.vue` | `/` | Landing page |
| `LoginView.vue` | `/login` | User authentication |
| `RegisterView.vue` | `/register` | User registration |
| `UserHomeView.vue` | `/user` | User dashboard |

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding conventions above
   - Keep components small and focused
   - Use TypeScript-style JSDoc comments for complex functions

3. **Test your changes**
   ```bash
   npm run dev
   ```

4. **Build and verify**
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: descriptive message"
   git push origin feature/your-feature-name
   ```

### Git Commit Conventions

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Important Notes for AI Assistants

### When Making Changes

1. **Always check existing patterns** before implementing new features
2. **Use existing Firebase helper functions** in `src/config/firebase/` rather than reimplementing
3. **Follow the component structure** - keep components in `/components`, views in `/views`, layouts in `/layout`
4. **Use the `@/` alias** for imports from `src/` directory
5. **Maintain consistency** with existing styling and naming conventions
6. **Never commit sensitive data** - check that Firebase credentials stay in `.env` only

### Common Tasks

#### Adding a New View
1. Create file in `src/views/` with `PascalCase` + `View.vue` suffix
2. Add route to `src/routes/index.js`
3. Use lazy loading for non-critical routes
4. Follow existing view structure (script setup, template, scoped styles)

#### Creating a Component
1. Create file in `src/components/` with `PascalCase.vue` naming
2. Use `<script setup>` syntax
3. Define props with `defineProps()`
4. Define emits with `defineEmits()`
5. Keep components reusable and focused

#### Adding Firebase Functionality
1. Use existing helper functions from `src/config/firebase/`
2. If adding new Firebase service, create new file in `src/config/firebase/`
3. Follow the pattern of exporting helper functions
4. Handle errors with try-catch blocks
5. Use loading states for async operations

#### Working with TailwindCSS
1. Use utility classes in templates
2. Avoid `@apply` in `<style scoped>` blocks
3. Use design system colors (blue/indigo gradients for primary actions)
4. Maintain consistent spacing and border radius
5. Always include focus states for interactive elements

### Known Issues & Workarounds

1. **TailwindCSS v4 + `@apply`:** Avoid using `@apply` in scoped styles - use utility classes in templates instead
2. **Firebase import paths:** Some files import from `./firebase` while others import from `./app` - maintain consistency based on existing patterns
3. **Environment variables:** Always use `import.meta.env.VITE_*` prefix for Vite environment variables

### Testing Checklist

Before committing changes, verify:
- [ ] Application builds without errors (`npm run build`)
- [ ] Development server runs without errors (`npm run dev`)
- [ ] No console errors in browser
- [ ] Firebase operations work correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Authentication flow works (if modified)
- [ ] No sensitive data in committed files
- [ ] Code follows existing patterns and conventions

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tabler Icons](https://tabler.io/icons)

---

**Last Updated:** 2025-11-14
**Project Status:** Active Development
**Maintainer:** See repository contributors
