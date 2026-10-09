<script setup lang="ts">
import type { SelectGroupProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectGroup } from 'reka-ui'
import { cn } from '@lepsios/vue/lib/cn'

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <SelectGroup
        :class="cn('p-1 w-full', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </SelectGroup>
</template>
