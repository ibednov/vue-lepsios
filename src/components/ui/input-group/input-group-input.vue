<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Input } from '../input'
import { cn } from '@lepsios/vue/lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
  type?: string
  placeholder?: string
}>()

const model = defineModel<string | number>()
</script>

<template>
    <Input
        data-slot="input-group-control"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :class="cn(
            'flex-1 rounded-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent ring-offset-transparent dark:bg-transparent',
            props.class,
        )"
    />
</template>
