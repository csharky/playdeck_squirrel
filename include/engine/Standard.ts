export const isLocalhost: boolean = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname.startsWith('192.168.') // fixme improve

export function remainder(n: number) {
    return n % 1
}

export function setupFirstClickListener(listener: Function) {
    const dropFirstClickListener = (event: MouseEvent) => {
        listener()
        document.removeEventListener('click', dropFirstClickListener)
    }
    document.addEventListener('click', dropFirstClickListener)
}

export function setupFocusListener(listener: (hasFocus: boolean) => void) {
    document.addEventListener("visibilitychange", () => listener(document.visibilityState === "visible"))
}

export const isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)