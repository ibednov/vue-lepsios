<script setup lang="ts">
import { computed, h, ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import CrmDataTable from './crm-data-table.vue'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface CrmTeamMemberRow {
  id: string
  displayName: string
  email?: string
  identifiers?: readonly { label: string, value: string }[]
  roleKeys: readonly string[]
  createdAt?: string
}

const props = withDefaults(defineProps<{
  members: readonly CrmTeamMemberRow[]
  loading?: boolean
  error?: string | null
  labels: {
    identity: string
    email: string
    roles: string
    createdAt: string
    search: string
    loading: string
    empty: string
    previous: string
    next: string
    unnamed?: string
  }
  roleLabel?: (roleKey: string) => string
  locale?: string
  pageSize?: number
}>(), { loading: false, error: null, locale: undefined, pageSize: 10 })

const emit = defineEmits<{ retry: [] }>()
defineSlots<{ toolbar?: () => unknown, 'retry-label'?: () => unknown }>()
const search = ref('')
const page = ref(1)
const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase())
const filtered = computed(() => {
  const needle = normalizedSearch.value
  if (!needle)
    return [...props.members]
  return props.members.filter(member => [member.displayName, member.email, ...member.roleKeys, ...(member.identifiers ?? []).flatMap(item => [item.label, item.value])]
    .some(value => value?.toLocaleLowerCase().includes(needle)))
})
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / props.pageSize)))
const pageMembers = computed(() => filtered.value.slice((page.value - 1) * props.pageSize, page.value * props.pageSize))
const pagination = computed(() => ({ page: page.value, perPage: props.pageSize, totalCount: filtered.value.length, totalPages: pageCount.value }))
const roleText = (key: string) => props.roleLabel?.(key) ?? key
const dateText = (date: string) => new Intl.DateTimeFormat(props.locale, { dateStyle: 'medium' }).format(new Date(date))
const columns = computed<ColumnDef<CrmTeamMemberRow, unknown>[]>(() => [
  {
    id: 'identity',
    accessorFn: member => `${member.displayName} ${member.email ?? ''} ${(member.identifiers ?? []).map(item => `${item.label} ${item.value}`).join(' ')}`,
    header: props.labels.identity,
    cell: ({ row }) => h('div', { class: 'min-w-0' }, [
      h('div', { class: 'font-medium' }, row.original.displayName || props.labels.unnamed || '—'),
      ...(row.original.email ? [h('div', { class: 'mt-1 text-xs text-muted-foreground' }, row.original.email)] : []),
      ...(row.original.identifiers ?? []).map(item => h('div', { class: 'mt-1 break-all text-xs text-muted-foreground', key: `${item.label}:${item.value}` }, [h('span', `${item.label}: `), h('span', { class: 'font-mono' }, item.value)])),
    ]),
  },
  {
    accessorKey: 'roleKeys',
    header: props.labels.roles,
    cell: ({ row }) => row.original.roleKeys.length
      ? h('div', { class: 'flex flex-wrap gap-1' }, row.original.roleKeys.map(key => h(Badge, { key, variant: 'outline' }, () => roleText(key))))
      : h('span', { class: 'text-muted-foreground' }, '—'),
  },
  {
    id: 'createdAt',
    accessorFn: member => member.createdAt ?? '',
    header: props.labels.createdAt,
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, row.original.createdAt ? dateText(row.original.createdAt) : '—'),
  },
])

const onSearch = (value: string | number | undefined) => {
  search.value = String(value ?? '')
  page.value = 1
}
const changePage = (next: number) => {
  if (next >= 1 && next <= pageCount.value)
    page.value = next
}
</script>

<template>
  <CrmDataTable
    :columns="columns"
    :data="pageMembers"
    :meta="pagination"
    :loading="loading"
    :error="error"
    :empty-text="labels.empty"
    :loading-text="labels.loading"
    :previous-label="labels.previous"
    :next-label="labels.next"
    :paginate-above="0"
    @page-change="changePage"
  >
    <template #toolbar>
      <slot name="toolbar" />
      <Input
        :model-value="search"
        class="w-full sm:max-w-sm"
        :placeholder="labels.search"
        @update:model-value="onSearch"
      />
    </template>
    <template #error="{ error: message }">
      <span>{{ message }}</span>
      <Button variant="outline" size="sm" @click="emit('retry')">
        <slot name="retry-label" />
      </Button>
    </template>
  </CrmDataTable>
</template>

