<script setup lang="ts">
import SharedLoader from './index.vue'
defineProps<{ label?: string }>()
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-full bg-black/40 backdrop-blur-sm fixed inset-0 z-[99]">
        <SharedLoader :label="label" />
    </div>
</template>
