import {initializeUser} from "./Client"
import User from "./User"
import {navigateScorePage} from "./Navigation"
import {isSoundEnabled, Sounds} from "./Sounds"
import {context, setupFirstClickListener, setupFocusListener} from "../../include/engine"

export class Controller {
    user: User
    isGame: boolean = false
}

export const controller: Controller = new Controller()

export async function initializeController() {
    controller.user = await initializeUser()
    initializeAnalytics()
    initializeSounds()
    initializeWrapper()
}

/*internals*/

function initializeAnalytics() {
    window.addEventListener('message', async ({data}) => {
        if (!data) return
        if (!data.analytics) return

        // 2. window.postMessage({ analytics: { collisions: 123, end_zone: 3, round_time: 23 }}, "*")
        if (data.analytics.round_time) {
            const {collisions, end_zone, round_time} = data.analytics
            navigateScorePage(collisions, end_zone, round_time, controller.user.roundScore)
        }
    })
}

function initializeSounds() {
    setupFocusListener((hasFocus) => isSoundEnabled.set(hasFocus))
    setupFirstClickListener(() => {
        isSoundEnabled.subscribe(() => Sounds.updateSoundMenuSoundtrack())
        Sounds.updateSoundMenuSoundtrack()
    })
    if (context.playdeck.hasWrapper) {
        context.playdeck.onPlay = () => Sounds.updateSoundMenuSoundtrack()
    } else {
        Sounds.updateSoundMenuSoundtrack()
    }
}

function initializeWrapper() {
    window.addEventListener('message', async ({data}) => {
        if (!data) return
        if (!data.wrapper) return
        const {method, value} = data.wrapper
        console.log('[Wrapper 🎾 :]', method, value)

        switch (method) {
            case 'setScore': {
                controller.user.roundScore = value
                break
            }
            case 'enableVolume': {
                isSoundEnabled.set(value as boolean)
                break
            }
        }
    })
}
