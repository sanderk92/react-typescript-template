export const isSameDate = (left: Date, right: Date) => left.getDate() === right.getDate() && left.getMonth() === right.getMonth() && left.getFullYear() === right.getFullYear()
export const timeShortFormatted = (date: Date): string => pad(date.getHours()) + ":" + pad(date.getMinutes())
export const dateShortFormatted = (date: Date): string => pad(date.getMonth()) + " " + months[date.getMonth()]
export const pad = (minutes: number): string => minutes.toString().padStart(2, '0')

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const minusMonths = (date: Date, months: number): Date => {
    const newDate = new Date()
    newDate.setMonth(date.getMonth() - months)
    return newDate
}