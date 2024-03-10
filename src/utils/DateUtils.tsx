export const toDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-")
  const date = new Date(year, month - 1, day)
  return date
}

export const toDateInputString = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`
}