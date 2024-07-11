import {context} from "./Engine"

export let isErudaInitialized: boolean = false

/*
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init()</script>
*/
export function initializeEruda(manifest: { title: string, version: number }, ...includeUsers: string[]) {
    if (includeUsers.map((it) => it.toLowerCase()).includes(context.playdeck.user.username.toLowerCase())
            || includeUsers.includes(context.playdeck.user.telegramId.toString())) {
        const script: HTMLScriptElement = document.createElement('script');
        script.appendChild(document.createTextNode('eruda.init()'))
        document.body.appendChild(script);

        console.log(`${manifest.title}: ${manifest.version}`)
        console.log('[PlayDeck 🎾 :]', 'getUserProfile', context.playdeck.user)

        isErudaInitialized = true
    }
}
