export const minusMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date)
    newDate.setMonth(date.getMonth() - months)
    return newDate
}

export const plusDays = (date: Date, days: number): Date => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + days)
    return newDate
}

export const atStartOfDay = (date: Date) => {
    const newDate = new Date(date)
    newDate.setHours(0,0,0,0);
    return newDate
}

export const atEndOfDay = (date: Date) => {
    const newDate = new Date(date)
    newDate.setHours(23,59,59,999);
    return newDate
}

export const timeIndicator = (date: Date): string => {
    const now = new Date()
    const minutesBetween = Math.round((now.getTime() - date.getTime()) / 1000 / 60)
    const hoursBetween = Math.round(minutesBetween / 60)
    const daysBetween = Math.round(hoursBetween / 24)
    const weeksBetween = Math.round(Math.abs(daysBetween / 7))
    const monthsBetween = Math.round(Math.abs(daysBetween / 30))
    const yearsBetween = Math.round(Math.abs(daysBetween / 365))
    if (minutesBetween < 1) return timeString(minutesBetween, "min")
    if (hoursBetween < 1) return timeString(minutesBetween, "min")
    if (daysBetween < 1) return timeString(hoursBetween, "hour")
    if (daysBetween < 28) return timeString(daysBetween, "day")
    if (daysBetween < 70) return timeString(weeksBetween, "week")
    if (daysBetween < 365) return timeString(monthsBetween, "month")
    return timeString(yearsBetween, "year")
}

const timeString = (amount: number, unit: string): string => {
    return `${amount === 1 ? `1 ${unit}` : `${amount} ${unit}s`}`
}

export const hourMinuteBetweenIndicator = (from: Date, until: Date): string => {
    const totalMinutes = Math.round((until.getTime() - from.getTime()) / 1000 / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)
    return `${zeroPadded(hours)}:${zeroPadded(minutes)}`
}

const zeroPadded = (count: number): string => {
    return count <= 9 ? `0${count}` : count.toString()
}
