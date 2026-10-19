# vue-lepsios contribution rules

`vue-lepsios` is a product-agnostic shared UI library. Keep all code here reusable across unrelated applications.

## No product or business logic

- Do not add product-specific components, terminology, workflows, validation rules, or decisions.
- Do not hardcode product, tenant, company, or country defaults (for example, a default country such as `by`).
- Components must not silently choose business values. Expose configurable props or accept explicit configuration from the consuming application; use a neutral behavior when configuration is omitted.
- Keep domain rules and business defaults in the consuming product/application, outside this repository.
- Generic technical behavior is allowed only when it is independent of any particular product or business domain.

Before adding or changing shared behavior, check that it can be used unchanged by applications with different business rules and defaults.
