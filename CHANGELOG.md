# Changelog

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
