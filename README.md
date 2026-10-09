# `@lepsios/vue`

Shared Vue 3 components and composables for Vite and Nuxt applications. This is a sibling package to `nuxt-lepsios`; it has no Nuxt dependency, and `nuxt-lepsios` does not depend on it.

The initial UI slice targets CRM screens: table framing and pagination, number fields, masked identifiers, pagination metadata, and sortable list helpers. Components accept localized labels from their callers.

The package exports Vue SFC and TypeScript source for host bundlers to compile. Consumers provide the peer dependencies listed in `package.json` and their own Tailwind theme tokens.

```ts
import { CrmDataTable, CrmNumberField } from '@lepsios/vue'
import { useSortable, moveArrayElement } from '@lepsios/vue/composables/useSortable'
```

## Local development

The canonical source is this repository. Product repositories that build in isolated Docker contexts keep a synchronized vendored copy for reproducible builds.
