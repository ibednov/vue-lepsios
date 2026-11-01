const OFETCH_HTTP_MESSAGE = /^\[[A-Z]+\]\s+"/

const isUsableMessage = (message: unknown): message is string =>
  typeof message === 'string' && message.length > 0 && !OFETCH_HTTP_MESSAGE.test(message)

const readPayloadMessage = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== 'object') {
    return undefined
  }

  const message = (payload as { message?: unknown }).message
  if (isUsableMessage(message)) {
    return message
  }

  if (Array.isArray(message) && isUsableMessage(message[0])) {
    return message[0]
  }

  return undefined
}

/**
 * Extract a user-facing API error message from useApi/fetchApi responses or raw ofetch errors.
 * Prefers localized `message` from the server body; never returns ofetch's `[METHOD] "url"` noise.
 */
export const handleErrorFromResponse = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') {
    return undefined
  }

  const apiError = error as {
    data?: unknown
    error?: { data?: unknown, message?: unknown }
    message?: unknown
    response?: { _data?: unknown, data?: unknown }
  }

  const serverMessage = readPayloadMessage(apiError.error?.data)
    ?? readPayloadMessage(apiError.response?._data)
    ?? readPayloadMessage(apiError.response?.data)
    ?? readPayloadMessage(apiError.data)
    ?? readPayloadMessage(apiError.error)

  if (serverMessage !== undefined) {
    return serverMessage
  }

  if (isUsableMessage(apiError.message)) {
    return apiError.message
  }

  return undefined
}
