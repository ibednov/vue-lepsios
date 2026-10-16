/** E.164 for auth API: strip spaces, keep leading +, prefix + when digits-only. */
export const normalizeAuthPhone = (phone: string | null | undefined): string => {
  if (phone == null)
    return ''
  const compact = phone.replace(/\s+/g, '').trim()
  if (compact.startsWith('+'))
    return compact
  const digits = compact.replace(/\D/g, '')
  if (!digits)
    return compact
  return `+${digits}`
}

export const getAuthPhoneCountry = (phone: string): string => {
  const normalized = normalizeAuthPhone(phone)
  if (normalized.startsWith('+375'))
    return 'by'
  if (normalized.startsWith('+7'))
    return 'ru'
  if (normalized.startsWith('+994'))
    return 'az'
  return 'by'
}

export const isAuthPhoneFilled = (phone: string | null | undefined): boolean =>
  (phone ?? '').replace(/\D/g, '').length >= 10
