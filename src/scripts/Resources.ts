import {loadImages} from "../../include/engine"
import {Sounds} from "./Sounds"

export function loadResources(complete?: Function) {
    Sounds.loadResources()
    loadImages(images, complete)
}

const images = [
    // StartMenu
    './images/description-en.png',
    './images/description-ru.png',
    './images/click-to-continue-en.png',
    './images/click-to-continue-ru.png',

    // Score
    './images/score-background.png',
    './images/play-en.png',
    './images/play-ru.png',
    './images/score-foreground-pizza@2x.png',
    './images/score-foreground-ru.png',
    './images/score-foreground-en.png',
    './images/score-foreground-tv-1@2x.png',
    './images/score-foreground-tv-2@2x.png',
    './images/score-foreground-tv-3@2x.png',
    './images/share-en.png',
    './images/share-ru.png',
    './images/playcoin.png',
    './images/flex-en.png',
    './images/flex-ru.png',
]
