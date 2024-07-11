// https://www.notion.so/tonplay/f5060f41af17407ead091f350bce6477#7fe11091326d4c4cb824b89a41d5f896
import {context} from "../../include/engine"
import {controller} from "./Controller"

export function sendAnalyticsGameStartEvent() {
    context.playdeck.sendAnalytics('game_start', {
        name: 'game_start',
    })
}

type ClickEventName = 'game_shared' // юзер нажал кнопку пригласить друга (поделиться, копировать ссылку)

// нажатия кнопок
export function sendAnalyticsClickEvent(name: ClickEventName) {
    context.playdeck.sendAnalytics('click', {
        name: name,
    })
}

// начало мини игры
export function sendAnalyticsRoundStartEvent() {
    context.playdeck.sendAnalytics('round_start', {
        name: 'round_start',
        id: controller.user.roundId, // айди мини игры
    })
}

type GameResult = 'loose' // раунд мини игры завершен

// мини игра завершилась
export function sendAnalyticsRoundFinishEvent(collisions: number, end_zone: number, result: GameResult, round_time: number, roundScore: number) {
    context.playdeck.sendAnalytics('round_finish', {
        name: 'round_finish',
        id: controller.user.roundId, // айди мини игры
        pizza_delta: roundScore,
        end_zone: end_zone, // сегмент на котором завершилась мини игра
    })
}
