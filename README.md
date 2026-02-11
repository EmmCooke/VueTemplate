# Vue.js — A Comprehensive Guide

Vue.js is a progressive, incrementally-adoptable JavaScript framework for building user interfaces. Created by Evan You in 2014, Vue has grown to become one of the most popular frontend frameworks, known for its gentle learning curve, elegant API design, and exceptional documentation. Vue lets you build anything from simple interactive widgets to full-scale single-page applications.

---

## Table of Contents

1. [What Is Vue?](#what-is-vue)
2. [Core Philosophy](#core-philosophy)
3. [Getting Started](#getting-started)
4. [Single-File Components (SFCs)](#single-file-components-sfcs)
5. [Template Syntax](#template-syntax)
6. [Reactivity Deep Dive](#reactivity-deep-dive)
7. [Components](#components)
8. [Props](#props)
9. [Events (Emits)](#events-emits)
10. [Slots](#slots)
11. [Composition API In-Depth](#composition-api-in-depth)
12. [Composables](#composables)
13. [Lifecycle Hooks](#lifecycle-hooks)
14. [Provide / Inject](#provide--inject)
15. [Vue Router](#vue-router)
16. [State Management with Pinia](#state-management-with-pinia)
17. [Forms and v-model](#forms-and-v-model)
18. [Transitions and Animations](#transitions-and-animations)
19. [TypeScript Integration](#typescript-integration)
20. [Testing](#testing)
21. [Build Tools and Deployment](#build-tools-and-deployment)
22. [Performance Optimization](#performance-optimization)
23. [Accessibility](#accessibility)
24. [Common Patterns](#common-patterns)
25. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## What Is Vue?

Vue (pronounced like "view") is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript, and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.

### Key Characteristics

- **Progressive**: Vue is designed from the ground up to be incrementally adoptable. You can use it as a simple script tag to enhance static HTML, or as a full-featured framework powering a complex SPA with routing, state management, and build tooling.
- **Reactive**: Vue's reactivity system automatically tracks JavaScript state changes and efficiently updates the DOM when state changes. You change data, and the UI updates — no manual DOM manipulation.
- **Component-Based**: UIs are built from self-contained, reusable components. Each component encapsulates its own template (HTML), logic (JavaScript/TypeScript), and styles (CSS) in a Single-File Component (`.vue` file).
- **Compiler-Informed**: Vue's template compiler performs optimizations at build time. It statically analyzes templates to minimize runtime overhead, creating efficient render functions that skip unchanged parts of the DOM.
- **Two-Way Data Binding**: Vue provides built-in `v-model` for two-way binding between form inputs and application state, dramatically simplifying form handling.

### How Vue Works Under the Hood

1. **You write Single-File Components** containing `<template>`, `<script>`, and `<style>` blocks.
2. **The Vue compiler** transforms templates into optimized render functions at build time.
3. **Vue's reactivity system** creates reactive proxies around your data, tracking which components depend on which pieces of state.
4. **When reactive state changes**, Vue knows exactly which components need to re-render.
5. **Vue's virtual DOM** computes the minimal set of DOM operations needed and patches the real DOM efficiently.
6. **Compiler optimizations** (static hoisting, patch flags, tree flattening) skip over static content entirely, making updates surgical and fast.

This combination of compile-time analysis and runtime reactivity is what makes Vue both developer-friendly and performant.

---

## Core Philosophy

### Progressive Framework

Vue's "progressive" nature means you adopt only what you need:

- **Simplest**: Enhance a static HTML page with reactive behavior via a `<script>` tag.
- **Simple**: Use Single-File Components with a build step (Vite) for a better development experience.
- **Standard**: Add Vue Router for client-side routing and Pinia for state management.
- **Full-Scale**: Server-side rendering (Nuxt), static site generation, and enterprise-grade tooling.

Each layer builds on the previous one, and you never have to adopt more complexity than your project requires.

### Composition API vs Options API

Vue 3 offers two API styles for writing component logic:

- **Options API** (Vue 2 legacy): Organize logic by option type (`data`, `methods`, `computed`, `watch`). Familiar to Vue 2 developers.
- **Composition API** (recommended for Vue 3): Organize logic by feature/concern using functions. Better TypeScript support, better code reuse through composables, and more flexible.

This guide focuses exclusively on the **Composition API with `<script setup>`**, which is the recommended approach for all new Vue 3 projects.

---

## Getting Started

### Creating a New Vue Project

The recommended way to start a new Vue project is with `create-vue`, powered by Vite:

```bash
# Using npm
npm create vue@latest

# Using pnpm
pnpm create vue@latest

# Using bun
bun create vue@latest
```

The interactive CLI will ask you to configure:
- Project name
- TypeScript (Yes)
- JSX Support
- Vue Router (Yes, for SPAs)
- Pinia (Yes, for state management)
- Vitest (Yes, for unit testing)
- Playwright (Yes, for E2E testing)
- ESLint + Prettier (Yes)

### Project Structure

```
my-vue-app/
├── public/                  # Static files served as-is
│   └── favicon.ico
├── src/
│   ├── assets/              # Processed static assets (images, fonts)
│   │   └── logo.svg
│   ├── components/          # Reusable Vue components
│   │   └── HelloWorld.vue
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── stores/              # Pinia stores
│   │   └── counter.ts
│   ├── views/               # Page-level components (route targets)
│   │   ├── HomeView.vue
│   │   └── AboutView.vue
│   ├── App.vue              # Root component
│   └── main.ts              # Application entry point
├── index.html               # HTML shell — Vite's entry point
├── package.json
├── tsconfig.json            # TypeScript base configuration
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node/tooling TS config
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
├── playwright.config.ts     # Playwright configuration
└── env.d.ts                 # Environment type declarations
```

### Entry Point

```ts
// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())  // State management
app.use(router)          // Routing

app.mount('#app')
```

### Root Component

```vue
<!-- src/App.vue -->
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
```

### Running the Development Server

```bash
npm run dev        # Starts dev server at http://localhost:5173
npm run build      # Creates production build in dist/
npm run preview    # Preview the production build locally
npm run test:unit  # Run unit tests with Vitest
npm run test:e2e   # Run E2E tests with Playwright
npm run lint       # Lint and fix files
```

---

## Single-File Components (SFCs)

Single-File Components are Vue's signature feature. Each `.vue` file contains three optional blocks:

```vue
<script setup lang="ts">
// JavaScript/TypeScript logic
// Imports, reactive state, computed properties, functions
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <!-- HTML template with Vue directives -->
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
/* CSS styles scoped to this component */
button {
  padding: 0.5rem 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #33a06f;
}
</style>
```

### Why SFCs?

1. **Colocation**: Template, logic, and styles for a component live in one file, making it easy to understand and modify.
2. **Scoped styles**: CSS can be scoped to the component, preventing style leaks.
3. **Compile-time optimizations**: The Vue compiler can analyze the template and generate optimized render code.
4. **IDE support**: Full syntax highlighting, type checking, and auto-completion with Volar (the official Vue VS Code extension).
5. **Hot Module Replacement**: Changes to any block (template, script, style) trigger instant updates without losing component state.

### `<script setup>`

`<script setup>` is a compile-time syntactic sugar for using the Composition API inside SFCs. Everything declared at the top level is automatically available in the template:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'  // Auto-registered for template use

const message = ref('Hello!')  // Available as {{ message }} in template

function greet() {              // Available as @click="greet" in template
  alert(message.value)
}
</script>

<template>
  <MyComponent />
  <p>{{ message }}</p>
  <button @click="greet">Greet</button>
</template>
```

Key benefits of `<script setup>`:
- Less boilerplate (no `export default`, no `setup()` return)
- Better TypeScript inference
- Imported components are auto-registered
- Top-level bindings are automatically exposed to the template
- Better runtime performance (compiled as an inline render function)

---

## Template Syntax

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component's reactive data.

### Text Interpolation

```vue
<template>
  <!-- Mustache syntax for text interpolation -->
  <p>Message: {{ message }}</p>

  <!-- Any JavaScript expression works -->
  <p>{{ message.toUpperCase() }}</p>
  <p>{{ count + 1 }}</p>
  <p>{{ isActive ? 'Active' : 'Inactive' }}</p>
  <p>{{ formatDate(createdAt) }}</p>
  <p>{{ items.length > 0 ? `${items.length} items` : 'No items' }}</p>
</template>
```

### Raw HTML

```vue
<template>
  <!-- Renders raw HTML (be careful of XSS!) -->
  <div v-html="htmlContent"></div>
</template>
```

### Attribute Binding (v-bind)

`v-bind` (shorthand `:`) dynamically binds an attribute to an expression.

```vue
<template>
  <!-- Dynamic attributes -->
  <img :src="imageUrl" :alt="imageAlt" />
  <a :href="linkUrl" :class="linkClass">{{ linkText }}</a>
  <div :id="dynamicId"></div>

  <!-- Boolean attributes -->
  <button :disabled="isLoading">Submit</button>
  <input :readonly="isReadOnly" />

  <!-- Dynamic class binding -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  <div :class="[baseClass, isActive ? 'active' : '']"></div>
  <div :class="[{ active: isActive }, errorClass]"></div>

  <!-- Dynamic style binding -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
  <div :style="[baseStyles, overrideStyles]"></div>

  <!-- Bind multiple attributes at once -->
  <input v-bind="inputAttrs" />
  <!-- where inputAttrs = { type: 'text', placeholder: 'Enter...', id: 'my-input' } -->
</template>
```

### Conditional Rendering (v-if, v-else-if, v-else, v-show)

```vue
<template>
  <!-- v-if / v-else-if / v-else — conditionally render elements -->
  <div v-if="type === 'admin'">
    <AdminPanel />
  </div>
  <div v-else-if="type === 'editor'">
    <EditorPanel />
  </div>
  <div v-else>
    <UserPanel />
  </div>

  <!-- v-if on <template> for grouping (no extra DOM element) -->
  <template v-if="isLoggedIn">
    <h1>Welcome back!</h1>
    <p>You have {{ notifications }} new notifications</p>
  </template>

  <!-- v-show — always rendered, toggled via CSS display -->
  <!-- Better for frequent toggling; worse for initial render if hidden -->
  <p v-show="isVisible">This is toggled with display: none</p>
</template>
```

**When to use `v-if` vs `v-show`:**
- **`v-if`**: Higher toggle cost (creates/destroys DOM elements), lower initial cost if initially hidden. Use when the condition rarely changes.
- **`v-show`**: Lower toggle cost (only CSS change), higher initial cost (always rendered). Use when toggling frequently.

### List Rendering (v-for)

```vue
<template>
  <!-- Array iteration -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }} — ${{ item.price }}
    </li>
  </ul>

  <!-- With index -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}. {{ item.name }}
    </li>
  </ul>

  <!-- Object iteration -->
  <ul>
    <li v-for="(value, key, index) in userObject" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>

  <!-- Range -->
  <span v-for="n in 10" :key="n">{{ n }}</span>

  <!-- v-for on <template> for multiple root elements -->
  <template v-for="item in items" :key="item.id">
    <h3>{{ item.title }}</h3>
    <p>{{ item.description }}</p>
    <hr />
  </template>

  <!-- With v-if — use <template> wrapper, never on the same element -->
  <template v-for="item in items" :key="item.id">
    <li v-if="item.isVisible">{{ item.name }}</li>
  </template>
</template>
```

### Key Rules for v-for

1. **Always provide a `:key`** — It helps Vue track element identity for efficient DOM patching.
2. **Use stable, unique IDs** — Database IDs, UUIDs, or other persistent identifiers.
3. **Never use array index as key** for dynamic lists that can be reordered, filtered, or modified.
4. **Never place `v-if` and `v-for` on the same element** — Use a `<template>` wrapper for `v-for`.

### Event Handling (v-on)

`v-on` (shorthand `@`) attaches event listeners.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function handleClick(event: MouseEvent) {
  console.log('Clicked at', event.clientX, event.clientY)
}

function handleSubmit(event: Event) {
  event.preventDefault()
  console.log('Form submitted')
}

function handleKeyPress(event: KeyboardEvent) {
  console.log('Key pressed:', event.key)
}

function greet(name: string) {
  alert(`Hello, ${name}!`)
}
</script>

<template>
  <!-- Basic event -->
  <button @click="count++">Count: {{ count }}</button>

  <!-- Method handler -->
  <button @click="handleClick">Click Me</button>

  <!-- Inline handler with argument -->
  <button @click="greet('Alice')">Greet Alice</button>

  <!-- Access event in inline handler -->
  <button @click="(event) => handleClick(event)">Click</button>

  <!-- Event modifiers -->
  <form @submit.prevent="handleSubmit">...</form>        <!-- preventDefault() -->
  <a @click.stop="handleClick">...</a>                   <!-- stopPropagation() -->
  <div @click.self="handleClick">...</div>               <!-- Only if target is the element itself -->
  <button @click.once="handleClick">One-time</button>    <!-- Fire only once -->
  <div @scroll.passive="onScroll">...</div>              <!-- Passive listener for performance -->

  <!-- Key modifiers -->
  <input @keyup.enter="handleSubmit" />
  <input @keyup.escape="handleCancel" />
  <input @keydown.ctrl.s="handleSave" />
  <input @keyup.alt.enter="handleAltEnter" />

  <!-- Mouse modifiers -->
  <button @click.left="handleClick">Left Click</button>
  <button @click.right.prevent="handleContextMenu">Right Click</button>
  <button @click.middle="handleMiddleClick">Middle Click</button>
</template>
```

### Two-Way Binding (v-model)

`v-model` creates two-way bindings on form inputs, textareas, and select elements.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const checked = ref(false)
const selected = ref('')
const multiSelected = ref<string[]>([])
const picked = ref('one')
</script>

<template>
  <!-- Text input -->
  <input v-model="message" placeholder="Type something" />
  <p>Message: {{ message }}</p>

  <!-- Textarea -->
  <textarea v-model="message" placeholder="Multi-line text"></textarea>

  <!-- Checkbox (boolean) -->
  <input type="checkbox" v-model="checked" id="check" />
  <label for="check">Checked: {{ checked }}</label>

  <!-- Multiple checkboxes (array) -->
  <input type="checkbox" v-model="multiSelected" value="apple" id="apple" />
  <label for="apple">Apple</label>
  <input type="checkbox" v-model="multiSelected" value="banana" id="banana" />
  <label for="banana">Banana</label>

  <!-- Radio buttons -->
  <input type="radio" v-model="picked" value="one" id="one" />
  <label for="one">One</label>
  <input type="radio" v-model="picked" value="two" id="two" />
  <label for="two">Two</label>

  <!-- Select dropdown -->
  <select v-model="selected">
    <option disabled value="">Please select</option>
    <option value="a">Option A</option>
    <option value="b">Option B</option>
    <option value="c">Option C</option>
  </select>

  <!-- v-model modifiers -->
  <input v-model.trim="message" />         <!-- Trims whitespace -->
  <input v-model.number="age" />           <!-- Casts to number -->
  <input v-model.lazy="message" />         <!-- Syncs on change instead of input -->
</template>
```

---

## Reactivity Deep Dive

Vue's reactivity system is the foundation of the framework. Understanding it deeply is essential for writing correct and performant Vue applications.

### ref()

`ref()` creates a reactive reference for any value type (primitives, objects, arrays).

```vue
<script setup lang="ts">
import { ref } from 'vue'

// Primitives
const count = ref(0)
const name = ref('Alice')
const isActive = ref(true)

// Objects and arrays
const user = ref<User | null>(null)
const items = ref<Item[]>([])

// Access and mutate with .value in script
count.value++
name.value = 'Bob'
user.value = { id: '1', name: 'Alice', email: 'alice@example.com' }
items.value.push({ id: '1', name: 'New Item' })

// In templates, .value is automatically unwrapped
// {{ count }}  not  {{ count.value }}
</script>
```

### reactive()

`reactive()` creates a reactive proxy for objects. Unlike `ref`, there is no `.value` wrapper — you access properties directly.

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Alice',
  items: [] as Item[],
})

// Direct property access
state.count++
state.name = 'Bob'
state.items.push({ id: '1', name: 'New Item' })

// WARNING: Cannot reassign the entire object
// state = { count: 0, name: '', items: [] }  // BREAKS reactivity!

// WARNING: Destructuring loses reactivity
// const { count } = state  // count is NOT reactive!
</script>
```

### ref() vs reactive() — When to Use Which

| Feature | `ref()` | `reactive()` |
|---|---|---|
| Value types | Any (primitives, objects, arrays) | Objects only (no primitives) |
| Access in script | `.value` required | Direct property access |
| Access in template | Auto-unwrapped (no `.value`) | Direct property access |
| Reassignment | `ref.value = newValue` works | Cannot reassign root |
| Destructuring | Safe (wrap in `toRefs()`) | Loses reactivity |
| **Recommendation** | **Preferred for most cases** | Use for complex form state |

### computed()

Computed values are derived from reactive state. They are cached and only re-evaluate when their reactive dependencies change.

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('Alice')
const lastName = ref('Smith')
const items = ref<{ name: string; price: number; quantity: number }[]>([])

// Read-only computed
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

const totalPrice = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const expensiveItems = computed(() =>
  items.value.filter(item => item.price > 100)
)

// Writable computed
const fullNameWritable = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newValue: string) => {
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})

// Usage
fullNameWritable.value = 'Bob Johnson'
// firstName.value is now 'Bob'
// lastName.value is now 'Johnson'
</script>
```

### watch()

`watch()` executes a callback whenever watched reactive sources change.

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')
const userId = ref(1)
const user = ref<User | null>(null)

// Watch a single ref
watch(searchQuery, (newValue, oldValue) => {
  console.log(`Search changed from "${oldValue}" to "${newValue}"`)
  performSearch(newValue)
})

// Watch with immediate execution
watch(userId, async (newId) => {
  const response = await fetch(`/api/users/${newId}`)
  user.value = await response.json()
}, { immediate: true })  // Runs immediately with current value

// Watch a getter function
watch(
  () => user.value?.name,
  (newName, oldName) => {
    console.log(`Name changed from ${oldName} to ${newName}`)
  }
)

// Watch multiple sources
watch(
  [searchQuery, userId],
  ([newQuery, newId], [oldQuery, oldId]) => {
    console.log('Query or user changed')
  }
)

// Deep watch
const formData = ref({ name: '', email: '', address: { city: '', zip: '' } })
watch(formData, (newValue) => {
  console.log('Form changed:', newValue)
}, { deep: true })

// Cleanup function for cancelling async operations
watch(userId, async (newId, oldId, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  try {
    const response = await fetch(`/api/users/${newId}`, {
      signal: controller.signal,
    })
    user.value = await response.json()
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    console.error('Fetch error:', error)
  }
})

// Stop a watcher manually
const stopWatching = watch(searchQuery, (newValue) => {
  if (newValue === 'done') {
    stopWatching()  // Unregister the watcher
  }
})
</script>
```

### watchEffect()

`watchEffect()` automatically tracks reactive dependencies and re-runs when any of them change.

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const user = ref<User | null>(null)

// Automatically tracks userId.value — re-runs when it changes
watchEffect(async (onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  const response = await fetch(`/api/users/${userId.value}`, {
    signal: controller.signal,
  })
  user.value = await response.json()
})

// Sync document title
watchEffect(() => {
  document.title = `User: ${user.value?.name ?? 'Loading...'}`
})
</script>
```

### watchPostEffect() and watchSyncEffect()

```vue
<script setup lang="ts">
import { watchPostEffect, watchSyncEffect } from 'vue'

// Runs after Vue has updated the DOM (alias for watchEffect with flush: 'post')
watchPostEffect(() => {
  // Safe to access updated DOM here
  console.log(document.getElementById('my-element')?.textContent)
})

// Runs synchronously (before DOM updates) — use carefully
watchSyncEffect(() => {
  // Runs immediately on every reactive change, before batching
})
</script>
```

### Utility Functions

```vue
<script setup lang="ts">
import {
  ref,
  reactive,
  toRef,
  toRefs,
  toValue,
  isRef,
  unref,
  shallowRef,
  triggerRef,
  markRaw,
} from 'vue'

const state = reactive({ name: 'Alice', age: 30 })

// toRef — create a ref linked to a reactive object property
const nameRef = toRef(state, 'name')
nameRef.value = 'Bob'  // Also updates state.name

// toRefs — convert all properties to refs (safe destructuring)
const { name, age } = toRefs(state)
name.value = 'Charlie'  // Also updates state.name

// toValue (Vue 3.3+) — normalize ref or getter to plain value
function doSomething(maybeRef: string | Ref<string> | (() => string)) {
  const value = toValue(maybeRef)  // Always gets the plain string
}

// isRef — check if a value is a ref
if (isRef(count)) {
  count.value++
}

// unref — get value from ref, or return as-is if not a ref
const plainValue = unref(count)  // Same as isRef(count) ? count.value : count

// shallowRef — only tracks .value replacement, not deep changes
const largeList = shallowRef<Item[]>([])
largeList.value = [...largeList.value, newItem]  // Triggers reactivity
largeList.value.push(newItem)  // Does NOT trigger reactivity

// triggerRef — force trigger reactivity on a shallowRef
triggerRef(largeList)

// markRaw — mark an object to never be made reactive
const rawData = markRaw({ complexThirdPartyObject: true })
</script>
```

---

## Components

Components are the building blocks of a Vue application. Each component is a self-contained unit with its own template, logic, and styles.

### Component Registration

In `<script setup>`, imported components are automatically available in the template:

```vue
<script setup lang="ts">
// Auto-registered — just import and use
import UserCard from './UserCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { SomeExternalComponent } from 'some-library'
</script>

<template>
  <UserCard :user="currentUser" />
  <BaseButton @click="handleClick">Click Me</BaseButton>
  <SomeExternalComponent />
</template>
```

### Dynamic Components

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import TabHome from './TabHome.vue'
import TabProfile from './TabProfile.vue'
import TabSettings from './TabSettings.vue'

const tabs = { home: TabHome, profile: TabProfile, settings: TabSettings }
const currentTab = ref<keyof typeof tabs>('home')

// Use shallowRef for component references to avoid deep reactivity overhead
const currentComponent = shallowRef(TabHome)
</script>

<template>
  <div>
    <button
      v-for="(comp, name) in tabs"
      :key="name"
      :class="{ active: currentTab === name }"
      @click="currentTab = name"
    >
      {{ name }}
    </button>

    <component :is="tabs[currentTab]" />
  </div>
</template>
```

---

## Props

Props are the mechanism for passing data from parent to child components. Props are read-only in the child.

### Defining Props

```vue
<script setup lang="ts">
// Type-based declaration (preferred with TypeScript)
const props = defineProps<{
  title: string
  count: number
  items: string[]
  user: User
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
}>()

// Access in script
console.log(props.title)
console.log(props.isLoading)
</script>

<template>
  <!-- Access in template (no "props." prefix needed) -->
  <h1>{{ title }}</h1>
  <span v-if="isLoading">Loading...</span>
</template>
```

### Default Values

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  items?: string[]
  config?: { theme: string; lang: string }
}>(), {
  variant: 'primary',
  isLoading: false,
  items: () => [],            // Factory function for arrays
  config: () => ({            // Factory function for objects
    theme: 'light',
    lang: 'en',
  }),
})
</script>
```

### Prop Validation Rules

1. **Props are read-only** — never mutate a prop in the child component.
2. **Use camelCase in script, kebab-case in templates** — Vue automatically converts between them.
3. **Required props have no `?` in the type** — TypeScript enforces this.
4. **Use factory functions for non-primitive defaults** — Arrays, objects, and functions must use `() => value` to avoid shared references.

### Passing Props

```vue
<template>
  <!-- Static string -->
  <UserCard title="Hello" />

  <!-- Dynamic binding -->
  <UserCard :title="dynamicTitle" :count="itemCount" :user="currentUser" />

  <!-- Boolean shorthand -->
  <UserCard is-loading />        <!-- is-loading === :is-loading="true" -->
  <UserCard :is-loading="false" />

  <!-- Bind all properties of an object as props -->
  <UserCard v-bind="userProps" />
  <!-- Equivalent to: <UserCard :name="userProps.name" :email="userProps.email" ... /> -->
</template>
```

---

## Events (Emits)

Child components communicate with parents by emitting events.

### Defining and Emitting Events

```vue
<!-- ChildComponent.vue -->
<script setup lang="ts">
// Type-based declaration (preferred)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [data: { name: string; email: string }]
  'delete': [id: string]
  'close': []
}>()

function handleSubmit() {
  emit('submit', { name: 'Alice', email: 'alice@example.com' })
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <button @click="handleSubmit">Submit</button>
  <button @click="handleClose">Close</button>
</template>
```

### Listening to Events

```vue
<!-- ParentComponent.vue -->
<script setup lang="ts">
function handleSubmit(data: { name: string; email: string }) {
  console.log('Received:', data)
}

function handleClose() {
  console.log('Dialog closed')
}
</script>

<template>
  <ChildComponent @submit="handleSubmit" @close="handleClose" />

  <!-- Inline handler -->
  <ChildComponent @submit="(data) => console.log(data)" />
</template>
```

### Event Naming Conventions

- Use **kebab-case** for event names: `item-selected`, `form-submit`, `update:model-value`.
- Vue automatically converts camelCase emit declarations to kebab-case listeners.
- Prefix update events with `update:` for v-model compatibility.

---

## Slots

Slots allow parent components to inject content into child component templates, enabling powerful composition patterns.

### Default Slot

```vue
<!-- BaseCard.vue -->
<template>
  <div class="card">
    <slot />  <!-- Parent content goes here -->
  </div>
</template>

<!-- Usage -->
<BaseCard>
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</BaseCard>
```

### Named Slots

```vue
<!-- PageLayout.vue -->
<template>
  <div class="page">
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />  <!-- default slot -->
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- Usage -->
<PageLayout>
  <template #header>
    <h1>Page Title</h1>
  </template>

  <!-- Default slot content (no #default needed, but you can use it) -->
  <p>Main content here.</p>

  <template #footer>
    <p>Footer content</p>
  </template>
</PageLayout>
```

### Scoped Slots

Slots can pass data back to the parent, allowing the parent to customize rendering while the child provides the data.

```vue
<!-- ItemList.vue -->
<script setup lang="ts">
defineProps<{
  items: Item[]
}>()
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- Pass item data to the parent's slot content -->
      <slot :item="item" :index="index">
        <!-- Default content if slot not provided -->
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

<!-- Usage — parent receives slot props -->
<ItemList :items="products">
  <template #default="{ item }">
    <div class="product-card">
      <img :src="item.image" :alt="item.name" />
      <h3>{{ item.name }}</h3>
      <p>${{ item.price }}</p>
    </div>
  </template>
</ItemList>
```

### Conditional Slots

Check if a slot has content using `$slots`:

```vue
<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
const hasHeader = computed(() => !!slots.header)
</script>

<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

---

## Composition API In-Depth

The Composition API is a set of APIs that allows you to author Vue components using imported functions instead of declaring options.

### script setup

`<script setup>` is the recommended way to use the Composition API in SFCs:

```vue
<script setup lang="ts">
// Everything here runs once when the component is set up

// Imports
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Props and emits
const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ 'update': [user: User] }>()

// Composables
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const user = ref<User | null>(null)
const isEditing = ref(false)

// Computed
const displayName = computed(() => user.value?.name ?? 'Unknown')

// Methods
async function fetchUser() {
  const response = await fetch(`/api/users/${props.userId}`)
  user.value = await response.json()
}

function startEditing() {
  isEditing.value = true
}

// Watchers
watch(() => props.userId, fetchUser, { immediate: true })

// Lifecycle
onMounted(() => {
  console.log('Component mounted with userId:', props.userId)
})
</script>
```

### Composables — Reusable Logic

Composables are functions that encapsulate and reuse stateful logic. They are the Composition API equivalent of mixins but without their drawbacks.

```ts
// composables/useMousePosition.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(event: MouseEvent) {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// Usage in a component
// <script setup>
// import { useMousePosition } from '@/composables/useMousePosition'
// const { x, y } = useMousePosition()
// </script>
```

```ts
// composables/useDebounce.ts
import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay: number = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  return debounced
}
```

```ts
// composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const stored = ref(read()) as Ref<T>

  function read(): T {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }

  watch(stored, (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, { deep: true })

  return stored
}
```

### Composable Design Principles

1. **Name with `use` prefix**: `useAuth`, `useFetch`, `useDebounce`.
2. **Return reactive refs**: Always return `ref` or `computed` values so consumers get reactivity.
3. **Accept refs as arguments**: Use `toValue()` to accept both raw values and refs.
4. **Clean up side effects**: Use lifecycle hooks (`onUnmounted`) or watcher cleanup (`onCleanup`).
5. **Single responsibility**: Each composable does one thing well.
6. **Call at setup top-level**: Like React hooks, composables must be called at the top level of `<script setup>`.

---

## Lifecycle Hooks

Lifecycle hooks let you execute code at specific phases of a component's existence.

```
Creation:     setup() runs (Composition API code)
                ↓
Mounting:     onBeforeMount → DOM created → onMounted
                ↓
Updating:     onBeforeUpdate → DOM patched → onUpdated
                ↓
Unmounting:   onBeforeUnmount → DOM removed → onUnmounted
```

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from 'vue'

// MOUNTING
onBeforeMount(() => {
  // Called before the component is mounted to the DOM
  // DOM is not yet available
})

onMounted(() => {
  // Called after the component is mounted
  // DOM is available — safe to access refs, set up subscriptions, fetch data
  console.log('Component mounted')
})

// UPDATING
onBeforeUpdate(() => {
  // Called before the DOM is re-rendered due to a reactive state change
})

onUpdated(() => {
  // Called after the DOM has been re-rendered
  // Avoid changing state here — it can cause infinite loops
})

// UNMOUNTING
onBeforeUnmount(() => {
  // Called before the component is unmounted
  // Component is still fully functional
})

onUnmounted(() => {
  // Called after the component is unmounted
  // Clean up timers, subscriptions, event listeners
})

// KEEP-ALIVE
onActivated(() => {
  // Called when a kept-alive component is re-activated
})

onDeactivated(() => {
  // Called when a kept-alive component is deactivated
})

// ERROR HANDLING
onErrorCaptured((error, instance, info) => {
  // Captures errors from descendant components
  console.error('Caught error:', error, 'in', info)
  return false // Prevent propagation
})
</script>
```

---

## Provide / Inject

Provide and inject allow ancestor components to serve as dependency providers for all descendants, regardless of how deep the component hierarchy is.

```vue
<!-- ProviderComponent.vue (ancestor) -->
<script setup lang="ts">
import { provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// Define typed injection key
export interface ThemeContext {
  theme: Ref<'light' | 'dark'>
  toggleTheme: () => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')

const theme = ref<'light' | 'dark'>('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide(ThemeKey, { theme, toggleTheme })
</script>
```

```vue
<!-- ConsumerComponent.vue (any descendant) -->
<script setup lang="ts">
import { inject } from 'vue'
import { ThemeKey, type ThemeContext } from './ProviderComponent.vue'

// Inject with type safety
const themeContext = inject(ThemeKey)

// Or with a default value
const themeContext = inject(ThemeKey, {
  theme: ref('light'),
  toggleTheme: () => {},
})

// Or throw if not provided
const themeContext = inject(ThemeKey)
if (!themeContext) throw new Error('ThemeKey must be provided by an ancestor')
</script>

<template>
  <div :class="themeContext.theme.value">
    <button @click="themeContext.toggleTheme">Toggle Theme</button>
  </div>
</template>
```

### When to Use Provide/Inject

- **Theme, locale, feature flags** — Cross-cutting concerns shared across many components.
- **Plugin APIs** — Libraries providing functionality to nested components (form validation context, toast notifications).
- **Avoiding prop drilling** — When data needs to pass through many intermediate components.

### When NOT to Use Provide/Inject

- **Application-wide state** — Use Pinia instead.
- **Parent-child communication** — Use props and emits for direct relationships.
- **Sibling communication** — Use a shared Pinia store.

---

## Vue Router

Vue Router is the official client-side routing solution for Vue.js.

### Setup

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/pages/AboutPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
```

### Dynamic Routes

```ts
const routes: RouteRecordRaw[] = [
  // Required parameter
  {
    path: '/users/:id',
    name: 'user-detail',
    component: () => import('@/pages/UserDetailPage.vue'),
    props: true,  // Pass :id as a prop to the component
  },
  // Optional parameter
  {
    path: '/posts/:year?/:month?',
    name: 'post-archive',
    component: () => import('@/pages/PostArchivePage.vue'),
  },
  // Regex parameter
  {
    path: '/articles/:id(\\d+)',  // Only matches numeric IDs
    name: 'article',
    component: () => import('@/pages/ArticlePage.vue'),
  },
  // Catch-all / 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]
```

### Using the Router in Components

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()    // Current route info
const router = useRouter()  // Router instance for navigation

// Access route params
console.log(route.params.id)       // Dynamic segment
console.log(route.query.search)    // Query string ?search=...
console.log(route.hash)            // Hash fragment #...
console.log(route.name)            // Named route
console.log(route.meta)            // Route metadata

// Programmatic navigation
function goToUser(id: string) {
  router.push({ name: 'user-detail', params: { id } })
}

function goBack() {
  router.back()
  // or: router.go(-1)
}

function replaceRoute() {
  router.replace({ path: '/new-path' })  // Replaces current history entry
}
</script>

<template>
  <!-- Declarative navigation -->
  <RouterLink to="/">Home</RouterLink>
  <RouterLink :to="{ name: 'user-detail', params: { id: '123' } }">User 123</RouterLink>
  <RouterLink to="/about" active-class="text-blue-600">About</RouterLink>

  <!-- Route outlet -->
  <RouterView />

  <!-- Named route outlet with transitions -->
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition ?? 'fade'" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
```

### Navigation Guards

Guards let you control navigation, enforce authentication, and perform side effects.

```ts
// Global guards (in router/index.ts)
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // Set page title
  document.title = `${String(to.meta.title ?? 'App')} — My Application`

  // Authentication check
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Redirect authenticated users away from login
  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

router.afterEach((to, from) => {
  // Analytics, scroll behavior, etc.
  trackPageView(to.fullPath)
})
```

```ts
// Per-route guards
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('@/pages/AdminPage.vue'),
    beforeEnter: (to, from) => {
      const authStore = useAuthStore()
      if (authStore.user?.role !== 'admin') {
        return { name: 'home' }
      }
    },
  },
]
```

```vue
<!-- In-component guards -->
<script setup lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// Prevent leaving with unsaved changes
onBeforeRouteLeave((to, from) => {
  if (hasUnsavedChanges.value) {
    const answer = window.confirm('You have unsaved changes. Leave anyway?')
    if (!answer) return false
  }
})

// React to param changes on the same route
onBeforeRouteUpdate((to, from) => {
  // e.g., /users/1 -> /users/2
  fetchUser(to.params.id as string)
})
</script>
```

### Nested Routes

```ts
const routes: RouteRecordRaw[] = [
  {
    path: '/settings',
    component: () => import('@/pages/SettingsPage.vue'),
    children: [
      {
        path: '',            // /settings
        name: 'settings',
        redirect: { name: 'settings-profile' },
      },
      {
        path: 'profile',    // /settings/profile
        name: 'settings-profile',
        component: () => import('@/pages/settings/ProfilePage.vue'),
      },
      {
        path: 'security',   // /settings/security
        name: 'settings-security',
        component: () => import('@/pages/settings/SecurityPage.vue'),
      },
      {
        path: 'notifications',  // /settings/notifications
        name: 'settings-notifications',
        component: () => import('@/pages/settings/NotificationsPage.vue'),
      },
    ],
  },
]
```

```vue
<!-- SettingsPage.vue -->
<template>
  <div class="settings-layout">
    <nav class="settings-sidebar">
      <RouterLink :to="{ name: 'settings-profile' }">Profile</RouterLink>
      <RouterLink :to="{ name: 'settings-security' }">Security</RouterLink>
      <RouterLink :to="{ name: 'settings-notifications' }">Notifications</RouterLink>
    </nav>
    <div class="settings-content">
      <RouterView />  <!-- Child routes render here -->
    </div>
  </div>
</template>
```

### Lazy Loading Routes

Always use dynamic imports for route components to enable code splitting:

```ts
// GOOD — lazy loaded (separate chunk)
component: () => import('@/pages/DashboardPage.vue')

// AVOID — eagerly loaded (included in main bundle)
import DashboardPage from '@/pages/DashboardPage.vue'
// component: DashboardPage
```

### Route Meta Typing

```ts
// Augment route meta for type safety
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    roles?: string[]
    transition?: string
  }
}
```

---

## State Management with Pinia

Pinia is the official state management library for Vue 3. It provides a simple, type-safe API for managing global application state.

### Creating a Store

Pinia supports two syntax styles. The **Setup Store** syntax (Composition API) is recommended for consistency.

```ts
// stores/counter.ts — Setup Store (recommended)
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const name = ref('Counter')

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const countMessage = computed(() => `${name.value}: ${count.value}`)

  // Actions
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  async function incrementAsync() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    count.value++
  }

  return {
    count,
    name,
    doubleCount,
    countMessage,
    increment,
    decrement,
    reset,
    incrementAsync,
  }
})
```

```ts
// stores/counter.ts — Option Store (alternative)
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    countMessage(): string {
      return `${this.name}: ${this.count}`
    },
  },
  actions: {
    increment() {
      this.count++
    },
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.count++
    },
  },
})
```

### A Real-World Store

```ts
// stores/auth.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiClient } from '@/lib/api'
import type { User, LoginCredentials } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userDisplayName = computed(() => user.value?.name ?? 'Guest')
  const userInitials = computed(() => {
    if (!user.value?.name) return '?'
    return user.value.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  })

  // Actions
  async function login(credentials: LoginCredentials) {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })

      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth_token', response.token)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed'
      throw e
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  async function fetchCurrentUser() {
    if (!token.value) return

    try {
      user.value = await apiClient<User>('/auth/me')
    } catch {
      logout()
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userDisplayName,
    userInitials,
    login,
    logout,
    fetchCurrentUser,
  }
})
```

### Using Stores in Components

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()

// IMPORTANT: Use storeToRefs for state and getters to preserve reactivity
const { count, doubleCount, countMessage } = storeToRefs(counterStore)

// Actions can be destructured directly
const { increment, decrement, reset } = counterStore
</script>

<template>
  <div>
    <p>{{ countMessage }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

### Store Plugins

```ts
// plugins/pinia-logger.ts
import type { PiniaPlugin } from 'pinia'

export const piniaLogger: PiniaPlugin = ({ store }) => {
  store.$onAction(({ name, args, after, onError }) => {
    console.log(`[${store.$id}] Action "${name}" called with:`, args)

    after((result) => {
      console.log(`[${store.$id}] Action "${name}" completed with:`, result)
    })

    onError((error) => {
      console.error(`[${store.$id}] Action "${name}" failed:`, error)
    })
  })
}

// main.ts
const pinia = createPinia()
pinia.use(piniaLogger)
```

### Store Subscriptions

```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Subscribe to state changes
authStore.$subscribe((mutation, state) => {
  console.log('State changed:', mutation.type, mutation.storeId)
  // Persist to localStorage, analytics, etc.
})

// Subscribe to actions
authStore.$onAction(({ name, args, after }) => {
  console.log(`Action ${name} called`)
  after(() => {
    console.log(`Action ${name} completed`)
  })
})
</script>
```

---

## Forms and v-model

### Basic Form Handling

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user',
  newsletter: false,
  interests: [] as string[],
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
})

function validate(): boolean {
  let isValid = true
  errors.name = form.name.trim() ? '' : 'Name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Invalid email'
  errors.password = form.password.length >= 8 ? '' : 'Password must be 8+ characters'

  if (errors.name || errors.email || errors.password) isValid = false
  return isValid
}

function handleSubmit() {
  if (!validate()) return
  console.log('Submitting:', { ...form })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="form.name" type="text" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div>
      <label for="password">Password</label>
      <input id="password" v-model="form.password" type="password" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <div>
      <label for="role">Role</label>
      <select id="role" v-model="form.role">
        <option value="user">User</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <div>
      <label>
        <input type="checkbox" v-model="form.newsletter" />
        Subscribe to newsletter
      </label>
    </div>

    <fieldset>
      <legend>Interests</legend>
      <label>
        <input type="checkbox" v-model="form.interests" value="tech" />
        Technology
      </label>
      <label>
        <input type="checkbox" v-model="form.interests" value="design" />
        Design
      </label>
      <label>
        <input type="checkbox" v-model="form.interests" value="business" />
        Business
      </label>
    </fieldset>

    <button type="submit">Submit</button>
  </form>
</template>
```

### Custom v-model on Components

`v-model` on components uses `modelValue` prop and `update:modelValue` event by default.

```vue
<!-- CustomInput.vue -->
<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <input
    :value="model"
    @input="model = ($event.target as HTMLInputElement).value"
    class="custom-input"
  />
</template>

<!-- Usage -->
<CustomInput v-model="username" />
```

### Multiple v-model Bindings

```vue
<!-- UserForm.vue -->
<script setup lang="ts">
const firstName = defineModel<string>('firstName', { required: true })
const lastName = defineModel<string>('lastName', { required: true })
const email = defineModel<string>('email', { required: true })
</script>

<template>
  <input :value="firstName" @input="firstName = ($event.target as HTMLInputElement).value" placeholder="First name" />
  <input :value="lastName" @input="lastName = ($event.target as HTMLInputElement).value" placeholder="Last name" />
  <input :value="email" @input="email = ($event.target as HTMLInputElement).value" placeholder="Email" type="email" />
</template>

<!-- Usage -->
<UserForm
  v-model:first-name="user.firstName"
  v-model:last-name="user.lastName"
  v-model:email="user.email"
/>
```

### Custom v-model Modifiers

```vue
<!-- CustomInput.vue -->
<script setup lang="ts">
const [model, modifiers] = defineModel<string>({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    if (modifiers.uppercase) {
      return value.toUpperCase()
    }
    return value
  },
})
</script>

<template>
  <input :value="model" @input="model = ($event.target as HTMLInputElement).value" />
</template>

<!-- Usage -->
<CustomInput v-model.capitalize="name" />
<CustomInput v-model.uppercase="code" />
```

---

## Transitions and Animations

Vue provides built-in components for applying enter/leave transitions.

### Basic Transition

```vue
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <p v-if="show">Hello, I fade in and out!</p>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

### Transition Classes

Vue applies six CSS classes during enter/leave transitions:

| Class | When Applied |
|---|---|
| `v-enter-from` | Start state of enter. Added before element is inserted, removed one frame after. |
| `v-enter-active` | Active state of enter. Applied during entire enter phase. |
| `v-enter-to` | End state of enter. Added one frame after insertion, removed when transition finishes. |
| `v-leave-from` | Start state of leave. Added immediately when leave is triggered, removed one frame after. |
| `v-leave-active` | Active state of leave. Applied during entire leave phase. |
| `v-leave-to` | End state of leave. Added one frame after leave is triggered, removed when transition finishes. |

Replace `v-` with your transition name (e.g., `fade-enter-from`).

### Slide Transition Example

```vue
<template>
  <Transition name="slide-fade">
    <div v-if="show" class="panel">Panel Content</div>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
```

### TransitionGroup for Lists

```vue
<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
])

let nextId = 4

function addItem() {
  const index = Math.floor(Math.random() * items.value.length)
  items.value.splice(index, 0, { id: nextId++, text: `Item ${nextId - 1}` })
}

function removeItem(id: number) {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <button @click="addItem">Add Item</button>

  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id" @click="removeItem(item.id)">
      {{ item.text }}
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animate moving elements */
.list-move {
  transition: transform 0.5s ease;
}

/* Ensure leaving elements are taken out of layout flow */
.list-leave-active {
  position: absolute;
}
</style>
```

### Route Transitions

```vue
<!-- App.vue -->
<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition ?? 'fade'" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
```

---

## TypeScript Integration

Vue 3 was rewritten in TypeScript and provides first-class TypeScript support.

### Configuring TypeScript

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Typing Props and Emits

```vue
<script setup lang="ts">
// Props
interface Props {
  title: string
  count?: number
  items: Item[]
  variant?: 'primary' | 'secondary'
  onSelect?: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: 'primary',
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [id: string, event: MouseEvent]
  'close': []
}>()

// Slots
defineSlots<{
  default: (props: { item: Item }) => any
  header: () => any
  footer: (props: { count: number }) => any
}>()
</script>
```

### Typing Refs

```vue
<script setup lang="ts">
import { ref, type Ref } from 'vue'

// Primitives — type is inferred
const count = ref(0)        // Ref<number>
const name = ref('Alice')   // Ref<string>
const isActive = ref(true)  // Ref<boolean>

// Nullable — specify type explicitly
const user = ref<User | null>(null)

// Template refs — DOM elements
const inputEl = ref<HTMLInputElement | null>(null)
const divEl = ref<HTMLDivElement | null>(null)

// Template refs — component instances
import MyComponent from './MyComponent.vue'
const compRef = ref<InstanceType<typeof MyComponent> | null>(null)
</script>
```

### Typing Composables

```ts
// composables/usePagination.ts
import { ref, computed, type Ref, type ComputedRef } from 'vue'

interface UsePaginationOptions {
  initialPage?: number
  pageSize?: number
}

interface UsePaginationReturn<T> {
  currentPage: Ref<number>
  pageSize: Ref<number>
  totalPages: ComputedRef<number>
  paginatedItems: ComputedRef<T[]>
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
}

export function usePagination<T>(
  items: Ref<T[]>,
  options: UsePaginationOptions = {},
): UsePaginationReturn<T> {
  const currentPage = ref(options.initialPage ?? 1)
  const pageSize = ref(options.pageSize ?? 10)

  const totalPages = computed(() =>
    Math.ceil(items.value.length / pageSize.value)
  )

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return items.value.slice(start, start + pageSize.value)
  })

  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  function prevPage() {
    if (currentPage.value > 1) currentPage.value--
  }

  function goToPage(page: number) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    goToPage,
  }
}
```

### Typing Provide / Inject

```ts
// types/injection-keys.ts
import type { InjectionKey, Ref } from 'vue'

export interface NotificationContext {
  notifications: Ref<Notification[]>
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

export const NotificationKey: InjectionKey<NotificationContext> = Symbol('notifications')
```

### Generic Components

```vue
<!-- GenericList.vue -->
<script setup lang="ts" generic="T extends { id: string }">
defineProps<{
  items: T[]
  selectedId?: string
}>()

defineEmits<{
  'select': [item: T]
}>()

defineSlots<{
  default: (props: { item: T; isSelected: boolean }) => any
  empty: () => any
}>()
</script>

<template>
  <ul v-if="items.length > 0">
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="$emit('select', item)"
    >
      <slot :item="item" :is-selected="item.id === selectedId">
        {{ item.id }}
      </slot>
    </li>
  </ul>
  <div v-else>
    <slot name="empty">
      <p>No items found.</p>
    </slot>
  </div>
</template>
```

---

## Testing

### Unit Testing with Vitest + Vue Test Utils

```ts
// components/Counter.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter, {
      props: { initialCount: 5 },
    })
    expect(wrapper.text()).toContain('5')
  })

  it('increments count when button is clicked', async () => {
    const wrapper = mount(Counter)
    const button = wrapper.find('[data-testid="increment"]')

    await button.trigger('click')

    expect(wrapper.text()).toContain('1')
  })

  it('emits count-changed event', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('[data-testid="increment"]').trigger('click')

    expect(wrapper.emitted('count-changed')).toBeTruthy()
    expect(wrapper.emitted('count-changed')![0]).toEqual([1])
  })
})
```

### Testing with Pinia

```ts
// stores/cart.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cart'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toHaveLength(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('adds items to cart', () => {
    const cart = useCartStore()
    cart.addItem({ id: '1', name: 'Widget', price: 9.99, quantity: 1 })
    expect(cart.items).toHaveLength(1)
    expect(cart.totalPrice).toBeCloseTo(9.99)
  })

  it('removes items from cart', () => {
    const cart = useCartStore()
    cart.addItem({ id: '1', name: 'Widget', price: 9.99, quantity: 1 })
    cart.removeItem('1')
    expect(cart.items).toHaveLength(0)
  })
})
```

### Testing Components with Router

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import NavBar from './NavBar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
  ],
})

describe('NavBar', () => {
  it('renders navigation links', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/about"]').exists()).toBe(true)
  })
})
```

### Testing Composables

```ts
import { describe, it, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)
    expect(debounced.value).toBe('hello')
  })

  it('debounces value changes', async () => {
    vi.useFakeTimers()
    const source = ref('initial')
    const debounced = useDebounce(source, 300)

    source.value = 'updated'
    await nextTick()
    expect(debounced.value).toBe('initial')

    vi.advanceTimersByTime(300)
    await nextTick()
    expect(debounced.value).toBe('updated')

    vi.useRealTimers()
  })
})
```

### E2E Testing with Playwright

```ts
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can log in', async ({ page }) => {
    await page.goto('/login')

    await page.fill('[data-testid="email-input"]', 'user@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('[data-testid="email-input"]', 'wrong@example.com')
    await page.fill('[data-testid="password-input"]', 'wrongpassword')
    await page.click('[data-testid="login-button"]')

    await expect(page.getByText('Invalid credentials')).toBeVisible()
    await expect(page).toHaveURL('/login')
  })

  test('user can log out', async ({ page }) => {
    // Assume already logged in (via storage state or API)
    await page.goto('/dashboard')
    await page.click('[data-testid="logout-button"]')

    await expect(page).toHaveURL('/login')
  })
})
```

### Testing Principles

1. **Test behavior, not implementation** — Test what the user sees, not internal component details.
2. **Test emitted events** — Use `wrapper.emitted()` to verify event payloads.
3. **Test rendered output** — Assert on text content, DOM structure, and visibility.
4. **Mock API boundaries** — Mock fetch/axios calls, not internal composables.
5. **Co-locate tests** — Keep `*.test.ts` files next to the components they test.
6. **Test stores independently** — Pinia stores are plain functions; test them without mounting components.
7. **Use data-testid sparingly** — Prefer finding elements by role, text, or label for better accessibility.

---

## Build Tools and Deployment

### Vite Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
})
```

### Environment Variables

```bash
# .env
VITE_APP_TITLE=My Vue App

# .env.development
VITE_API_URL=http://localhost:8080/api

# .env.production
VITE_API_URL=https://api.myapp.com

# .env.local (git-ignored, local overrides)
VITE_API_URL=http://localhost:3000/api
```

```ts
// Type your environment variables
// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Access in code
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
```

### Production Build

```bash
npm run build      # Creates optimized build in dist/
npm run preview    # Preview build locally at http://localhost:4173
```

### Deployment Options

- **Vercel**: Zero-config Vue deployment. Auto-detects Vite.
- **Netlify**: Static site hosting with serverless functions.
- **Cloudflare Pages**: Edge deployment with excellent global performance.
- **AWS S3 + CloudFront**: Static hosting with CDN.
- **Docker + Nginx**: Self-hosted. Serve `dist/` as static files.
- **Nuxt**: For SSR/SSG needs, use Nuxt 3 (built on Vue 3).

---

## Performance Optimization

### Key Strategies

1. **Lazy-load routes** — Use dynamic `import()` for all route components.
2. **Lazy-load components** — Use `defineAsyncComponent` for heavy components.
3. **Use `shallowRef`** — For large objects where you only track the top-level reference.
4. **Use `v-once`** — For static content that never changes.
5. **Use `v-memo`** — To cache template sub-trees based on dependencies.
6. **Use `<KeepAlive>`** — To cache component instances for tab-based UIs.
7. **Virtual scrolling** — For lists with 1000+ items.
8. **Debounce watchers** — Avoid expensive operations on rapid input changes.
9. **Use `Object.freeze()`** — For large static data sets that never change.
10. **Use `markRaw()`** — For values that should not be made reactive.
11. **Code splitting** — Vite automatically code-splits on dynamic imports.
12. **Tree shaking** — Import only what you use from libraries.

### v-show vs v-if

```vue
<template>
  <!-- v-if: Higher toggle cost, lower initial cost -->
  <!-- Use for conditions that rarely change -->
  <AdminPanel v-if="user.isAdmin" />

  <!-- v-show: Lower toggle cost, higher initial cost -->
  <!-- Use for conditions that change frequently -->
  <DropdownMenu v-show="isMenuOpen" />
</template>
```

### Avoiding Unnecessary Reactivity

```vue
<script setup lang="ts">
import { ref, shallowRef, markRaw } from 'vue'

// BAD — Vue makes every nested property reactive
const chartInstance = ref(new ChartLibrary())

// GOOD — markRaw prevents Vue from making it reactive
const chartInstance = shallowRef(markRaw(new ChartLibrary()))

// BAD — Vue deep-tracks 10,000 items
const allCountries = ref(hugeCountryList)

// GOOD — shallowRef only tracks .value replacement
const allCountries = shallowRef(hugeCountryList)

// GOOD — freeze entirely static data
const COUNTRY_CODES = Object.freeze(hugeCountryList)
</script>
```

---

## Accessibility

### Core Principles

1. **Semantic HTML** — Use `<button>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`.
2. **Labels on all inputs** — Every `<input>` needs a `<label>`, `aria-label`, or `aria-labelledby`.
3. **Alt text on images** — All `<img>` elements need `alt`. Decorative images use `alt=""`.
4. **Keyboard navigation** — All interactive elements must be reachable and operable via keyboard.
5. **Focus management** — Modals trap focus. Dialogs return focus on close.
6. **Color contrast** — Meet WCAG AA: 4.5:1 for text, 3:1 for large text.
7. **ARIA attributes** — Use `aria-live` for dynamic content, `aria-expanded` for toggles.
8. **Skip links** — Provide a "Skip to main content" link for keyboard users.

### Focus Management

```vue
<script setup lang="ts">
import { ref, nextTick } from 'vue'

const isModalOpen = ref(false)
const closeButtonRef = ref<HTMLButtonElement>()
const triggerRef = ref<HTMLButtonElement>()

async function openModal() {
  isModalOpen.value = true
  await nextTick()
  closeButtonRef.value?.focus()
}

function closeModal() {
  isModalOpen.value = false
  triggerRef.value?.focus() // Return focus to trigger
}
</script>

<template>
  <button ref="triggerRef" @click="openModal">Open Modal</button>

  <Teleport to="body">
    <div v-if="isModalOpen" class="modal-overlay" role="dialog" aria-modal="true" aria-label="Dialog">
      <div class="modal-content">
        <button ref="closeButtonRef" @click="closeModal">Close</button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
```

### Live Regions

```vue
<template>
  <!-- Polite — announced at next pause in speech -->
  <div aria-live="polite" aria-atomic="true">
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>

  <!-- Assertive — announced immediately -->
  <div aria-live="assertive" role="alert">
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
```

---

## Common Patterns

### Composable Pattern (Reusable Logic)

```ts
// composables/useWindowSize.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  function update() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}
```

### Renderless Component Pattern

```vue
<!-- FetchData.vue — provides data via slot props, no template of its own -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ url: string }>()

const data = ref<unknown>(null)
const error = ref<Error | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(props.url)
    data.value = await response.json()
  } catch (e) {
    error.value = e instanceof Error ? e : new Error(String(e))
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <slot :data="data" :error="error" :is-loading="isLoading" />
</template>

<!-- Usage -->
<FetchData url="/api/users" v-slot="{ data, error, isLoading }">
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <UserList v-else :users="data" />
</FetchData>
```

### Wrapper Component Pattern

```vue
<!-- BaseButton.vue — wraps a native button with consistent styling -->
<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
})

const classes = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  { 'btn-loading': props.isLoading },
])
</script>

<template>
  <button :class="classes" :disabled="isLoading" v-bind="$attrs">
    <span v-if="isLoading" class="spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
```

### Teleport Pattern

```vue
<!-- Modal that renders outside the component hierarchy -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-content" role="dialog" aria-modal="true">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

### Plugin Pattern

```ts
// plugins/toast.ts
import type { App, InjectionKey, Ref } from 'vue'
import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

export interface ToastPlugin {
  toasts: Ref<Toast[]>
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

export const ToastKey: InjectionKey<ToastPlugin> = Symbol('toast')

export function createToastPlugin() {
  return {
    install(app: App) {
      const toasts = ref<Toast[]>([])

      function addToast(message: string, type: Toast['type'] = 'info') {
        const id = crypto.randomUUID()
        toasts.value.push({ id, message, type })
        setTimeout(() => removeToast(id), 5000)
      }

      function removeToast(id: string) {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }

      app.provide(ToastKey, { toasts, addToast, removeToast })
    },
  }
}

// main.ts
// app.use(createToastPlugin())
```

---

## Anti-Patterns to Avoid

1. **Mutating props** — Props are read-only. Emit events to the parent to request changes. Never write to `props.someValue`.
2. **Using the Options API for new code** — Always use `<script setup>` with the Composition API. The Options API is legacy.
3. **Missing keys on `v-for`** — Always provide a unique, stable `:key`. Array indices are only safe for static, never-reordered lists.
4. **`v-if` and `v-for` on the same element** — `v-if` has higher priority in Vue 3. Use a `<template>` wrapper for `v-for` and apply `v-if` on child elements.
5. **Destructuring Pinia state without `storeToRefs()`** — Plain destructuring breaks reactivity. Always use `storeToRefs()`.
6. **Overusing `reactive()` instead of `ref()`** — `ref()` is simpler, works with primitives, and can be safely destructured.
7. **Using `v-html` with untrusted content** — Creates XSS vulnerabilities. Sanitize all user-provided HTML.
8. **Giant monolithic components** — Components over 150-200 lines should be split. Extract logic into composables and create child components.
9. **Not cleaning up side effects** — Timers, event listeners, and subscriptions must be cleaned up in `onUnmounted` or watcher `onCleanup`.
10. **Deep watching large objects without reason** — `{ deep: true }` watches every nested property change. Use getter functions to watch specific properties instead.
11. **Registering all components globally** — Global registration prevents tree shaking and obscures dependencies. Import components locally in `<script setup>`.
12. **Using `this` in Composition API** — `this` does not exist in `<script setup>`. All state and methods are accessed directly.
13. **Inline complex objects as template props** — `<MyComp :config="{ a: 1, b: 2 }" />` creates a new object every render. Use `computed` or a `const`.
14. **Overusing provide/inject for application state** — Use Pinia for global state. Provide/inject is for dependency injection, not state management.
15. **Ignoring accessibility** — Always use semantic HTML, proper labels, keyboard navigation, and ARIA attributes where needed.

---

## Further Resources

- [Vue.js Documentation](https://vuejs.org/) — Official docs (excellent and comprehensive)
- [Vue Router](https://router.vuejs.org/) — Official routing library
- [Pinia](https://pinia.vuejs.org/) — Official state management
- [VueUse](https://vueuse.org/) — Collection of essential Vue composables
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) — Official VS Code extension
- [Vitest](https://vitest.dev/) — Unit testing framework
- [Vue Test Utils](https://test-utils.vuejs.org/) — Official component testing utilities
- [Playwright](https://playwright.dev/) — End-to-end testing
- [Nuxt](https://nuxt.com/) — Full-featured meta-framework built on Vue 3
- [Vue DevTools](https://devtools.vuejs.org/) — Browser extension for debugging Vue apps
