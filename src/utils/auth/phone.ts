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

export const getAuthPhoneCountry = (phone: string): string | undefined => {
  const normalized = normalizeAuthPhone(phone)
  if (normalized.startsWith('+375'))
    return 'by'
  if (normalized.startsWith('+7'))
    return 'ru'
  if (normalized.startsWith('+994'))
    return 'az'
  return undefined
}

export const isAuthPhoneFilled = (phone: string | null | undefined): boolean =>
  (phone ?? '').replace(/\D/g, '').length >= 10

/**
 * Parse and normalize an auth phone only when validation needs country metadata.
 * The phone selector's country table stays out of the importing module graph.
 */
export const normalizeAuthPhoneWithCountry = async (phone: string | null | undefined): Promise<string | null> => {
  if (!phone || !/^[+\d\s().-]+$/.test(phone))
    return null

  const normalized = normalizeAuthPhone(phone)
  if (!/^\+\d{7,15}$/.test(normalized))
    return null

  const { getCountries, getMaskForCountry, parsePhoneNumberValue } = await import('alexbednov-phone-select')
  const parsed = parsePhoneNumberValue(normalized, getCountries('en'))
  if (!parsed.country || !/^\d+$/.test(parsed.nationalNumber))
    return null

  const expectedLength = (getMaskForCountry(parsed.country).match(/#/g) ?? []).length
  if (!expectedLength || parsed.nationalNumber.length !== expectedLength)
    return null

  return `+${parsed.country.phone_code}${parsed.nationalNumber}`
}

/** Load phone formatting only on auth routes that display a confirmed number. */
export const formatAuthPhone = async (phone: string, countryCode?: string): Promise<string> => {
  if (!phone)
    return ''
  const { formatPhoneNumber } = await import('alexbednov-phone-select')
  return formatPhoneNumber(phone, countryCode ? { countryCode } : undefined)
}

/** Resolve a parsed phone's ISO country code when submitting auth registration. */
export const getParsedAuthPhoneCountry = async (phone: string): Promise<string | undefined> => {
  if (!phone)
    return undefined
  const { getCountries, parsePhoneNumberValue } = await import('alexbednov-phone-select')
  const parsed = parsePhoneNumberValue(normalizeAuthPhone(phone), getCountries('en'))
  return parsed.country?.country_code?.toLowerCase()
}
