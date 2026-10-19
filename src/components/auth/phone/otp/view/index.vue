<script setup lang="ts">
import { Button } from '../../../../ui/button'
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{
  title: string
  submitLabel: string
  backLabel: string
  loading?: boolean
  disabled?: boolean
  showBack?: boolean
  testId?: string
  submitTestId?: string
}>(), {
  loading: false,
  disabled: false,
  showBack: true,
})

const emit = defineEmits<{
  back: []
  submit: []
}>()
</script>

<template>
  <section
    class="mx-auto flex w-full max-w-md flex-1 flex-col gap-6"
    :data-testid="testId"
  >
    <div
      v-if="showBack"
      class="flex items-center gap-2"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        class="shrink-0"
        :aria-label="backLabel"
        @click="emit('back')"
      >
        <Icon
          icon="lucide:arrow-left"
          class="size-5"
        />
      </Button>
    </div>

    <h1 class="text-3xl font-bold tracking-tight">
      {{ title }}
    </h1>

    <form
      class="flex flex-1 flex-col gap-6"
      @submit.prevent="emit('submit')"
    >
      <slot />
      <Button
        type="submit"
        class="mt-auto h-12 w-full rounded-full text-base font-semibold"
        size="lg"
        :disabled="disabled || loading"
        :loading="loading"
        :data-testid="submitTestId"
      >
        {{ submitLabel }}
      </Button>
    </form>
  </section>
</template>
