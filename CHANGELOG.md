# Changelog

## 0.8.16

- `buildCrmNavBreadcrumbs`: optional `section.links` for flat section leaves (2-level crumbs, no module).

## 0.8.15

- Add `CrmNavHub` + `resolveCrmNavHub` / `crmNavHubPath` — section/module landing cards.
- `CrmSidebarNavigation`: optional `to` on section/group (label → hub; chevron toggles).
- `buildCrmNavBreadcrumbs`: prefer hub `to` on section/group; hub activeId crumbs.

## 0.8.14

- Add `CrmSidebarAccount` — one sidebar footer for all CRMs (avatar trigger, appearance icons, `#menu` slot, optional `CrmPoweredBy` props).

## 0.8.13

- AdminPageHeader / AdminPage / AdminShell: layout via stable CSS classes (not only Tailwind utilities) so host purge cannot pin titles trailing or re-center the content island.
- Add `CrmHeaderAppearance` — header locale + theme icon toggles (props/emits only).
- Export `buildCrmNavBreadcrumbs` for section → module → item clickable crumbs.

## 0.8.12

- AdminShell constrain: drop `mx-auto` — max width caps from the leading edge so content shares the header/breadcrumb column (no centered island).
- AdminPage: gutters match header (`px-4 sm:px-6`); no extra `lg:px-8`.

## 0.8.11

- AdminPageHeader: title stays leading-edge (`w-full` / `text-start`); drop column `items-end` that pinned titles to the trailing edge.
- AdminPage: full-bleed of shell content (no nested `mx-auto max-w-screen-2xl`) so title and body share one column.
- AdminShell: constrain uses `max-w-[72rem]` + `items-stretch` (survives hosts that purge `max-w-6xl`).

## 0.8.10

- Add `CrmPoweredBy` — optional sidebar footer strip (label / name / href / logo props only).

## 0.8.9

- SidebarProvider: `defineModel('open')` default is a constant (`true`) — referencing `props.defaultOpen` broke production vite builds (vue compiler-sfc hoist).


## 0.8.8

- AdminShell: header start/actions layout (actions pin right); optional `v-model:wide` + `showWideToggle` / `constrainContent` for shared expand parity across CRMs.


## 0.8.7

- MetricCard: explicit Card/Skeleton imports, min-width-safe layout (no clipped titles/values).
- CrmSidebarNavigation: reactive group open state; expand-from-icon opens instead of toggle-close.
- SidebarProvider: stop overwriting host `v-model:open` with cookie default on setup.

## 0.8.6

- `formatDateTimeBasedOnLocale` accepts full `Intl.DateTimeFormatOptions` (not only timeZone).

## 0.8.5

- Add `formatDateTimeBasedOnLocale` (Intl medium date+time, optional `timeZone` / `empty`).

## 0.8.4

- ConfirmDialog button labels are props only (`confirmText` / `cancelText`, defaults `Confirm` / `Cancel`); no `useI18n`.
- Remove misleading `AdminDataTable` export alias (use `AdminTableFrame` or `CrmDataTable`).

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
