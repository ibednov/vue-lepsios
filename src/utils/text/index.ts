import { useNotify } from '../../composables/ui/notify'

export { extractUrl, extractShareProductTitle, withShareProductTitle } from './url'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export interface ClipboardCopyOptions {
  successMessage?: string
  errorMessage?: string
}

export const clipboardCopy = async (
  text: string,
  options?: ClipboardCopyOptions,
): Promise<void> => {
  if (!text) {
    return
  }

  const { successMessage, errorMessage } = options || {}
  const { success, error } = useNotify()

  const notifySuccess = () => {
    if (successMessage) {
      success(successMessage)
    }
  }

  if (typeof window !== 'undefined' && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      notifySuccess()
      return
    }
    catch (err) {
      console.warn('Clipboard API failed:', err)
      if (errorMessage) {
        error(errorMessage)
      }
    }
  }

  if (typeof document === 'undefined') {
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
    notifySuccess()
  }
  finally {
    document.body.removeChild(textArea)
  }
}

export const isMoreThanCharacters = (text: string | null, length: number): boolean => {
  if (!text) {
    return false
  }

  return text.length >= length
}

export const isUrl = (text: string): boolean => {
  if (!text) {
    return false
  }

  return /^https?:\/\/(?:www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*$/i.test(text)
}
