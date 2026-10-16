<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '../../ui/button'
import ContainerModalDrawer from '../container-modal-drawer.vue'
import TocItem from './item.vue'
import type { TocDocument, TocLinkItem, TocItem as TocItemModel } from './types'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Contents',
})

const state = defineModel<boolean>('state', { default: false })
const data = defineModel<TocDocument>()

const convertLinks = (links: TocLinkItem[]): TocItemModel[] =>
  links
    .map(link => ({
      id: link.id || '',
      title: link.text || link.title || '',
      level: link.depth || 1,
      children:
        link.children && Array.isArray(link.children)
          ? convertLinks(link.children)
          : undefined,
    }))
    .filter(item => item.id && item.title)

const headers = computed(() => {
  if (!data.value) {
    return []
  }

  const body = data.value.body as { toc?: { links?: TocLinkItem[] } } | undefined
  const toc = body?.toc

  if (!toc?.links || !Array.isArray(toc.links)) {
    return []
  }

  return convertLinks(toc.links)
})

const toggleState = () => {
  state.value = !state.value
}

const scrollToAnchor = (id: string) => {
  toggleState()
  if (typeof document === 'undefined') {
    return
  }
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div
    v-if="data && headers.length > 0"
    class="sticky top-8 self-start"
  >
    <ContainerModalDrawer
      v-model:open="state"
      :title="title"
      drawer-hide-footer
    >
      <template #trigger>
        <Button
          variant="ghost"
          class="w-fit h-fit p-2"
        >
          <Icon
            icon="ri:list-check"
            width="20"
          />
        </Button>
      </template>
      <div class="flex flex-col gap-1">
        <TocItem
          v-for="item in headers"
          :key="item.id"
          :item="item"
          @click="scrollToAnchor"
        />
      </div>
    </ContainerModalDrawer>
  </div>
</template>
