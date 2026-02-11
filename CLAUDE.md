# CLAUDE.md — Vue Project Best Practices

This document provides comprehensive guidance for AI assistants (and developers) working within a Vue.js codebase. Follow these conventions to produce idiomatic, performant, and maintainable Vue code.

---

## Project Overview

This is a Vue 3 application built with modern tooling (Vite, TypeScript, Composition API). It follows component-driven architecture with a strong emphasis on composition, type safety, reactivity, and accessibility.

---

## Technology Stack

- **Framework**: Vue 3.4+ (Composition API with `<script setup>`)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **Package Manager**: pnpm (preferred) or npm
- **Styling**: Tailwind CSS / Scoped Styles / CSS Modules
- **State Management**: Pinia
- **Routing**: Vue Router 4+
- **Testing**: Vitest + Vue Test Utils + Playwright
- **Linting**: ESLint with eslint-plugin-vue, @typescript-eslint
- **Formatting**: Prettier

---

## Project Structure

```
src/
├── assets/                  # Static assets (images, fonts, SVGs)
├── components/              # Reusable UI components
│   ├── ui/                  # Primitive/generic components (BaseButton, BaseInput, BaseModal, BaseCard)
│   ├── layout/              # Layout components (AppHeader, AppFooter, AppSidebar, PageWrapper)
│   └── features/            # Feature-specific components grouped by domain
│       ├── auth/
│       ├── dashboard/
│       └── settings/
├── composables/             # Reusable Composition API functions (useAuth, useDebounce, useFetch)
├── stores/                  # Pinia stores
│   ├── auth.ts
│   ├── cart.ts
│   └── ui.ts
├── lib/                     # Utility functions, constants, and helpers
│   ├── utils.ts
│   ├── constants.ts
│   ├── api.ts               # API client configuration and helpers
│   └── validators.ts
├── pages/                   # Top-level route page components (also called views)
│   ├── HomePage.vue
│   ├── DashboardPage.vue
│   └── NotFoundPage.vue
├── router/                  # Vue Router configuration
│   └── index.ts
├── types/                   # Shared TypeScript type definitions
│   ├── api.ts
│   ├── user.ts
│   └── global.d.ts
├── plugins/                 # Vue plugins (i18n, head management, etc.)
├── directives/              # Custom Vue directives
├── styles/                  # Global styles, Tailwind config, CSS variables
│   └── globals.css
├── App.vue                  # Root application component
├── main.ts                  # Application entry point
└── vite-env.d.ts            # Vite type declarations
```

---

## Naming Conventions

### Files and Directories

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase `.vue` | `UserProfile.vue`, `DataTable.vue` |
| Base/UI components | PascalCase, prefixed with `Base` | `BaseButton.vue`, `BaseInput.vue` |
| Single-instance components | PascalCase, prefixed with `The` | `TheHeader.vue`, `TheSidebar.vue` |
| Composables | camelCase, prefixed with `use` | `useAuth.ts`, `useDebounce.ts` |
| Stores (Pinia) | camelCase, prefixed with `use`, suffixed with `Store` | `useAuthStore.ts`, `useCartStore.ts` |
| Utilities | camelCase | `formatDate.ts`, `cn.ts` |
| Types | camelCase | `user.ts`, `api.ts` |
| Constants | camelCase file, UPPER_SNAKE_CASE exports | `constants.ts` -> `export const API_BASE_URL` |
| Pages/Views | PascalCase, suffixed with `Page` or `View` | `DashboardPage.vue`, `SettingsPage.vue` |
| Test files | Same name as source, `.test.ts` suffix | `UserCard.test.ts` |
| Style files | Same name as component, `.module.css` suffix (if CSS Modules) | `Button.module.css` |
| Directives | camelCase, prefixed with `v` | `vFocus.ts`, `vClickOutside.ts` |
| Directories | kebab-case or lowercase | `components/`, `auth/`, `user-settings/` |

### Variables and Functions

| Item | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserCard`, `AppHeader` |
| Composables | camelCase, `use` prefix | `useLocalStorage()`, `useFetch()` |
| Event handlers | camelCase, `handle` prefix | `handleClick`, `handleSubmit`, `handleInputChange` |
| Emitted events | kebab-case | `update:modelValue`, `item-selected`, `form-submit` |
| Props | camelCase in script, kebab-case in template | `userName` (script) / `user-name` (template) |
| Boolean props | `is`, `has`, `can`, `should` prefix | `isLoading`, `hasError`, `canEdit` |
| Refs | camelCase | `const count = ref(0)`, `const userName = ref('')` |
| Template refs | camelCase, suffixed with `Ref` or `El` | `const inputRef = ref<HTMLInputElement>()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_PAGE_SIZE` |
| Types/Interfaces | PascalCase | `interface UserProfile {}`, `type ButtonVariant` |
| Generics | Single uppercase letter or descriptive PascalCase | `T`, `TItem`, `TResponse` |
| Enums | PascalCase name, PascalCase members | `enum Status { Active, Inactive }` |

---

## Component Patterns

### Single-File Component (SFC) Structure

Always use Single-File Components with `<script setup>` and TypeScript. Order sections consistently:

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/user'

// 2. Props
const props = defineProps<{
  user: User
  isEditable?: boolean
}>()

// 3. Emits
const emit = defineEmits<{
  'update:user': [user: User]
  'delete': [id: string]
}>()

// 4. Composables and stores
const router = useRouter()
const authStore = useAuthStore()

// 5. Reactive state
const isExpanded = ref(false)
const searchQuery = ref('')

// 6. Computed properties
const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`)
const filteredItems = computed(() =>
  props.user.items.filter(item => item.name.includes(searchQuery.value))
)

// 7. Methods
function handleEdit() {
  emit('update:user', { ...props.user, isEditing: true })
}

function handleDelete() {
  emit('delete', props.user.id)
}

// 8. Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div class="user-card">
    <h2>{{ fullName }}</h2>
    <p>{{ user.email }}</p>
    <BaseButton v-if="isEditable" @click="handleEdit">Edit</BaseButton>
    <BaseButton variant="danger" @click="handleDelete">Delete</BaseButton>
  </div>
</template>

<style scoped>
.user-card {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}
</style>
```

### defineProps — Typed Props

Always use the type-based declaration with `defineProps<T>()`. Use `withDefaults()` when you need default values.

```vue
<script setup lang="ts">
// Type-only props (preferred)
const props = defineProps<{
  title: string
  count: number
  items: string[]
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
}>()

// With defaults
const props = withDefaults(defineProps<{
  title: string
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  items?: string[]
}>(), {
  variant: 'primary',
  isLoading: false,
  items: () => [],  // Factory function for non-primitive defaults
})
</script>
```

### defineEmits — Typed Events

Use the type-based declaration with labeled tuple elements for clarity.

```vue
<script setup lang="ts">
// Type-based emits (preferred)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [data: FormData]
  'delete': [id: string]
  'change': [value: string, oldValue: string]
  'close': []
}>()

// Usage
emit('update:modelValue', 'new value')
emit('submit', formData)
emit('close')
</script>
```

### defineSlots — Typed Slots

Use `defineSlots` to declare expected slot signatures for full type safety.

```vue
<script setup lang="ts">
defineSlots<{
  default: (props: { item: Item; index: number }) => any
  header: (props: { title: string }) => any
  footer: () => any
  empty: () => any
}>()
</script>
```

### defineModel — Two-Way Binding

Use `defineModel` for simplified `v-model` support (Vue 3.4+).

```vue
<script setup lang="ts">
// Simple v-model
const modelValue = defineModel<string>({ required: true })

// Named v-model (v-model:title)
const title = defineModel<string>('title')

// With default value
const count = defineModel<number>('count', { default: 0 })

// Usage in template — directly mutable
// modelValue.value = 'new value'  (in script)
// v-model="modelValue"            (in parent template)
</script>

<template>
  <input :value="modelValue" @input="modelValue = ($event.target as HTMLInputElement).value" />
</template>
```

### defineExpose — Public Component API

Use `defineExpose` to explicitly expose properties and methods to parent components via template refs. By default, `<script setup>` components expose nothing.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement>()

function focus() {
  inputRef.value?.focus()
}

function clear() {
  if (inputRef.value) inputRef.value.value = ''
}

// Only these are accessible via template ref
defineExpose({ focus, clear })
</script>
```

---

## Vue 3 Composition API Best Practices

### ref vs reactive

Prefer `ref()` over `reactive()` in most cases. `ref()` works with all value types, is explicit about reactivity (`.value`), and can be safely destructured.

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

// PREFERRED — ref for primitives and objects
const count = ref(0)
const user = ref<User | null>(null)
const items = ref<Item[]>([])

// Access with .value in script
count.value++
user.value = { name: 'Alice', email: 'alice@example.com' }
items.value.push(newItem)

// In template, .value is auto-unwrapped
// {{ count }}  {{ user?.name }}

// ACCEPTABLE — reactive for complex objects when you want to avoid .value
const form = reactive({
  name: '',
  email: '',
  password: '',
})

// Direct property access (no .value)
form.name = 'Alice'

// WARNING: Cannot reassign reactive root
// form = { name: '', email: '', password: '' }  // BREAKS reactivity
```

### computed

Use `computed()` to derive values from reactive state. Computed values are cached and only re-evaluate when their dependencies change.

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('Alice')
const lastName = ref('Smith')
const items = ref<Item[]>([])
const searchQuery = ref('')

// Read-only computed (most common)
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

const filteredItems = computed(() =>
  items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const totalPrice = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// Writable computed (rare — used for v-model proxying)
const fullNameWritable = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value: string) => {
    const [first, ...rest] = value.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})
</script>
```

### watch

Use `watch()` to react to specific reactive value changes. Always clean up side effects.

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const userId = ref('1')
const searchQuery = ref('')

// Watch a single ref
watch(userId, async (newId, oldId) => {
  console.log(`Changed from ${oldId} to ${newId}`)
  const response = await fetch(`/api/users/${newId}`)
  user.value = await response.json()
})

// Watch with options
watch(userId, async (newId) => {
  const response = await fetch(`/api/users/${newId}`)
  user.value = await response.json()
}, {
  immediate: true,  // Run immediately on setup
  flush: 'post',    // Run after DOM updates
})

// Watch a getter function (for reactive object properties or computed expressions)
watch(
  () => searchQuery.value.trim(),
  (newQuery) => {
    performSearch(newQuery)
  },
  { debounce: 300 }  // Vue 3.4+ — built-in debounce is NOT available; use manual debounce
)

// Watch multiple sources
watch(
  [userId, searchQuery],
  ([newUserId, newQuery], [oldUserId, oldQuery]) => {
    fetchResults(newUserId, newQuery)
  }
)

// Deep watch (for nested object changes — use sparingly, it's expensive)
watch(
  () => form,
  (newForm) => {
    validateForm(newForm)
  },
  { deep: true }
)

// Cleanup side effects
watch(userId, async (newId, _oldId, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  try {
    const response = await fetch(`/api/users/${newId}`, { signal: controller.signal })
    user.value = await response.json()
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    console.error(error)
  }
})
</script>
```

### watchEffect

Use `watchEffect()` to automatically track reactive dependencies. It runs immediately and re-runs whenever any reactive dependency changes.

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const userId = ref('1')
const user = ref<User | null>(null)

// Automatically tracks userId — re-runs when it changes
watchEffect(async (onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  const response = await fetch(`/api/users/${userId.value}`, {
    signal: controller.signal,
  })
  user.value = await response.json()
})

// Good for syncing state, logging, DOM side effects
watchEffect(() => {
  document.title = `${user.value?.name ?? 'App'} — Dashboard`
})
</script>
```

### When to Use watch vs watchEffect

- **`watch`**: When you need the old and new values, when you want lazy execution (not immediate), when you need to watch specific sources explicitly, or when you want fine-grained control.
- **`watchEffect`**: When you want automatic dependency tracking, immediate execution, and simpler syntax for side effects that depend on multiple reactive values.

### Lifecycle Hooks

```vue
<script setup lang="ts">
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from 'vue'

onMounted(() => {
  // DOM is available, fetch initial data, set up subscriptions
  console.log('Component mounted')
})

onUnmounted(() => {
  // Cleanup timers, subscriptions, event listeners
  console.log('Component unmounted')
})

onErrorCaptured((error, instance, info) => {
  // Capture errors from child components
  console.error('Child error:', error, info)
  return false // Prevent further propagation
})

onActivated(() => {
  // Called when component is activated inside <KeepAlive>
})

onDeactivated(() => {
  // Called when component is deactivated inside <KeepAlive>
})
</script>
```

---

## State Management with Pinia

### Defining a Store

Use the Setup Store syntax (Composition API style) for consistency with component code.

```ts
// stores/auth.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  // State (use ref)
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // Getters (use computed)
  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name ?? 'Guest')

  // Actions (plain functions)
  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      user.value = data.user
      token.value = data.token
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    // Getters
    isAuthenticated,
    userName,
    // Actions
    login,
    logout,
  }
})
```

### Using a Store in Components

```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

// Use storeToRefs for reactive destructuring of state and getters
// This preserves reactivity — plain destructuring breaks it
const { user, isAuthenticated, userName } = storeToRefs(authStore)

// Actions can be destructured directly (they don't need reactivity)
const { login, logout } = authStore

async function handleLogin() {
  await login('alice@example.com', 'password')
}
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Welcome, {{ userName }}</p>
    <button @click="logout">Log Out</button>
  </div>
  <div v-else>
    <button @click="handleLogin">Log In</button>
  </div>
</template>
```

### Store Best Practices

1. **One store per domain** — `useAuthStore`, `useCartStore`, `useUIStore`. Do not create a single monolithic store.
2. **Use Setup Store syntax** — Consistent with Composition API; easier to type with TypeScript.
3. **Use `storeToRefs()`** — When destructuring state and getters from stores in components.
4. **Keep stores focused** — State, derived getters, and mutation actions. No UI logic.
5. **Persist state when needed** — Use `pinia-plugin-persistedstate` for local storage persistence.
6. **Test stores in isolation** — Stores are plain functions; test them without mounting components.

---

## Vue Router Best Practices

### Route Configuration

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/components/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
        meta: { title: 'Home', requiresAuth: false },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/DashboardPage.vue'),
        meta: { title: 'Dashboard', requiresAuth: true },
      },
      {
        path: 'users/:id',
        name: 'user-detail',
        component: () => import('@/pages/UserDetailPage.vue'),
        props: true,  // Pass route params as props
        meta: { title: 'User Detail', requiresAuth: true },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/SettingsPage.vue'),
        meta: { title: 'Settings', requiresAuth: true },
        children: [
          {
            path: 'profile',
            name: 'settings-profile',
            component: () => import('@/pages/settings/ProfilePage.vue'),
          },
          {
            path: 'security',
            name: 'settings-security',
            component: () => import('@/pages/settings/SecurityPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { title: 'Login', requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

export default router
```

### Navigation Guards

```ts
// Global guard — authentication check
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // Update document title
  document.title = `${to.meta.title ?? 'App'} — My Application`

  // Check authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Redirect logged-in users away from login page
  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }
})
```

### Lazy Loading Routes

Always use dynamic imports for route components. This enables automatic code splitting.

```ts
// GOOD — lazy loaded
component: () => import('@/pages/DashboardPage.vue')

// AVOID — eagerly loaded (increases initial bundle)
import DashboardPage from '@/pages/DashboardPage.vue'
component: DashboardPage
```

### Route Typing

```ts
// Augment route meta for type safety
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth: boolean
    roles?: string[]
  }
}
```

---

## TypeScript Patterns

### Typing Component Props

```vue
<script setup lang="ts">
// Inline type (simple components)
const props = defineProps<{
  name: string
  age: number
  isActive?: boolean
}>()

// Extracted interface (complex or reusable)
interface UserCardProps {
  user: User
  variant?: 'compact' | 'detailed'
  isEditable?: boolean
  onSelect?: (id: string) => void
}

const props = defineProps<UserCardProps>()
</script>
```

### Typing Emits

```vue
<script setup lang="ts">
// Type-based (preferred)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [data: { name: string; email: string }]
  'delete': [id: string]
}>()
</script>
```

### Typing Template Refs

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MyComponent from './MyComponent.vue'

// DOM element ref
const inputRef = ref<HTMLInputElement | null>(null)

// Component ref — use InstanceType to get the component's exposed type
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null)

onMounted(() => {
  inputRef.value?.focus()
  componentRef.value?.someExposedMethod()
})
</script>

<template>
  <input ref="inputRef" />
  <MyComponent ref="componentRef" />
</template>
```

### Typing Composables

```ts
// composables/useFetch.ts
import { ref, type Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  execute: () => Promise<void>
}

export function useFetch<T>(url: string | Ref<string>): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  async function execute() {
    isLoading.value = true
    error.value = null

    try {
      const resolvedUrl = typeof url === 'string' ? url : url.value
      const response = await fetch(resolvedUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}
```

### Typing Provide / Inject

```ts
// types/injection-keys.ts
import type { InjectionKey, Ref } from 'vue'

export interface ThemeContext {
  theme: Ref<'light' | 'dark'>
  toggleTheme: () => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')

// In provider component
import { provide, ref } from 'vue'
import { ThemeKey } from '@/types/injection-keys'

const theme = ref<'light' | 'dark'>('light')
const toggleTheme = () => { theme.value = theme.value === 'light' ? 'dark' : 'light' }
provide(ThemeKey, { theme, toggleTheme })

// In consumer component
import { inject } from 'vue'
import { ThemeKey } from '@/types/injection-keys'

const themeContext = inject(ThemeKey)
if (!themeContext) throw new Error('ThemeKey not provided')
```

---

## Styling

### Scoped Styles (Default)

Scoped styles apply only to the current component. This is the default approach.

```vue
<style scoped>
.card {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

/* Deep selector — style child components */
.card :deep(.child-class) {
  color: red;
}

/* Slotted selector — style slotted content */
.card :slotted(.slot-content) {
  font-weight: bold;
}

/* Global selector — escape scoping for specific rules */
:global(.some-global-class) {
  color: blue;
}
</style>
```

### CSS Modules

```vue
<template>
  <div :class="$style.card">
    <h2 :class="[$style.title, isActive && $style.active]">{{ title }}</h2>
  </div>
</template>

<style module>
.card {
  padding: 1rem;
  border: 1px solid #ddd;
}

.title {
  font-size: 1.25rem;
}

.active {
  color: var(--color-primary);
}
</style>
```

### Tailwind CSS

```vue
<template>
  <div class="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ title }}</h2>
    <div class="text-gray-600">
      <slot />
    </div>
  </div>
</template>
```

### v-bind in CSS (Dynamic Styles)

Use `v-bind()` in `<style>` to bind reactive values directly into CSS.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('red')
const fontSize = ref('16px')
</script>

<template>
  <p class="text">Dynamic styling</p>
</template>

<style scoped>
.text {
  color: v-bind(color);
  font-size: v-bind(fontSize);
}
</style>
```

---

## Testing Best Practices

### Component Tests (Vitest + Vue Test Utils)

```ts
// UserCard.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserCard from './UserCard.vue'

describe('UserCard', () => {
  it('renders user information', () => {
    const wrapper = mount(UserCard, {
      props: {
        user: { id: '1', name: 'Alice', email: 'alice@example.com' },
      },
    })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('alice@example.com')
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(UserCard, {
      props: {
        user: { id: '1', name: 'Alice', email: 'alice@example.com' },
        isEditable: true,
      },
    })

    await wrapper.find('[data-testid="delete-button"]').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')![0]).toEqual(['1'])
  })

  it('conditionally shows edit button', () => {
    const wrapper = mount(UserCard, {
      props: {
        user: { id: '1', name: 'Alice', email: 'alice@example.com' },
        isEditable: false,
      },
    })
    expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(false)
  })
})
```

### Testing with Pinia

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts unauthenticated', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  it('authenticates after login', async () => {
    const store = useAuthStore()
    await store.login('alice@example.com', 'password')
    expect(store.isAuthenticated).toBe(true)
    expect(store.user).not.toBeNull()
  })
})
```

### Testing Composables

```ts
import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

describe('useDebounce', () => {
  it('debounces value updates', async () => {
    vi.useFakeTimers()
    const source = ref('initial')
    const debounced = useDebounce(source, 300)

    expect(debounced.value).toBe('initial')

    source.value = 'updated'
    expect(debounced.value).toBe('initial') // Not yet updated

    vi.advanceTimersByTime(300)
    await nextTick()
    expect(debounced.value).toBe('updated') // Now updated

    vi.useRealTimers()
  })
})
```

### E2E Testing with Playwright

```ts
import { test, expect } from '@playwright/test'

test('user can log in and see dashboard', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name=email]', 'user@example.com')
  await page.fill('[name=password]', 'password123')
  await page.click('button[type=submit]')

  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('navigation between pages works', async ({ page }) => {
  await page.goto('/')
  await page.click('text=About')
  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
})
```

### Testing Principles

1. **Test behavior, not implementation.** Test what the user sees and does, not internal component state.
2. **Prefer finding elements by role, text, or test-id** — not by CSS class or tag name.
3. **Test user interactions.** Click, type, submit — test the actions a user performs.
4. **Avoid testing Vue internals.** Do not assert on `ref` values directly; assert on rendered output.
5. **Mock at the boundary.** Mock API calls and external dependencies, not internal functions.
6. **Co-locate tests.** Place `*.test.ts` files next to the components they test.
7. **Test emit calls.** Use `wrapper.emitted()` to verify that events are emitted with correct payloads.

---

## Performance Optimization

### shallowRef and shallowReactive

Use `shallowRef` when you have large objects where you only need to track the top-level reference change, not deep mutations.

```vue
<script setup lang="ts">
import { shallowRef, triggerRef } from 'vue'

// Only triggers reactivity when the ref itself is replaced, not on deep changes
const largeList = shallowRef<Item[]>([])

// This WILL trigger reactivity
largeList.value = [...largeList.value, newItem]

// This will NOT trigger reactivity (deep mutation)
largeList.value.push(newItem)

// Force trigger if you need to after a deep mutation
triggerRef(largeList)
</script>
```

### v-once

Render content only once. It will never re-render even if reactive data changes.

```vue
<template>
  <!-- Static content that never changes -->
  <div v-once>
    <h1>{{ appTitle }}</h1>
    <p>{{ appDescription }}</p>
  </div>
</template>
```

### v-memo

Cache a template sub-tree. Only re-renders when specified dependencies change.

```vue
<template>
  <!-- Only re-renders the item when item.id or selected state changes -->
  <div v-for="item in items" :key="item.id" v-memo="[item.id === selectedId]">
    <p>{{ item.name }}</p>
    <span>{{ item.id === selectedId ? 'Selected' : '' }}</span>
  </div>
</template>
```

### KeepAlive

Cache component instances to avoid repeated mounting/unmounting. Useful for tab-based UIs and route caching.

```vue
<template>
  <KeepAlive :max="10" :include="['DashboardPage', 'SettingsPage']">
    <component :is="currentTab" />
  </KeepAlive>

  <!-- With router -->
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>
```

### Lazy Loading Components

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Lazy load heavy components
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))

const HeavyChartWithOptions = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,       // Delay before showing loading component
  timeout: 10000,   // Timeout before showing error component
})
</script>
```

### Virtual Scrolling

For rendering long lists (1000+ items), use a virtual scrolling library such as `@tanstack/vue-virtual` or `vue-virtual-scroller`.

```vue
<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
import { ref } from 'vue'

const parentRef = ref<HTMLElement | null>(null)

const virtualizer = useVirtualizer({
  count: 10000,
  getScrollElement: () => parentRef.value,
  estimateSize: () => 50,
})
</script>

<template>
  <div ref="parentRef" style="overflow: auto; height: 500px;">
    <div :style="{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }">
      <div
        v-for="item in virtualizer.getVirtualItems()"
        :key="item.key"
        :style="{
          position: 'absolute',
          top: 0,
          transform: `translateY(${item.start}px)`,
          height: `${item.size}px`,
        }"
      >
        Row {{ item.index }}
      </div>
    </div>
  </div>
</template>
```

### Additional Performance Tips

1. **Use `v-show` instead of `v-if`** for elements that toggle frequently. `v-show` uses CSS `display: none` and avoids re-creating DOM elements.
2. **Use `Object.freeze()`** for large static datasets that never change (Vue will skip making them reactive).
3. **Avoid inline objects/arrays in templates** as props — they create new references every render. Use computed or constants instead.
4. **Use `markRaw()`** for values that should never be made reactive (third-party class instances, large static objects).
5. **Debounce expensive watchers** — wrap watch callbacks with a debounce utility.
6. **Avoid `v-if` and `v-for` on the same element** — `v-if` has higher priority (Vue 3) and can cause unexpected behavior. Use a `<template>` wrapper instead.

---

## Accessibility Guidelines

### Semantic HTML First

Always use the correct HTML element before reaching for ARIA attributes.

```vue
<template>
  <!-- GOOD — native button -->
  <button @click="handleClick">Submit</button>

  <!-- BAD — div pretending to be a button -->
  <div role="button" tabindex="0" @click="handleClick" @keydown.enter="handleClick">Submit</div>
</template>
```

### Key Accessibility Rules

1. **All interactive elements must be keyboard accessible.** Use native `<button>`, `<a>`, `<input>` elements which are keyboard-accessible by default.
2. **All images must have `alt` text.** Decorative images use `alt=""`.
3. **Form inputs must have labels.** Use `<label for="id">` or `aria-label`.
4. **Color is not the only indicator.** Always pair color with text, icons, or patterns.
5. **Focus management.** Modals should trap focus. Removing content should return focus to a sensible location.
6. **Use ARIA attributes correctly.** `aria-live` for dynamic content, `aria-expanded` for toggles, `aria-describedby` for additional context.
7. **Test with screen readers.** NVDA (Windows), VoiceOver (macOS), or ORCA (Linux).
8. **Use Vue's `<Teleport>`** for modals and overlays to ensure proper DOM order for assistive technology.

### Focus Management with Template Refs

```vue
<script setup lang="ts">
import { ref, nextTick } from 'vue'

const inputRef = ref<HTMLInputElement>()
const isEditing = ref(false)

async function startEditing() {
  isEditing.value = true
  await nextTick() // Wait for DOM update
  inputRef.value?.focus()
}
</script>

<template>
  <div>
    <span v-if="!isEditing" @click="startEditing">{{ text }}</span>
    <input v-else ref="inputRef" v-model="text" @blur="isEditing = false" />
  </div>
</template>
```

---

## Error Handling Patterns

### Component Error Boundaries (onErrorCaptured)

```vue
<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err, instance, info) => {
  error.value = err instanceof Error ? err : new Error(String(err))
  console.error(`Error in child component: ${info}`, err)
  return false // Prevent further propagation
})

function resetError() {
  error.value = null
}
</script>

<template>
  <div v-if="error" class="error-boundary">
    <h2>Something went wrong</h2>
    <p>{{ error.message }}</p>
    <button @click="resetError">Try Again</button>
  </div>
  <slot v-else />
</template>
```

### Async Error Handling in Composables

```ts
// composables/useAsync.ts
import { ref, type Ref } from 'vue'

interface UseAsyncReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  execute: (...args: unknown[]) => Promise<void>
}

export function useAsync<T>(fn: (...args: unknown[]) => Promise<T>): UseAsyncReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  async function execute(...args: unknown[]) {
    isLoading.value = true
    error.value = null
    try {
      data.value = await fn(...args)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}
```

### Global Error Handler

```ts
// main.ts
const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
  // Report to error tracking service (Sentry, etc.)
}

app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue warning:', msg, trace)
}
```

---

## Composables — Best Practices

Composables are the Vue equivalent of React hooks. They encapsulate and reuse stateful logic.

### Rules of Composables

1. **Name with `use` prefix** — `useAuth`, `useDebounce`, `useLocalStorage`.
2. **Call at the top level of `<script setup>`** — not inside conditionals, loops, or callbacks.
3. **Return reactive references** — return `ref`, `computed`, and functions.
4. **Clean up side effects** — use `onUnmounted` or `watchEffect`'s cleanup parameter.
5. **Accept both raw and ref arguments** — use `toValue()` (Vue 3.3+) to normalize.

### Example Composable

```ts
// composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const storedValue = ref<T>(read()) as Ref<T>

  function read(): T {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }

  watch(storedValue, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return storedValue
}
```

### Composable with Cleanup

```ts
// composables/useEventListener.ts
import { onMounted, onUnmounted, type Ref, unref } from 'vue'

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | HTMLElement | Ref<HTMLElement | undefined>,
  event: K,
  handler: (e: WindowEventMap[K]) => void,
) {
  onMounted(() => {
    const el = unref(target) ?? window
    el.addEventListener(event, handler as EventListener)
  })

  onUnmounted(() => {
    const el = unref(target) ?? window
    el.removeEventListener(event, handler as EventListener)
  })
}
```

---

## Common Anti-Patterns to Avoid

1. **Mutating props directly** — Props are read-only. Emit events to request changes from the parent. Never write to `props.value`.
2. **Using the Options API in new code** — Always use `<script setup>` with the Composition API for new components. The Options API (`data`, `methods`, `computed`) is legacy.
3. **Overusing `reactive()` over `ref()`** — `ref()` is more flexible and predictable. `reactive()` cannot hold primitives and loses reactivity when destructured.
4. **Missing `key` on `v-for`** — Always provide a unique, stable `:key`. Never use array index for dynamic lists.
5. **Placing `v-if` and `v-for` on the same element** — `v-if` has higher priority in Vue 3 and runs before `v-for`. Use a `<template>` wrapper for `v-for` and place `v-if` on child elements.
6. **Not using `storeToRefs()`** — Destructuring Pinia state without `storeToRefs()` loses reactivity. Always use `storeToRefs()` for state and getters.
7. **Watching reactive objects without `deep: true`** — `watch()` on a reactive object is shallow by default. Add `{ deep: true }` or use a getter function to watch specific properties.
8. **Using `this` in Composition API** — `this` is not available in `<script setup>`. Use refs, composables, and imported functions directly.
9. **Overusing `provide/inject` for state management** — For complex global state, use Pinia. `provide/inject` is best for dependency injection patterns (themes, configs).
10. **Not cleaning up watchers and event listeners** — Always clean up side effects in `onUnmounted` or use the `onCleanup` parameter in watchers.
11. **Creating massive monolithic components** — Split components that exceed 150-200 lines. Extract logic into composables and child components.
12. **Registering global components unnecessarily** — Use local imports in `<script setup>`. Global registration makes it hard to tree-shake unused components and obscures dependencies.
13. **Using `v-html` with untrusted content** — This creates XSS vulnerabilities. Always sanitize HTML before using `v-html`.
14. **Not leveraging TypeScript generics in composables** — Composables should be generic and type-safe. Always provide proper type annotations.
15. **Skipping error boundaries** — Use `onErrorCaptured` to gracefully handle errors in component subtrees instead of letting the entire app crash.

---

## Environment Variables

- Prefix client-exposed variables with `VITE_`: `VITE_API_URL`, `VITE_PUBLIC_KEY`.
- Access via `import.meta.env.VITE_API_URL`.
- Never expose secrets in client-side code.
- Use `.env.local` for local overrides (git-ignored).
- Use `.env.development` and `.env.production` for environment-specific values.
- Type your environment variables:

```ts
// vite-env.d.ts or env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## Git and Code Quality

- **Commit messages**: Use conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`).
- **Branch naming**: `feature/description`, `fix/description`, `refactor/description`.
- **Pre-commit**: ESLint + Prettier + TypeScript checking via Husky + lint-staged.
- **CI**: Run `vue-tsc --noEmit`, `eslint .`, `vitest run`, and `playwright test` in CI.
- **Component naming in git**: One component per file. File name matches the component name exactly.
