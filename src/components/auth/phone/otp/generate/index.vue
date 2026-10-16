<script setup lang="ts">
/**
 * AuthPhoneOtpGenerate — presentational TOTP setup (QR + secret).
 * Directory name: AuthPhoneOtpGenerate
 * Parent supplies qrcode/secret and handles regenerate/continue.
 */
import { Button } from '../../../../ui/button'
import { Label } from '../../../../ui/label'

defineProps<{
  title?: string
  description?: string
  secretLabel?: string
  regenerateLabel?: string
  continueLabel?: string
  secret?: string | null
  qrcode?: string | null
  loading?: boolean
  testId?: string
}>()

const emit = defineEmits<{
  regenerate: []
  continue: []
  copy: []
}>()
</script>

<template>
  <div
    class="auth-phone-otp-generate relative flex w-full flex-col gap-6"
    :data-testid="testId"
  >
    <div
      v-if="title || description"
      class="flex flex-col gap-2"
    >
      <h2
        v-if="title"
        class="text-[28px] font-bold leading-tight tracking-tight"
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-muted-foreground text-sm leading-relaxed"
      >
        {{ description }}
      </p>
    </div>

    <div
      v-if="qrcode"
      class="mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center rounded-2xl bg-white p-3"
    >
      <slot
        name="qr"
        :qrcode="qrcode"
      />
    </div>

    <div
      v-if="secret"
      class="flex flex-col gap-3"
    >
      <Label
        v-if="secretLabel"
        class="text-muted-foreground text-sm"
      >
        {{ secretLabel }}
      </Label>
      <div class="bg-muted/60 flex items-center gap-2 rounded-2xl px-4 py-3">
        <div class="flex-1 break-all text-sm font-medium">
          {{ secret }}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="shrink-0"
          @click="emit('copy')"
        >
          <slot name="copy-icon" />
        </Button>
      </div>
      <button
        v-if="regenerateLabel"
        type="button"
        class="text-muted-foreground self-start text-sm underline underline-offset-2"
        :disabled="loading"
        @click="emit('regenerate')"
      >
        {{ regenerateLabel }}
      </button>
    </div>

    <Button
      v-if="continueLabel"
      class="mt-auto h-12 w-full rounded-full text-base font-semibold"
      size="lg"
      :disabled="loading || !secret"
      @click="emit('continue')"
    >
      {{ continueLabel }}
    </Button>
  </div>
</template>
