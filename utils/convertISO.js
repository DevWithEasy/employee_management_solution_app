export default function convertToISO(dateStr, timeStr = '18:52:00') {
    const [day, month, year] = dateStr.split('/').map(Number)
    const [hours, minutes, seconds] = timeStr.split(':').map(Number)
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds))
    return date.toISOString()
  }