<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface CrmAccessRoleViewModel {
  roleKey: string
  permissionKeys: readonly string[]
}

const props = withDefaults(defineProps<{
  roles: readonly CrmAccessRoleViewModel[]
  mode?: 'roles' | 'permissions' | 'all'
  permissionCatalog?: string[]
  loading?: boolean
  error?: string | null
  labels: {
    rolesTitle: string
    permissionsTitle: string
    permissionCount: string
    emptyRoles: string
    emptyPermissions: string
    loading: string
  }
  roleLabel?: (roleKey: string) => string
  permissionLabel?: (permissionKey: string) => string
}>(), { mode: 'all', loading: false, error: null })

const permissions = computed(() => [...new Set([...props.roles.flatMap(role => role.permissionKeys), ...(props.permissionCatalog ?? [])])].sort())
const roleText = (key: string) => props.roleLabel?.(key) ?? key
const permissionText = (key: string) => props.permissionLabel?.(key) ?? key
</script>

<template>
  <div class="space-y-6" aria-live="polite">
    <p v-if="loading" class="text-sm text-muted-foreground" role="status">
      {{ labels.loading }}
    </p>
    <p v-else-if="error" class="text-sm text-destructive" role="alert">
      {{ error }}
    </p>
    <template v-else>
      <section v-if="mode !== 'permissions'" class="space-y-3">
        <h2 class="text-lg font-semibold">{{ labels.rolesTitle }}</h2>
        <div v-if="roles.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card v-for="role in roles" :key="role.roleKey">
            <CardHeader class="pb-3">
              <CardTitle class="text-base">{{ roleText(role.roleKey) }}</CardTitle>
              <p class="text-sm text-muted-foreground">
                {{ labels.permissionCount.replace('{count}', String(role.permissionKeys.length)) }}
              </p>
            </CardHeader>
            <CardContent>
              <ul v-if="role.permissionKeys.length" class="flex flex-wrap gap-2">
                <li v-for="permission in role.permissionKeys" :key="permission">
                  <Badge variant="secondary" class="break-all">{{ permissionText(permission) }}</Badge>
                </li>
              </ul>
              <p v-else class="text-sm text-muted-foreground">{{ labels.emptyPermissions }}</p>
            </CardContent>
          </Card>
        </div>
        <p v-else class="text-sm text-muted-foreground">{{ labels.emptyRoles }}</p>
      </section>
      <section v-if="mode !== 'roles'" class="space-y-3">
        <h2 class="text-lg font-semibold">{{ labels.permissionsTitle }}</h2>
        <ul v-if="permissions.length" class="grid gap-2 sm:grid-cols-2">
          <li v-for="permission in permissions" :key="permission" class="break-all rounded-md border px-3 py-2 font-mono text-sm">
            {{ permissionText(permission) }}
          </li>
        </ul>
        <p v-else class="text-sm text-muted-foreground">{{ labels.emptyPermissions }}</p>
      </section>
    </template>
  </div>
</template>
