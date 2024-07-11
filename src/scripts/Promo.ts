export default class Promo {

    code: string
    created: number
    viewed: boolean

    constructor(code: string, created: number, viewed: boolean) {
        this.code = code
        this.created = created
        this.viewed = viewed
    }

}

// dd.MM.yyyy HH:mm
export function formatPromoDate(date: Date): string {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('.') + ' ' + [date.getHours().toString().padStart(2 , '0'), date.getMinutes().toString().padStart(2 , '0')].join(':')
}
