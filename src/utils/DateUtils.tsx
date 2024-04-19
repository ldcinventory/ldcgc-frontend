export const toDateString = (date: Date | undefined, lang: string, options: Intl.DateTimeFormatOptions = {}) => {
  if (date === undefined)
    return ''

  return new Date(date).toLocaleDateString(lang, options)
}