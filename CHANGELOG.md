# Changelog

## 0.8.3

- Hide the desktop table container when a consumer renders the responsive cards slot.

## 0.8.2

- Keep AdminShell content in a neutral layout container so page frames provide the single main landmark.

## 0.8.1

- Avoid nesting the page frame's main landmark inside AdminShell.

## 0.8.0
- Add shared CRM breadcrumbs and controlled sidebar state to AdminShell.

## 0.7.9
- Fix forwarded drawer prop typing for consumer typechecks.

## 0.7.8
- Align field, OTP, date picker, and tag cloud typings with current Vue and Reka UI APIs.
- Declare MarkdownIt types and Typed.js used by exported shared components.

## 0.7.7
- Fix entity navigation index display typing.

## 0.7.6

- Add shared entity navigation and tags input field components.
- Export a shared bulk action helper for host-owned record operations.

## 0.7.5

- Use Lucide and Framework7 icons in shared components to reduce required icon collections.
- Add labeled table/Kanban view toggle and a generic Kanban column shell with host-owned card and drop behavior.

## 0.7.4

- Improve contrast and alignment for informational alerts.
- Improve filled OTP field contrast and focus visibility.

## 0.7.3

- Preserve localized selection status and clear-selection controls.
- Restore sortable table headers, sort indicators, and controlled sorting updates.

## 0.7.2

- Add localized selected-count and clear-selection labels to preserve table selection controls.

## 0.7.1

- Keep shared table and confirmation dialog template bindings compatible with consumer Vue typechecks.

## 0.7.0

- Add controlled `CrmDataTable` row selection and exported `createSelectColumn` helper.
- Ignore clicks on row-interactive controls before emitting `rowClick`.
- Add optional retry labels/events, hideable pagination, and a localized pagination summary formatter.
- Document server-search and multi-filter toolbar recipes and parity with Yarmarka's table.

## 0.6.0

- Add `CrmStateBlock` with distinct loading, error, and empty states, caller-provided labels, and retry/default slots.
- Export the existing `AdminPageHeader` and `AdminPage` as the shared page header and frame.
- Align `AdminPage` gutters and sizing with the extracted Wishimi page frame.
- Export `CrmTeamMembersView` and `CrmAccessControlView` from the package root.
- Keep state labels caller-supplied and make retry rendering opt-in for `CrmStateBlock`.

## 0.5.0

- Add `CrmSidebarNavigation` for shared searchable navigation, grouped routes, active states, saved group expansion, and collapsed sidebars.

## 0.4.0

- Add reusable CRM team roster and access-control views, including retry actions for load errors.
- Add reusable error and empty states, customizable pagination labels, and controlled sorting to `CrmDataTable`.
- Fix `AuthPhoneInput` colors in dark theme so entered text, placeholder, and country selector remain readable.
