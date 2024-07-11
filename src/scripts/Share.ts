import {context} from "../../include/engine"
import {sendAnalyticsClickEvent} from "./Analytics"

export async function share() {
    const RU: boolean = context.playdeck.user.locale === 'ru'
    const text: string = RU ? "Укради как можно больше пицц и накорми летягу!" : "Steal as many pizzas as possible and feed the flying squirrel!"
    context.playdeck.customShare({telegramId: context.playdeck.user.telegramId, sessionId: context.playdeck.user.sessionId}, text)
    sendAnalyticsClickEvent('game_shared')
}
