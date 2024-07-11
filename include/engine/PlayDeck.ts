import PlayDeckUser from "./PlayDeckUser"

export class PlayDeck {

    user: PlayDeckUser = new PlayDeckUser()
    score: number
    isOpen: boolean
    data: any
    token: string = 'default'
    shareLink: string = '1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678' // todo something clever
    onPlay: Function = () => {
    }
    onPause: Function = () => {
    }
    private readonly parent: Window = window.parent.window

    constructor() {
        window.addEventListener('message', ({data}) => {
            if (!data) return
            if (!data.playdeck) return
            const {method, value} = data.playdeck
            console.log('[PlayDeck 🎾 :]', method, value)

            switch (method) {
                case 'getUserProfile':
                    if (value !== undefined) {
                        this.user = value
                    }
                    break
                case 'getScore':
                    this.score = value
                    break
                case 'getData':
                    this.data = value
                    break
                case 'isOpen':
                    this.isOpen = value
                    break
                case 'play':
                    this.onPlay()
                    break
                case 'pause':
                    this.onPause()
                    break
                case 'getToken':
                    if (value !== undefined) {
                        this.token = value.token
                    }
                    break
                case 'getShareLink':
                    if (typeof value === 'string') {
                        this.shareLink = value
                    }
                    break
            }
        })
    }

    get hasWrapper(): boolean {
        return this.user.telegramId !== 0
    }

    getToken(completeListener?: Function) {
        if (completeListener) this.runOnComplete('getToken', completeListener)
        this.parent.postMessage({playdeck: {method: 'getToken'}}, '*')
    }

    getUserProfile(completeListener?: Function) {
        if (completeListener) this.runOnComplete('getUserProfile', completeListener)
        this.parent.postMessage({playdeck: {method: 'getUserProfile'}}, '*')
    }

    loading(progress?: number) {
        this.parent.postMessage({playdeck: {method: 'loading', value: progress}}, '*')
    }

    gameEnd() {
        this.parent.postMessage({playdeck: {method: 'gameEnd'}}, '*')
    }

    setScore(score: number, isForce = false) {
        this.parent.postMessage({playdeck: {method: 'setScore', value: score, isForce: isForce}}, '*')
    }

    getScore(completeListener?: Function) {
        if (completeListener) this.runOnComplete('getScore', completeListener)
        this.parent.postMessage({playdeck: {method: 'getScore'}}, '*')
    }

    customShare(value: {[key: string]: any}, text: string) {
        this.parent.postMessage({playdeck: {method: 'customShare', value, text}}, '*')
    }

    setData(key: string, value: string | number | object) {
        this.parent.postMessage({playdeck: {method: 'setData', key: key, value: value}}, '*')
    }

    getData(key: string, completeListener?: Function) {
        if (completeListener) this.runOnComplete('getData', completeListener)
        this.parent.postMessage({playdeck: {method: 'getData', key: key}}, '*')
    }

    getState() {
        this.parent.postMessage({playdeck: {method: 'getPlaydeckState'}}, '*')
    }

    openTelegramLink(url: string) {
        parent.postMessage({playdeck: {method: 'openTelegramLink', value: url}}, "*")
    }

    pushMessage(title: string, text: string, userId: number) {
        console.log(`pushMessage: ${text}`)
        console.log(`userId: ${userId}`)
        this.parent.postMessage({
            playdeck: {
                method: 'pushMessage', value: {
                    telegramUserId: userId,
                    text: text,
                    button: {
                        text: title,
                        params: {},
                    },
                }
            }
        }, '*')
    }

    sendAnalytics(type: string | undefined, properties: {}) {
        const event = {
            type: type,
            event_properties: properties,
            user_properties: {
                telegram_id: this.user.telegramId,
            }
        }
        parent.postMessage({playdeck: {method: 'sendAnalytics', value: event}}, '*')
        console.log(`analytics:`)
        console.log(event)
    }

    getShareLink(parameters: {}, completeListener?: Function) {
        if (completeListener) this.runOnComplete('getShareLink', completeListener)
        parent.postMessage({playdeck: {method: 'getShareLink', value: parameters}}, '*');
    }

    /*internals*/

    // fixme replace with async calls
    private runOnComplete(type: string, completeListener: Function) {
        const listener = ({data}: MessageEvent) => {
            if (!data) return
            const {method, value} = data.playdeck
            if (method == type) {
                window.removeEventListener('message', listener)
                completeListener(value)
            }
        }
        window.addEventListener('message', listener)
    }


}
