export interface Swipe {
    destroy(): void
}

export function setupSwipeHorizontal(element: HTMLElement, horizontal: Function): Swipe {
    return setupSwipe(element, horizontal, null)
}

export function setupSwipeVertical(element: HTMLElement, vertical: Function): Swipe {
    return setupSwipe(element, null, vertical)
}

function setupSwipe(element: HTMLElement, horizontal: Function | null, vertical: Function | null): Swipe {
    let x1: number | null = null
    let y1: number | null = null

    element.addEventListener('pointerdown', down, false)
    element.addEventListener('pointermove', move, false)

    function down(event: PointerEvent) {
        x1 = event.clientX
        y1 = event.clientY
    }

    function move(event: PointerEvent) {
        if (x1 == null || y1 == null) return

        const x2: number = event.clientX
        const y2: number = event.clientY
        const dx: number = x2 - x1
        const dy: number = y2 - y1

        if (Math.abs(dx) > Math.abs(dy)) {
            if (horizontal) horizontal(dx)
        } else {
            if (vertical) vertical(dx)
        }

        // reset
        x1 = null
        y1 = null
    }

    return new class implements Swipe {
        destroy(): void {
            element.removeEventListener('pointerdown', down)
            element.removeEventListener('pointermove', move)
        }
    }
}
