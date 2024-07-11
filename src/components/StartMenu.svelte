<script lang="ts">
    import {navigateGamePage} from '../scripts/Navigation'
    import {Sounds} from "../scripts/Sounds.js"
    import {context} from "../../include/engine"

    const RU: boolean = context.playdeck.user.locale === 'ru'
</script>

<div class="main" on:click={() => {
        Sounds.playSoundButtonClick()
        navigateGamePage()
    }}>
    <div class="description" style="background-size: {RU ? 'contain, 0%' : '0%, contain'}"></div>
    <div class="click-to-continue" style="background-size: {RU ? 'contain, 0%' : '0%, contain'}"></div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 30%;
        position: absolute;
        bottom: 0;
        justify-content: space-evenly;
        align-items: center;

        background-color: #00072E66;
        background-blend-mode: multiply;
    }

    .description {
        height: 40%;
        aspect-ratio: calc(705 / 206);
        background-position-x: center;
        background-position-y: center;
        background: url(../images/description-ru.png), url(../images/description-en.png);
        background-repeat: no-repeat;
        background-size: contain;
    }

    .click-to-continue {
        height: 14%;
        aspect-ratio: calc(744 / 75);
        background-position-x: center;
        background-position-y: center;
        background: url(../images/click-to-continue-ru.png), url(../images/click-to-continue-en.png);
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>