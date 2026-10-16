<script setup lang="ts">
import ContainerModalDrawer from '../container-modal-drawer.vue'
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level } from 'qrcode.vue'


interface Props {
  url: string
  title: string
  description?: string
  size?: number
  level?: Level
  foreground?: string
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 148,
  level: 'M',
  foreground: '#ffffff',
  background: 'transparent',
})
const clientMounted = ref(false)
onMounted(() => { clientMounted.value = true })

</script>

<template>
    <ContainerModalDrawer
        drawer-hide-footer
    >
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #default>
            <div class="flex flex-col gap-5">
                <MediaFrame class="flex h-[180px] items-center justify-center p-4">
                    <template v-if="clientMounted">
                        <QrcodeVue
                            :value="url"
                            :size="props.size"
                            :level="props.level"
                            render-as="svg"
                            :foreground="props.foreground"
                            :background="props.background"
                        />
                    </template>
                </MediaFrame>

                <div class="flex flex-col gap-2 text-left">
                    <h3 class="text-2xl font-semibold text-accent-foreground">
                        {{ title }}
                    </h3>
                    <p
                        v-if="description"
                        class="text-base text-muted-foreground"
                    >
                        {{ description }}
                    </p>
                </div>
            </div>
        </template>
    </ContainerModalDrawer>
</template>
