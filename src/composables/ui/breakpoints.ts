import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'

const breakpointSizes = {
  'xs': '320',
  'sm': '640',
  'md': '768',
  'lg': '1024',
  'xl': '1280',
  '2xl': '1536',
} as const

type BreakpointSizes = typeof breakpointSizes

const createBreakpoints = () => {
  if (typeof window === 'undefined') {
    return {
      smaller: () => ref(false),
      between: () => ref(false),
      greater: () => ref(false),
      greaterOrEqual: () => ref(true),
      active: () => ref('lg' as keyof BreakpointSizes),
    }
  }
  return useBreakpoints(breakpointsTailwind)
}

export const breakpoints = createBreakpoints()

export const isMoreSmScreen = breakpoints.greaterOrEqual('md')
export const isMoreMdScreen = breakpoints.greaterOrEqual('lg')

export const activeBreakpoint = breakpoints.active()
export const activeScreen = computed(() => {
  const active = activeBreakpoint.value as keyof BreakpointSizes
  if (!active || !breakpointSizes[active]) return '320'
  return breakpointSizes[active] || '1536'
})
