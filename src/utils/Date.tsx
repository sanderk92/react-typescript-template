export const isSameDate = (left: Date, right: Date) => left.getDate() === right.getDate() && left.getMonth() === right.getMonth() && left.getFullYear() === right.getFullYear()

export const minusMonths = (date: Date, months: number): Date => {
    const newDate = new Date()
    newDate.setMonth(date.getMonth() - months)
    return newDate
}