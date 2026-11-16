<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useEventListener, useMediaQuery } from '@vueuse/core'
import { TooltipProvider } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '../../../lib/cn'
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from './utils'

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}>(), {
  defaultOpen: true,
})

const isMobile = useMediaQuery('(max-width: 768px)')
const openMobile = ref(false)

// defineModel default must be a constant (not props.*) — vue compiler-sfc hoist rule.
// Hosts always bind v-model:open via AdminShell; cookie is written on setOpen only.
const open = defineModel<boolean>('open', {
  default: true,
})

const setOpen = (value: boolean) => {
  open.value = value
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}

const setOpenMobile = (value: boolean) => {
  openMobile.value = value
}

const toggleSidebar = () =>
  isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value)

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
})

const state = computed(() => open.value ? 'expanded' : 'collapsed')

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
})
</script>

<template>
    <TooltipProvider :delay-duration="0">
        <div
            :style="{
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            }"
            :class="cn('group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar', props.class)"
            v-bind="$attrs"
        >
            <slot />
        </div>
    </TooltipProvider>
</template>
