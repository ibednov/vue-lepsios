<script setup lang="ts">
import { ChevronsUpDown, Languages, LogOut, Moon, Sun } from 'lucide-vue-next'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'
import CrmPoweredBy from './crm-powered-by.vue'

/**
 * Universal CRM sidebar account footer (Wishimi canon).
 * Props/slots only — no i18n. Hosts own labels, auth actions, extras.
 */
defineProps<{
  title: string
  subtitle?: string
  /** Avatar monogram / initials. */
  initials: string
  tooltip?: string
  isDark?: boolean
  languageLabel?: string
  themeLabel?: string
  /** Show lang+theme icon row (default true when labels present). */
  showAppearance?: boolean
  logoutLabel?: string
  poweredByLabel?: string
  poweredByName?: string
  poweredByHref?: string
  poweredByLogoSrc?: string
}>()

const emit = defineEmits<{
  toggleLocale: []
  toggleDark: []
  logout: []
}>()

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarFooter class="border-t border-sidebar-border pt-2">
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton
              size="lg"
              class="justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              :tooltip="tooltip || title"
            >
              <div class="flex min-w-0 items-center gap-2">
                <Avatar class="size-8 rounded-lg">
                  <AvatarFallback class="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {{ initials }}
                  </AvatarFallback>
                </Avatar>
                <div class="grid min-w-0 flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ title }}</span>
                  <span
                    v-if="subtitle"
                    class="truncate text-xs text-muted-foreground"
                  >{{ subtitle }}</span>
                </div>
              </div>
              <ChevronsUpDown
                class="size-4 shrink-0"
                aria-hidden="true"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="min-w-56 rounded-lg"
            :side="isMobile ? 'top' : 'right'"
            align="end"
            :side-offset="4"
          >
            <DropdownMenuLabel class="font-normal">
              <div class="flex items-center gap-2">
                <Avatar class="size-8 rounded-lg">
                  <AvatarFallback class="rounded-lg">
                    {{ initials }}
                  </AvatarFallback>
                </Avatar>
                <div class="grid min-w-0 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ title }}</span>
                  <span
                    v-if="subtitle"
                    class="truncate text-xs text-muted-foreground"
                  >{{ subtitle }}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <template v-if="showAppearance !== false && (languageLabel || themeLabel)">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                v-if="languageLabel"
                @select="emit('toggleLocale')"
              >
                <Languages
                  class="size-4"
                  aria-hidden="true"
                />
                {{ languageLabel }}
              </DropdownMenuItem>
              <DropdownMenuItem
                v-if="themeLabel"
                @select="emit('toggleDark')"
              >
                <Moon
                  v-if="isDark"
                  class="size-4"
                  aria-hidden="true"
                />
                <Sun
                  v-else
                  class="size-4"
                  aria-hidden="true"
                />
                {{ themeLabel }}
              </DropdownMenuItem>
            </template>

            <slot name="menu" />

            <template v-if="logoutLabel">
              <DropdownMenuSeparator />
              <DropdownMenuItem @select="emit('logout')">
                <LogOut
                  class="size-4"
                  aria-hidden="true"
                />
                {{ logoutLabel }}
              </DropdownMenuItem>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>

    <CrmPoweredBy
      v-if="poweredByHref"
      class="mx-2 mb-1"
      :label="poweredByLabel"
      :name="poweredByName"
      :href="poweredByHref"
      :logo-src="poweredByLogoSrc"
    />
  </SidebarFooter>
</template>
