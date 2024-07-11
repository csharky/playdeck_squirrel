import {Context} from "./Context"

export const context: Context = new Context()

export function initializePlaydeck(main: Function) {
    context.playdeck.getUserProfile(
        () => context.playdeck.getToken(
            () => context.playdeck.getShareLink({telegramId: context.playdeck.user.telegramId, sessionId: context.playdeck.user.sessionId},
                () => main())))
}
