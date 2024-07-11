import {get, writable, Writable} from "svelte/store"
import {loadSound} from "../../include/engine"
import {controller} from "./Controller"

export const isSoundEnabled: Writable<boolean> = writable(true)

export namespace Sounds {

    let buttonClick: HTMLAudioElement
    let menuSoundtrack: HTMLAudioElement

    export function toggleSound() {
        isSoundEnabled.set(!isEnabled())
    }

    export function isEnabled(): boolean {
        return get(isSoundEnabled)
    }

    export function loadResources() {
        buttonClick = loadSound('./audio/ButtonClick.mp3', {volume: 0.5})
        menuSoundtrack = loadSound('./audio/MenuSoundtrack.mp3', {volume: 0.5, loop: true})
    }

    export function playSoundButtonClick() {
        if (isMetaEnabled()) {
            buttonClick.play()
        }
    }

    export function updateSoundMenuSoundtrack() {
        if (isMetaEnabled()) {
            menuSoundtrack.play()
        } else {
            menuSoundtrack.pause()
        }
    }

    export function stopSoundMenuSoundtrack() {
        menuSoundtrack.pause()
        menuSoundtrack.currentTime = 0
    }

    /*internals*/

    function isMetaEnabled(): boolean {
        return !controller.isGame && isEnabled()
    }

}
