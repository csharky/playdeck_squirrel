export function loadImages(images: string[], complete?: Function) {
    let counter: number = images.length

    function nextImage(url: string) {
        counter--
        console.log(`loaded: ${url} (${counter})`)
        if (counter <= 0) {
            if (complete) complete()
        }
    }

    for (const image of images) {
        loadImage(image, nextImage)
    }
}

export function loadImage(url: string, complete: Function) {
    const imageElement: HTMLImageElement = document.createElement('img')
    imageElement.src = url
    imageElement.style.display = 'none'
    imageElement.onload = () => {
        complete(url)
    }
    document.body.appendChild(imageElement)
}

export function loadSound(url: string, options: { volume: number, loop?: boolean }) {
    const audio = new Audio(url)
    audio.loop = options.loop ?? false
    audio.volume = options.volume
    audio.load()
    return audio
}
