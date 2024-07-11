import {navigate} from "svelte-routing"
import Layout from "./layout.svelte"
import {context, isLocalhost} from "../include/engine"
import {Sounds} from "./scripts/Sounds"
import {navigateScorePage} from "./scripts/Navigation"

export function initializeLayout() {
    const element: HTMLElement | null = document.getElementById("layout");
    if (element !== null) {
        new Layout({target: element})
    }

    showMeta()
    showCore()
}

export function showStartMenuLayout() {
    navigate('/startMenu')
}

export function showGameLayout() {
    hideMeta()
    window.postMessage({wrapper: {method: "play", audio: Sounds.isEnabled(), locale: context.playdeck.user.locale}}, "*")

    if (isLocalhost) return navigateScorePage(0, 0, 0, 4) // quickfix todo improve
}

export function showScoreLayout(roundScore: number) {
    navigate(`/score/${roundScore}`)
    showMeta()
}

/*internals*/

function showMeta() {
    document.body.style.overflow = ''
    const meta = document.getElementById('meta');
    if (meta) meta.style.display = 'flex'
}

function hideMeta() {
    const meta = document.getElementById('meta');
    if (meta) meta.style.display = 'none'
}

function showCore() {
    document.body.style.overflow = 'hidden'
    const root = document.getElementById('unity-container');
    if (root) root.style.display = 'flex'
}

function hideCore() {
    const root = document.getElementById('unity-container');
    if (root) root.style.display = 'none'
}
