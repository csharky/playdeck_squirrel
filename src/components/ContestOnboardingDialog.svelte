<script lang="ts">
    import {acceptPromoOnboarding} from "../scripts/Client.js"
    import {tweened} from "svelte/motion"
    import {expoOut} from "svelte/easing"
    import {onDestroy, onMount} from "svelte"
    import {setupSwipeHorizontal, Swipe} from "../../include/engine/Swipe"
    import {Sounds} from "../scripts/Sounds"
    import {controller} from "../scripts/Controller.js"
    import {navigateGamePage} from "../scripts/Navigation";

    export let close: Function

    let stepCount = 4
    let currentStep = 0
    let isStarted: boolean = false

    function previous() {
        currentStep = Math.max(0, currentStep - 1)
    }

    function next() {
        currentStep = Math.min(stepCount - 1, currentStep + 1)
    }

    const currentStepAnimation = tweened(currentStep, {
        duration: 410,
        easing: expoOut,
    })
    $: {
        currentStepAnimation.set(currentStep)
    }

    $: hasPrevious = currentStep !== 0
    $: hasNext = currentStep !== stepCount - 1

    /*play*/

    function start() {
        if (isStarted) return
        isStarted = true

        acceptPromoOnboarding()
        navigateGamePage()
    }

    /*swipe*/

    let swipe: Swipe

    onMount(() => {
        const slideContainer: HTMLDivElement | null = document.querySelector('.slide-container')
        if (slideContainer != null) {
            swipe = setupSwipeHorizontal(slideContainer, (dx: number) => {
                console.log(dx)
                if (dx < 0) {
                    next()
                } else if (dx > 0) {
                    previous()
                }
            })
        }
    })

    onDestroy(() => {
        swipe.destroy()
    })

    let heroMessage: string
    $: {
        heroMessage = "Мы приготовили для тебя крутые призы!"
        if (currentStep === 0) heroMessage = "Мы приготовили для тебя крутые призы!"
        if (currentStep === 1) heroMessage = "Собирай пиццу на уровне, чтобы зарабатывать очки"
        if (currentStep === 2) heroMessage = "Получи бесплатную пепперони по промокоду!"
        if (currentStep === 3) heroMessage = "За приглашение друга ты получишь 10 жизней!"
    }
</script>

<centered>
    <div class="page-width" style="position: absolute">
        <div class="onboarding-message-container">
            <img src="./images/onboarding-hero@3x.png" class="onboarding-hero" style="margin-right: 4px"/>
            <div class="onboarding-message-background">
                <div class="bubble"></div>
                <div class="onboarding-welcome">{heroMessage}</div>
            </div>
        </div>
        <div class="slide-container-with-indicators">
            <div class="slide-container" style="transform: translate({-$currentStepAnimation * 25}%, 0%)">
                <div class="slide" style="left: 0%">
                    <img src="./images/onboarding-contest-1@2x.png" class="slide-image"/>
                    <img src="./images/onboarding-contest-1-title@2x.png" class="slide-title"/>
                    <div class="slide-text">Играй и покупай пиццу от Papa John’s, чтобы участвовать в розыгрыше</div>
                </div>
                <div class="slide" style="left: 25%">
                    <img src="./images/onboarding-contest-2@2x.png" class="slide-image"/>
                    <img src="./images/onboarding-contest-2-title@2x.png" class="slide-title"/>
                    <div class="slide-text">Зарабатывай очки в аркаде. За каждые 100 набранных очков ты будешь получать промокод</div>
                </div>
                <div class="slide" style="left: 50%">
                    <img src="./images/onboarding-contest-3@2x.png" class="slide-image"/>
                    <img src="./images/onboarding-contest-3-title@2x.png" class="slide-title"/>
                    <div class="slide-text">Делай заказы с промокодом, чтобы повысить свои шансы на выигрыш. Каждый промокод - единоразовый</div>
                </div>
                <div class="slide" style="left: 75%">
                    <img src="./images/onboarding-contest-4@2x.png" class="slide-image"/>
                    <img src="./images/onboarding-contest-4-title@2x.png" class="slide-title"/>
                    <div class="slide-text">Для запуска аркады ты должен потратить 1 жизнь. Жизни восполняются со временем и выдаются за приглашение друзей.
                    </div>
                </div>
            </div>
            {#if controller.user.acceptPromoOnboarding}
                <button class="button-close-onboarding" on:click={() => {
                    close()
                }}></button>
            {/if}
            <centered style="margin-top: 4px">
                <div class="indicator" style="opacity: {currentStep === 0 ? 1 : 0.5}"></div>
                <div class="indicator" style="opacity: {currentStep === 1 ? 1 : 0.5}"></div>
                <div class="indicator" style="opacity: {currentStep === 2 ? 1 : 0.5}"></div>
                <div class="indicator" style="opacity: {currentStep === 3 ? 1 : 0.5}"></div>
            </centered>
        </div>
        <div class="button-container" style="margin-top: 4px">
            {#if currentStep === 3 && !controller.user.acceptPromoOnboarding}
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <button class="button-play clickable"
                            on:click={() => {
                        Sounds.playSoundButtonClick()
                        close()
                        start()
                    }}></button>
                    <div class="play-footer">Нажимая кнопку “Играть!” вы соглашаетесь с правилами проведения и участия в рекламной акции (bit.ly/papa_johns_rule)</div>
                </div>
            {:else}
                <button class="button-previous clickable" disabled={!hasPrevious} on:click={() => {
                    Sounds.playSoundButtonClick()
                    previous()
                }}></button>
                <button class="button-next clickable"
                        style="background-size: {hasNext ? 'contain, 0%' : '0%, contain'}"
                        on:click={() => {
                    Sounds.playSoundButtonClick()
                    if (hasNext) {
                        next()
                    } else {
                        close()
                    }
                }}></button>
            {/if}
        </div>
    </div>
</centered>

<style>
    centered {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        justify-content: center;
    }

    .background-main {
        width: 100vw;
        height: 100%;
        background: url('../images/background-main@2x.png') no-repeat center center;
        background-size: cover;
        background-color: #00072E66;
        background-blend-mode: multiply;
    }

    .page-width {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: calc(100% - 16px);
        margin: 8px;
    }

    .onboarding-message-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .onboarding-hero {
        width: 18vw;
        height: auto;
    }

    .onboarding-message-background {
        max-width: 62vw;
        background-color: white;
        border-radius: 16px;

        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .onboarding-welcome {
        padding: 12px 16px;
        font-size: calc(min(3.6vw, 2.4vh));
        color: #3521AC;
        text-shadow: 0px 1px 0px rgba(5, 89, 8, 0.25);
    }

    .slide-container-with-indicators {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .slide-container {
        display: flex;
        flex-direction: row;
        width: 400%;
        justify-content: space-around;
    }

    .slide {
        width: 90vw;
        height: fit-content;
        background-color: #FCEDD8;
        padding: 18px;
        padding-bottom: 24px;
        margin-left: 6vw;
        margin-right: 6vw;
        margin-top: 2vh;
        margin-bottom: 4px;
        border-radius: 32px;
    }

    .slide-image {
        width: 100%;
        border-radius: 16px;

        max-height: 25vh;
        object-fit: cover;
    }

    .slide-title {
        width: 90%;
        margin-top: 2%;
        margin-left: -3.1%;
    }

    .slide-text {
        font-size: calc(min(3.6vw, 2.4vh));
        margin-top: -1%;
        color: #3521AC;
    }

    .indicator {
        height: 8px;
        aspect-ratio: 1;
        border-radius: 4px;
        background-color: #FCEDD8;
        margin: 4px;
    }

    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .button-previous {
        width: 40vw;
        aspect-ratio: 2.67;
        background: url(../images/button-previous@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
        border-radius: 6vw;
    }

    .button-next {
        width: 40vw;
        aspect-ratio: 2.67;
        background: url(../images/button-next@2x.png), url(../images/button-exit@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
        border: none;
        border-radius: 6vw;
    }

    .button-play {
        width: 80vw;
        aspect-ratio: 5.32;
        background: url(../images/button-play-green@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
        border-radius: 6vw;
    }

    .button-close-onboarding {
        width: calc(min(12vh, 12vw));
        aspect-ratio: 1 / 1;
        position: absolute;
        right: 3%;
        background: url(../images/button-close-onboarding@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
    }

    .play-footer {
        font-size: 1.6vh;
        color: #FFFFFF;
        margin-top: 4px;
        margin-left: 16px;
        margin-right: 16px;
    }

    .bubble {
        position: absolute;
        width: 5vw;
        aspect-ratio: 1;
        margin-left: -2.5vw;
        border-radius: 2.5vw;
        border: none;
        background-color: white;
        z-index: -1;
    }
</style>

{#if true}
    <style>
        .modal-dialog {
            margin: 0px;
        }

        .modal-content {
            width: 100vw;
            height: 100vh;
        }
    </style>
{/if}
