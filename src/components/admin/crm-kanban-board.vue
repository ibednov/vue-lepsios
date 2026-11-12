<script setup lang="ts" generic="TColumn extends { id: string, label: string }">
const props = withDefaults(defineProps<{
  columns: readonly TColumn[]
  minWidth?: string
}>(), {
  minWidth: undefined,
})

const emit = defineEmits<{
  columnDrop: [payload: { event: DragEvent, column: TColumn }]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <div
      class="grid gap-3"
      :style="{
        gridTemplateColumns: `repeat(${props.columns.length}, minmax(0, 1fr))`,
        minWidth: props.minWidth ?? 'max-content',
      }"
    >
      <section
        v-for="column in props.columns"
        :key="column.id"
        class="min-h-72 rounded-xl border bg-muted/20 p-2"
        :data-kanban-column="column.id"
        @dragover.prevent
        @drop="emit('columnDrop', { event: $event, column })"
      >
        <slot name="header" :column="column">
          <header class="mb-2 px-1 py-2">
            <h2 class="text-sm font-semibold">{{ column.label }}</h2>
          </header>
        </slot>
        <div class="space-y-2">
          <slot name="cards" :column="column" />
        </div>
      </section>
    </div>
  </div>
</template>
