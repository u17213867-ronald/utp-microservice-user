export function convertUTCToTimeZone(date: Date): string {
  const timeZoneDate = new Date(date.getTime() + 3600000 * -5)

  return formatDatetime(timeZoneDate)
}

export function formatDatetime(datetime: Date): string {
  const date = formatDate(datetime)
  const time = formatTime(datetime)

  return `${date} ${time}`
}
export function formatDate(date: Date): string {
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function formatTime(date: Date): string {
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

export function getCurrentMonthRange(): any {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const endOfMonth = new Date(startOfMonth)
  endOfMonth.setMonth(endOfMonth.getMonth() + 1)
  endOfMonth.setDate(0)
  endOfMonth.setHours(23, 59, 59, 999)

  return { startOfMonth, endOfMonth }
}
