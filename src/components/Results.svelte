<script lang="ts">
    import {navigate} from "svelte-routing"
    import {Sounds} from "../scripts/Sounds"
    import {isSoundEnabled} from "../scripts/Sounds.js"
    import {controller} from "../scripts/Controller";
    import {HOURS_TO_SECONDS} from "../../include/engine/Time"
    import {context} from "../../include/engine"

    const done: boolean = /*(controller.user.promoEnded - new Date().getTime()) / 1000 + 36 * HOURS_TO_SECONDS < 0*/true
</script>

<div class="container" style="background-size: {done ? '0%, contain' : 'contain, 0%'}">
    <div class="closing-message" style="background-size: {done ? '0%, contain' : 'contain, 0%'}" on:click={() => {
        navigate('/main')
    }}></div>
    <button class="button-website clickable" on:click={() => {
        context.playdeck.openTelegramLink("https://vk.com/wall-10095732_113840")
    }}></button>
    <button class="button-sound" style="background-size: {$isSoundEnabled ? 'contain, 0%' : '0%, contain'}" on:click={() => {
        Sounds.toggleSound()
        Sounds.playSoundButtonClick()
    }}></button>
</div>

<style>
    .container {
        position: relative;
        width: 100%;
        aspect-ratio: calc(659/655);
        background: url(../images/closing-background-progress.png), url(../images/closing-background-done.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
        border: none;
    }

    .closing-message {
        position: absolute;
        top: 31%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 77%;
        aspect-ratio: 5.57;
        background: url(../images/closing-message-progress@2x.png), url(../images/closing-message-done@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
        border: none;
    }

    .button-website {
        position: absolute;
        width: 50%;
        left: 50%;
        transform: translate(-50%, 0%);
        top: 72%;
        aspect-ratio: 3.72;
        border: none;
        background: url(../images/button-website@2x.png) no-repeat center center;
        background-size: contain;
        border-radius: calc(min(5.1vw, 3.4vh));
    }

    .button-sound {
        position: absolute;
        left: 84%;
        top: 4%;
        width: 14.5%;
        aspect-ratio: 1;
        background: url(../images/button-sound-off@2x.png), url(../images/button-sound-on@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;
        border: none;
    }
</style>
