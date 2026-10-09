import { createContext } from 'reka-ui'
import type { Ref } from 'vue'

export { default as Command } from '@lepsios/vue/components/ui/command/command.vue'
export { default as CommandDialog } from '@lepsios/vue/components/ui/command/Commanddialog.vue'
export { default as CommandEmpty } from '@lepsios/vue/components/ui/command/command-empty.vue'
export { default as CommandGroup } from '@lepsios/vue/components/ui/command/command-group.vue'
export { default as CommandInput } from '@lepsios/vue/components/ui/command/Commandinput.vue'
export { default as CommandItem } from '@lepsios/vue/components/ui/command/command-item.vue'
export { default as CommandList } from '@lepsios/vue/components/ui/command/command-list.vue'
export { default as CommandSeparator } from '@lepsios/vue/components/ui/command/Commandseparator.vue'
export { default as CommandShortcut } from '@lepsios/vue/components/ui/command/command-shortcut.vue'

export const [useCommand, provideCommandContext] = createContext<{
    allItems: Ref<Map<string, string>>
    allGroups: Ref<Map<string, Set<string>>>
    filterState: {
        search: string
        filtered: { count: number; items: Map<string, number>; groups: Set<string> }
    }
    filterItems: () => void
    setSearch: (value: string | number | null | undefined) => void
}>('Command')

export const [useCommandGroup, provideCommandGroupContext] = createContext<{
    id?: string
}>('CommandGroup')
