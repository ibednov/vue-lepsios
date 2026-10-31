export interface PrivateFileMeta {
  id: string
  filename: string
  mime_type: string
  size?: number
}

export interface AssembledPrivateFile {
  blob: Blob
  objectUrl: string
  filename: string
  mimeType: string
  revoke: () => void
}

/** Build a local Blob from authenticated backend bytes. Never use a storage URL. */
export function assemblePrivateFile(
  meta: PrivateFileMeta,
  bytes: ArrayBuffer | Uint8Array | Blob,
): AssembledPrivateFile {
  const mimeType = meta.mime_type || 'application/octet-stream'
  const blob = bytes instanceof Blob
    ? bytes
    : new Blob([bytes] as BlobPart[], { type: mimeType })
  const objectUrl = URL.createObjectURL(blob)
  return {
    blob,
    objectUrl,
    filename: meta.filename || meta.id,
    mimeType,
    revoke: () => URL.revokeObjectURL(objectUrl),
  }
}
