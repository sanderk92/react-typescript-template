export const isSameDate = (left: Date, right: Date) => left.getDate() === right.getDate() && left.getMonth() === right.getMonth() && left.getFullYear() === right.getFullYear()

export const minusMonths = (date: Date, months: number): Date => {
    const newDate = new Date()
    newDate.setMonth(date.getMonth() - months)
    return newDate
}

export const timeAgoIndicator = (date: Date): string => {
    const now = new Date()
    const minutesBetween = Math.round((now.getTime() - date.getTime()) / 1000 / 60)
    const hoursBetween = Math.round(minutesBetween / 60)
    const daysBetween = Math.round(hoursBetween / 24)
    const weeksBetween = Math.round(Math.abs(daysBetween / 7))
    const monthsBetween = Math.round(Math.abs(daysBetween / 30))
    const yearsBetween = Math.round(Math.abs(daysBetween / 365))
    if (minutesBetween < 1) return timeString(minutesBetween, "minute")
    if (hoursBetween < 1) return timeString(minutesBetween, "minute")
    if (daysBetween < 1) return timeString(hoursBetween, "hour")
    if (daysBetween < 28) return timeString(daysBetween, "day")
    if (daysBetween < 70) return timeString(weeksBetween, "week")
    if (daysBetween < 365) return timeString(monthsBetween, "month")
    return timeString(yearsBetween, "year")
}

const timeString = (amount: number, unit: string): string => {
    return `${amount === 1 ? `1 ${unit}` : `${amount} ${unit}s`}`
}
