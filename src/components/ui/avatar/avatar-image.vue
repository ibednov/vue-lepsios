<script setup lang="ts">
import type { AvatarImageProps } from 'reka-ui'
import { AvatarImage } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
    <AvatarImage
        data-slot="avatar-image"
        v-bind="delegatedProps"
        :class="cn('aspect-square size-full object-cover object-center', props.class)"
    >
        <slot />
    </AvatarImage>
</template>
