# CRM table and Kanban shell

`CrmViewToggle` provides the shared table/Kanban switch. The host owns the
selected mode and supplies translated labels:

```vue
<CrmViewToggle
  v-model="viewMode"
  :table-label="t('tableView')"
  :kanban-label="t('kanbanView')"
/>
```

`CrmKanbanBoard` provides a responsive horizontal board and column containers.
The host supplies stable column ids and labels, then renders cards in the
`cards` slot. The `columnDrop` event reports the target column; status
transitions, drag policy, and persistence remain host-owned.

```vue
<CrmKanbanBoard :columns="columns" min-width="2200px" @column-drop="onDrop">
  <template #header="{ column }">
    <header>{{ column.label }} <Badge>{{ counts[column.id] }}</Badge></header>
  </template>
  <template #cards="{ column }">
    <ProposalCard v-for="card in cardsByColumn[column.id]" :key="card.id" :card="card" />
  </template>
</CrmKanbanBoard>
```
