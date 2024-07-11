export const DAYS_TO_SECONDS: number = 86400
export const HOURS_TO_SECONDS: number = 3600
export const MINUTES_TO_SECONDS: number = 60

export function convertTimeInSecondsToDaysHoursMinutesSeconds(timeInSeconds: number) {
    const days: number = Math.floor(timeInSeconds / DAYS_TO_SECONDS)
    const hours: number = Math.floor((timeInSeconds % DAYS_TO_SECONDS) / HOURS_TO_SECONDS)
    const minutes: number = Math.floor((timeInSeconds % HOURS_TO_SECONDS) / MINUTES_TO_SECONDS)
    const seconds: number = Math.floor((timeInSeconds % MINUTES_TO_SECONDS))
    return {days, hours, minutes, seconds}
}

export function convertTimeInSecondsToDdHhMmSs(timeInSeconds: number) {
    const {days, hours, minutes, seconds} = convertTimeInSecondsToDaysHoursMinutesSeconds(timeInSeconds)
    const dd: string = days < 10 ? `0${days}` : `${days}`
    const hh: string = hours < 10 ? `0${hours}` : `${hours}`
    const mm: string = minutes < 10 ? `0${minutes}` : `${minutes}`
    const ss: string = seconds < 10 ? `0${seconds}` : `${seconds}`
    return {dd, hh, mm, ss}
}
