# `@lepsios/vue`

Shared Vue 3 components and composables for Vite and Nuxt applications. This is a sibling package to `nuxt-lepsios`; it has no Nuxt dependency, and `nuxt-lepsios` does not depend on it.

The initial UI slice targets CRM screens: table framing and pagination, number fields, masked identifiers, pagination metadata, and sortable list helpers. Components accept localized labels from their callers.

The package exports Vue SFC and TypeScript source for host bundlers to compile. Consumers provide the peer dependencies listed in `package.json` and their own Tailwind theme tokens.

## Input appearances

The shared `Input` supports `wishimi` for a labeled 52px field and `wishimi-search` for a 52px search field. `FieldItem` applies the labeled appearance with `appearance: 'wishimi'`; `inputType: 'search'` selects the search treatment and its leading search icon. The matching primary action uses `Button` with `variant="wishimi"` and `size="wishimi"`.

```vue
<Input v-model="name" variant="wishimi" />
<Button variant="wishimi" size="wishimi">Continue</Button>
```

```ts
import { CrmDataTable, CrmNumberField, useNotify, useConfirmDialog } from '@lepsios/vue'
import { useSortable, moveArrayElement } from '@lepsios/vue'
```

## Optional CSS tokens

Copied from `nuxt-lepsios` (Nuxt layer still ships its own copies for `#layers/lepsios/...` imports). Vite consumers import via package exports:

```ts
import '@lepsios/vue/assets/css/term.css'
import '@lepsios/vue/assets/css/cosy.css'
import '@lepsios/vue/assets/css/landing.css'
import '@lepsios/vue/assets/css/landing-brutal.css'
```

| File | Role |
| --- | --- |
| `term.css` | MacosWindow / terminal chrome (`--lepsios-term-*`) |
| `cosy.css` | Warm editorial (`waify-*`) theme override |
| `landing.css` | Dark marketing palette (`--gp-*`) |
| `landing-brutal.css` | Light brutal marketing palette |

## Landing blocks

Reusable page sections are grouped under `src/components/landing` and exported
from `@lepsios/vue/components/landing` (or the package root). Product copy,
links, route behavior, and authenticated actions belong to the consuming app;
pass them as props or slots. Blocks use a light tone by default and accept
`tone="dark"` when needed.

```vue
<LandingStepsSection
  :items="steps"
  :title="copy.stepsTitle"
  :description="copy.stepsDescription"
>
  <template #eyebrow>{{ copy.stepsEyebrow }}</template>
</LandingStepsSection>

<LandingCallToAction :title="copy.ctaTitle" :description="copy.ctaDescription">
  <template #actions>
    <ProductSignupAction />
  </template>
</LandingCallToAction>
```

Available groups: `LandingHero`, `LandingNavbar`, `LandingFeatureGrid`,
`LandingStepsSection`, `LandingFaqSection`, `LandingCallToAction`, and
`LandingFooterSection`.

## Local development

The canonical source is this repository. Product repositories that build in isolated Docker contexts keep a synchronized vendored copy for reproducible builds.

## License

[PolyForm Noncommercial License 1.0.0](LICENSE). Free for noncommercial use; commercial use requires the author's written permission — contact via [alexbednov.dev](https://alexbednov.dev). See [CONTRIBUTING.md](CONTRIBUTING.md).
