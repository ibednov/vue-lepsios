import { onBeforeUnmount, ref } from 'vue'
import {
  assemblePrivateFile,
  type AssembledPrivateFile,
  type PrivateFileMeta,
} from '../../utils/files/private'

export function usePrivateFile() {
  const current = ref<AssembledPrivateFile | null>(null)

  const revoke = () => {
    current.value?.revoke()
    current.value = null
  }

  const assemble = (meta: PrivateFileMeta, bytes: ArrayBuffer | Uint8Array | Blob) => {
    revoke()
    const assembled = assemblePrivateFile(meta, bytes)
    current.value = assembled
    return assembled
  }

  onBeforeUnmount(revoke)

  return { current, assemble, revoke }
}
