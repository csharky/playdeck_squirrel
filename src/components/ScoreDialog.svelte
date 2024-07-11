<script lang="ts">
    import {controller} from "../scripts/Controller.js"
    import {navigateGamePage} from "../scripts/Navigation.js"
    import {Sounds} from "../scripts/Sounds"
    import {context} from "../../include/engine"
    import {share} from "../scripts/Share.js"

    export let roundScore: number
    export let close: Function

    const RU: boolean = context.playdeck.user.locale === 'ru';

    function tickerText() {
        return ' ';
    }

    let tickerX: number = 80
    setInterval(() => {
        tickerX -= 0.5 * window.devicePixelRatio
        if (tickerX < -5.4 * tickerText().length) {
            tickerX = 160
        }
    }, 30)
</script>


<div class="page-width">
    <div class="score-background">
        <div class="score-max">{RU ? 'Рекорд' : 'Record'}: {controller.user.maxScore}</div>
        <div class="score" style="background-size: {RU ? 'contain, 0%' : '0%, contain'}"></div>
        <div class="score-text">
            {roundScore}
            <img src="../images/playcoin.png" class="score-foreground-pizza"/>
        </div>
        <div class="score-foreground"
             style="background-size: {RU ? 'contain, 0%' : '0%, contain'}">
            <div class="ticker">
                <div id="ticker-text" style="transform: translate({tickerX}px, 0%)">{tickerText()}</div>
            </div>
        </div>
    </div>
    <div style="display: flex; flex-direction: row; height: 15%; width: 200%; justify-content: center; margin-top: 8px">
        <button class="button-play clickable" style="background-size: {RU ? 'contain, 0%' : '0%, contain'}; margin-left: 6px" on:click={() => {
            Sounds.playSoundButtonClick()
            close()
            navigateGamePage()
        }}></button>
    </div>
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
        position: relative;
        height: 80%;
        aspect-ratio: calc(606 / 827);
        background: url(../images/score-background.png) center center;
        background-repeat: no-repeat;
        background-size: contain;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .score-max {
        position: absolute;
        line-height: 0;
        top: 31.55%;
        height: 3%;
        font-size: calc(min(3vw, 2vh));
        color: #FFFFFF;
    }

    .score {
        position: absolute;
        line-height: 0;
        top: 19%;
        height: 11%;

        aspect-ratio: calc(270 / 141);
        background: url(../images/score-ru.png), url(../images/score-en.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .score-text {
        position: absolute;
        line-height: 0;
        top: 36.6%;
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
        position: absolute;
        line-height: 0;
        top: 55.5%;
        height: 34%;
        aspect-ratio: calc(680 / 422);
        background: url(../images/score-foreground-ru.png), url(../images/score-foreground-en.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .score-foreground-pizza {
        width: calc(min(17vw, 11.2vh));
    }

    .button-play {
        height: 100%;
        max-width: 36%;
        aspect-ratio: calc(278 / 112);
        background-position-x: center;
        background-position-y: center;
        background: url(../images/flex-ru.png), url(../images/flex-en.png);
        background-size: contain;
        background-repeat: no-repeat;
        border: none;
        border-radius: calc(min(5.2vw, 4.2vh));
    }

    .ticker {
        position: absolute;
        top: 75%;
        left: 16%;
        width: 40%;
        height: auto;
        white-space: nowrap;
        overflow: hidden;
    }

    #ticker-text {
        line-height: 1;
        font-size: calc(min(2.4vh, 2.4vw));
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
