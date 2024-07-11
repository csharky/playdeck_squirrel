<script lang="ts">
    import { context } from "../../include/engine";
    import {controller} from "../scripts/Controller.js"
    import {navigateMainPage} from "../scripts/Navigation.js"
    import {Sounds} from "../scripts/Sounds"

    export let lastScore: number
    const RU: boolean = context.playdeck.user.locale === 'ru';


    function tickerText() {
       return ' ';
    }

    let tickerX: number = 0
    setInterval(() => {
        tickerX -= 0.5 * window.devicePixelRatio
        if (tickerX < -5 * tickerText().length) {
            tickerX = 200
        }
    }, 30)
</script>


<div class="page-width">
    <div class="score-background">
        <div class="score-max">Рекорд: {controller.user.maxScore}</div>
        <div class="score-text">
            {lastScore}
            <img src="../images/playcoin.png" class="score-foreground-pizza"/>
        </div>
        <div class="score-foreground"
             style="background-size: {RU ? 'contain, 0%' : '0%, contain'}">
            <div class="ticker">
                <div id="ticker-text" style="transform: translate({tickerX}px, 0%)">{tickerText()}</div>
            </div>
        </div>
    </div>
    <button class="button-score clickable" on:click={() => {
        Sounds.playSoundButtonClick()
        navigateMainPage()
    }}></button>
</div>

<style>
    .page-width {
        display: flex;
        flex-direction: column;
        width: calc(100vw - 32px);
        height: calc(100vh - 32px);
        margin: 16px;
        align-items: center;
        justify-content: center;
    }

    .score-background {
        height: 80%;
        aspect-ratio: 0.72;
        background: url(../images/score-background@2x.png) no-repeat center center;
        background-size: contain;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .score-max {
        position: relative;
        line-height: 0;
        top: 31.55%;
        height: 3%;
        font-size: calc(min(3vw, 2vh));
        color: #FFFFFF;
    }

    .score-text {
        position: relative;
        line-height: 0;
        top: 33.6%;
        height: 14.8%;
        font-size: calc(min(13.5vw, 9vh));
        color: white;
        -webkit-text-stroke-width: calc(min(0.9vw, 0.6vh));
        -webkit-text-stroke-color: #540A0A;
        letter-spacing: -1.1px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .score-foreground {
        position: relative;
        line-height: 0;
        top: 37%;
        height: 34%;
        aspect-ratio: 1.6;
        background: url(../images/score-foreground-ru.png), url(../images/score-foreground-en.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .score-foreground-pizza {
        width: calc(min(17vw, 11.2vh));
    }

    .button-score {
        height: 10%;
        aspect-ratio: 4.77;
        background: url(../images/button-score@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
        border-radius: calc(min(6vw, 4.2vh));
        margin-top: 1vh;
    }

    .ticker {
        position: absolute;
        top: 74%;
        left: 16%;
        width: 26%;
        height: auto;
        white-space: nowrap;
        overflow: hidden;
    }

    #ticker-text {
        line-height: 1;
        font-size: calc(min(2.2vh, 2.2vw));
        color: white;
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
