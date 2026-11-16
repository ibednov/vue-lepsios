<script setup lang="ts">
import { nextTick } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'

interface Props {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  busy?: boolean
}

withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  busy: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const isOpenModel = defineModel<boolean>('open', { default: false })

const cleanupDialogArtifacts = () => {
  // Даём время на анимацию закрытия, затем чистим body/orphan portals
  nextTick(() => {
    setTimeout(() => {
      const body = document.body
      body.style.pointerEvents = ''
      body.style.overflow = ''
      body.style.paddingRight = ''

      const portals = document.querySelectorAll('[data-portal]')
      portals.forEach((portal) => {
        const overlay = portal.querySelector('[data-slot="dialog-overlay"]')
        if (overlay && !overlay.closest('[data-state="open"]')) {
          portal.remove()
        }
      })
    }, 300)
  })
}

const onOpenUpdate = (open: boolean) => {
  const wasOpen = isOpenModel.value
  isOpenModel.value = open
  if (!open && wasOpen) {
    cleanupDialogArtifacts()
  }
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const isOpen = () => isOpenModel.value
</script>

<template>
    <Dialog
        :open="isOpen()"
        @update:open="onOpenUpdate"
    >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription v-if="description">
                    {{ description }}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="outline"
                    :disabled="busy"
                    @click="handleCancel"
                >
                    {{ cancelText }}
                </Button>
                <Button
                    :variant="variant === 'destructive' ? 'destructive' : 'default'"
                    :disabled="busy"
                    @click="handleConfirm"
                >
                    {{ confirmText }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
