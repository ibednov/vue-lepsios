<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <li
        data-slot="breadcrumb-separator"
        role="presentation"
        aria-hidden="true"
        :class="cn('[&>svg]:size-3.5', props.class)"
    >
        <slot>
            <Icon icon="lucide:chevron-right" />
        </slot>
    </li>
</template>
