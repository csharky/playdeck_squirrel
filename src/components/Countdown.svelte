<VisibilityChange bind:state/>

<script lang="ts">
    export let open: Function
    export let showScoreDialog: Function

    import {navigate} from "svelte-routing"
    import {spring} from 'svelte/motion'
    import {timeToCompleteInSeconds} from "../scripts/Timer"
    import VisibilityChange from "svelte-visibility-change"
    import {remainder} from "../../include/engine/Standard"
    import {convertTimeInSecondsToDaysHoursMinutesSeconds} from "../../include/engine/Time"
    import {Sounds, isSoundEnabled} from "../scripts/Sounds.js"

    /*model*/

    let days: number, hours: number, minutes: number, seconds: number

    $: {
        const result = convertTimeInSecondsToDaysHoursMinutesSeconds($timeToCompleteInSeconds)
        days = result.days
        hours = result.hours
        minutes = result.minutes
        seconds = result.seconds
    }

    /*view*/

    $: day1 = Math.floor(days / 10)
    $: day2 = days % 10
    $: hour1 = Math.floor(hours / 10)
    $: hour2 = hours % 10
    $: minute1 = Math.floor(minutes / 10)
    $: minute2 = minutes % 10
    $: second1 = Math.floor(seconds / 10)
    $: second2 = seconds % 10

    /*animations*/

    let animations = []
    let day1Offset: number
    let day2Offset: number
    let hour1Offset: number
    let hour2Offset: number
    let minute1Offset: number
    let minute2Offset: number
    let second1Offset: number
    let second2Offset: number

    function startAnimations() {
        const day1Animation = spring()
        const day2Animation = spring()
        const hour1Animation = spring()
        const hour2Animation = spring()
        const minute1Animation = spring()
        const minute2Animation = spring()
        const second1Animation = spring()
        const second2Animation = spring()

        animations = [
            timeToCompleteInSeconds.subscribe((value) => {
                day1Animation.set(Math.floor(value / 864000))
                day2Animation.set(Math.floor(value / 86400))
                hour1Animation.set(Math.floor(value / 36000))
                hour2Animation.set(Math.floor(value / 3600))
                minute1Animation.set(Math.floor(value / 600))
                minute2Animation.set(Math.floor(value / 60))
                second1Animation.set(Math.floor(value / 10))
                second2Animation.set(Math.floor(value))
            }),
            day1Animation.subscribe((value) => day1Offset = remainder(value)),
            day2Animation.subscribe((value) => day2Offset = remainder(value)),
            hour1Animation.subscribe((value) => hour1Offset = remainder(value)),
            hour2Animation.subscribe((value) => hour2Offset = remainder(value)),
            minute1Animation.subscribe((value) => minute1Offset = remainder(value)),
            minute2Animation.subscribe((value) => minute2Offset = remainder(value)),
            second1Animation.subscribe((value) => second1Offset = remainder(value)),
            second2Animation.subscribe((value) => second2Offset = remainder(value)),
        ]
    }

    function stopAnimations() {
        for (const unsubscribe of animations) {
            unsubscribe()
        }
    }

    /*visibility*/

    let state: 'visible' | 'hidden'

    $: {
        if (state === 'visible') {
            startAnimations()
        } else {
            stopAnimations()
        }
    }
</script>

<div class="countdown-container">
    <img src="./images/countdown-background@2x.png" class="countdown-background"/>
    <img src="./images/countdown-title@2x.png" class="countdown-title"/>
    <img src="./images/date.png" class="date"/>
    <button class="button-about" on:click={() => {
        Sounds.playSoundButtonClick()
        open()
    }}></button>
    <div class="countdown-foreground-timer">
        <img src="./images/countdown-foreground-timer@2x.png" style="width: 100%; height: auto;"/>
        <div class="counter-viewport">
            <div class="digit-background" style="left: 3.125%"></div>
            <div class="counter-digits" style="transform: translate(0, {100 * day1Offset}%); left: 3.125%">
                <strong aria-hidden="true" class="hidden">{(day1 + 1) % 10}</strong>
                <strong>{day1}</strong>
            </div>
            <div class="digit-background" style="left: 16.125%"></div>
            <div class="counter-digits" style="transform: translate(0, {100 * day2Offset}%); left: 16.125%">
                <strong aria-hidden="true" class="hidden">{(day2 + 1) % 10}</strong>
                <strong>{day2}</strong>
            </div>
            <div class="digit-background" style="left: 37.5%"></div>
            <div class="counter-digits" style="transform: translate(0, {100 * hour1Offset}%); left: 37.5%">
                <strong aria-hidden="true" class="hidden">{(hour1 + 1) % 10}</strong>
                <strong>{hour1}</strong>
            </div>
            <div class="digit-background" style="left: 50.5%"></div>
            <div class="counter-digits" style="transform: translate(0, {100 * hour2Offset}%); left: 50.5%">
                <strong aria-hidden="true" class="hidden">{(hour2 + 1) % 10}</strong>
                <strong>{hour2}</strong>
            </div>
            <div class="digit-background" style="left: 71.875%"></div>
            <div class="counter-digits" style="transform: translate(0, {100 * minute1Offset}%); left: 71.875%">
                <strong aria-hidden="true" class="hidden">{(minute1 + 1) % 10}</strong>
                <strong>{minute1}</strong>
            </div>
            <div class="digit-background" style="left: 84.875%"></div>
            <div class="counter-digits" style="transform: translate(0, {100 * minute2Offset}%); left: 84.875%">
                <strong aria-hidden="true" class="hidden">{(minute2 + 1) % 10}</strong>
                <strong>{minute2}</strong>
            </div>
        </div>
        <div class="counter-labels-container">
            <div style="width: 32%" class="counter-label">Дней</div>
            <div style="width: 36%" class="counter-label">Часов</div>
            <div style="width: 32%" class="counter-label">Минут</div>
        </div>
    </div>
    <div class="prize-container">
        <div style="width: 33.3%">
            <div style="text-align: center"><img src="images/countdown-prize-1@2x.png" style="width: 100%"/></div>
            <div class="prize-title">
                <div style="color: #3F55CB">iPhone 15</div>
                <div style="color: #C97944">1шт</div>
            </div>
        </div>
        <div style="width: 33.3%">
            <div style="text-align: center"><img src="images/countdown-prize-2@2x.png" style="width: 100%"/></div>
            <div class="prize-title">
                <div style="color: #3F55CB">AirPods</div>
                <div style="color: #C97944">3шт</div>
            </div>
        </div>
        <div style="width: 33.3%">
            <div style="text-align: center"><img src="images/countdown-prize-3@2x.png" style="width: 100%"/></div>
            <div class="prize-title">
                <div style="color: #3F55CB">Telegram premium</div>
                <div style="color: #C97944">25шт</div>
            </div>
        </div>
    </div>
    <button class="button-sound" style="background-size: {$isSoundEnabled ? 'contain, 0%' : '0%, contain'}" on:click={() => {
        Sounds.toggleSound()
        Sounds.playSoundButtonClick()
    }}></button>
</div>

<style>
    .countdown-container {
        container-type: inline-size;
        position: relative;
        width: 100%;
    }

    .countdown-container .countdown-background {
        width: 100%;
        height: auto;
    }

    .countdown-container .countdown-title {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 47%;
        height: auto;
        background-size: contain;
    }

    .countdown-container .date {
        position: absolute;
        top: 14.1%;
        left: 9.5%;
        width: 18%;
        height: auto;
        background-size: contain;
    }

    .countdown-container .button-about {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50.5%;
        aspect-ratio: 3.72;
        border: none;
        background: url('../images/button-about@2x.png') no-repeat top left;
        background-size: contain;
        border-radius: calc(min(5.1vw, 3.4vh));
    }

    .button-sound {
        position: absolute;
        top: 9%;
        right: -2%;
        transform: translate(-50%, -50%);
        width: 14.5%;
        height: 11.65%;
        border: none;
        background: url(../images/button-sound-off@2x.png), url(../images/button-sound-on@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .countdown-container .countdown-foreground-timer {
        container-type: size;
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        height: 16.6%;
        background-size: contain;
    }

    .countdown-container .button-about:enabled:active {
        background-color: rgb(0, 7, 46, 0.3);
        background-blend-mode: multiply;
    }

    .countdown-container .button-about:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .counter-viewport {
        overflow: hidden;
        position: absolute;
        top: 49%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 50%;
        background-size: contain;
        text-align: center;
        container-type: inline-size;
    }

    .counter-digits {
        position: absolute;
        width: 10.3%;
        height: 92%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .counter-viewport strong {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: calc(min(3.9vw, 2.6vh));
        font-family: Rubik One, serif;
    }

    .hidden {
        top: -100%;
        user-select: none;
    }

    .digit-background {
        position: absolute;
        width: 12%;
        height: 100%;
        background: url('../images/countdown-background-number@2x.png') no-repeat top left;
        background-size: contain;
    }

    .counter-labels-container {
        position: absolute;
        top: 84%;
        left: 50%;
        transform: translate(-50%, 100%);
        height: auto;
        display: flex;
        container-type: inline-size;
        width: 90%;
        line-height: 0;
    }

    .counter-label {
        font-weight: 400;
        font-size: calc(min(2.7vw, 1.8vh));
        justify-content: center;
        display: flex;
        font-family: Rubik One, serif;
        color: #612F0E;
    }

    .countdown-container .prize-container {
        container-type: size;
        position: absolute;
        display: flex;
        justify-content: center;
        top: 72%;
        left: 50%;
        width: 70%;
        height: 16.6%;
        transform: translate(-50%, -50%);
        background-size: contain;
    }

    .prize-title {
        text-align: center;
        font-size: calc(min(2.7vw, 1.8vh));
        font-weight: 400;
    }
</style>
