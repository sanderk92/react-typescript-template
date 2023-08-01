export const isSameDate = (left: Date, right: Date) => left.getDate() === right.getDate() && left.getMonth() === right.getMonth() && left.getFullYear() === right.getFullYear()
export const timeShortFormatted = (date: Date): string => pad(date.getHours()) + ":" + pad(date.getMinutes())
export const dateShortFormatted = (date: Date): string => pad(date.getMonth()) + "-" + pad(date.getDate())
export const pad = (minutes: number): string => minutes.toString().padStart(2, '0')