export const extractUrl = (text: string): string | null => {
  if (!text) {
    return null
  }

  const urlRegex = /https?:\/\/[^\s<>"\'，。、【】「」]+/i
  const match = text.match(urlRegex)

  return match ? match[0].replace(/[.,;:)）]+$/g, '') : null
}

const shareProductTitlePattern = /「([^」]{4,200})」/

export const extractShareProductTitle = (raw: unknown): string => {
  const match = String(raw ?? '').match(shareProductTitlePattern)
  return match?.[1]?.trim() ?? ''
}

export const withShareProductTitle = (url: string, raw: unknown): string => {
  const title = extractShareProductTitle(raw)
  if (!url || !title) {
    return url
  }
  if (url.includes(`「${title}」`)) {
    return url
  }
  return `${url} 「${title}」`
}
