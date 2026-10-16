<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup } from '../ui/dropdown-menu'
import { ButtonGroup } from '../ui/button-group'
import { Icon } from '@iconify/vue'


export interface StatusActionOption {
  value: string
  label: string
  actionLabel?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  options: StatusActionOption[]
  primaryValue?: string
  disabled?: boolean
  menuLabel?: string
}>(), { disabled: false })

const emit = defineEmits<{ submit: [value: string] }>()
const model = defineModel<string>({ required: true })
const primary = computed(() => props.options.find(option => option.value === props.primaryValue) ?? props.options[0])
const rest = computed(() => props.options.filter(option => option.value !== primary.value?.value))

const choose = (value: string) => {
  model.value = value
  emit('submit', value)
}
</script>

<template>
    <ButtonGroup class="w-full">
        <Button
            type="button"
            variant="outline"
            class="min-w-0 flex-1"
            :disabled="disabled || !primary || primary.disabled"
            @click="primary && choose(primary.value)"
        >
            {{ primary?.actionLabel ?? primary?.label }}
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    :disabled="disabled || !rest.length"
                    :aria-label="menuLabel"
                >
                    <Icon icon="lucide:chevron-down" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        v-for="option in rest"
                        :key="option.value"
                        :disabled="option.disabled"
                        @select="choose(option.value)"
                    >
                        {{ option.label }}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </ButtonGroup>
</template>
