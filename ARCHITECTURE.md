# Vue and Nuxt Lepsios packages

`vue-lepsios` and `nuxt-lepsios` are siblings. `vue-lepsios` owns Vue components, Nuxt-independent composables, types, utilities, and optional styles. `nuxt-lepsios` owns Nuxt layers, modules, plugins, auto-imports, runtime and SSR integration. Neither package is required by the other.

## Boundaries

- Shared UI receives prepared text through props; it does not call `t()` or `useI18n()`.
- Product pages, routes, API clients, stores, auth, and brand assets remain in product repositories.
- CSS classes may use consumer theme tokens, but the package does not install global CSS or enable a product palette implicitly.
- Vue is a peer dependency so consuming applications keep one Vue runtime.
- Package versions are pinned independently by each product.

## First consumer

`spending-crm` is the first Vite + Vue consumer. It proves the package boundary on CRM tables and plan editing. `alexbednov-crm` keeps a vendored package copy for Docker builds because its Docker context is isolated from this repository; the source of truth remains `ibednov/vue-lepsios`.

## Extracted from `nuxt-lepsios`

- `SharedUiAdminDataTable` table frame → `AdminTableFrame`.
- `NumberField` primitive family → `components/number-field`.

The original Nuxt files remain in place with TODO comments until Nuxt consumers are migrated independently.
