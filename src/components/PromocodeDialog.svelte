<script lang="ts">
    import {Sounds} from "../scripts/Sounds.js"
    import copyTextToClipboard from "../../include/engine/Clipboard.js"

    export let close: Function
    export let code: string

    let isCopied: boolean = false
</script>

<centered>
    <div class="page-width">
        <div class="content">
            <div class="promocode-background">
                <img src="./images/button-close@2x.png" class="button-close" on:click={() => {
                    Sounds.playSoundButtonClick()
                    close()
                }}/>
                <button class="button-copy clickable" style="background-size: {isCopied ? '0%, contain' : 'contain, 0%'}" on:click={() => {
                    Sounds.playSoundButtonClick()
                    copyTextToClipboard(code)
                    isCopied = true
                }}></button>
                <div class="promocode">{code}</div>
            </div>
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

    .page-width {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: calc(100% - 32px);
        margin: 16px;
    }

    .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    .promocode-background {
        width: 100%;
        aspect-ratio: calc(933/1079);
        background: url(../images/promocode-background@3x.png) no-repeat center center;
        background-size: contain;

        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
    }

    .button-copy {
        position: absolute;
        width: 13.5vw;
        aspect-ratio: 1.045;
        right: 21%;
        top: 84.5%;
        background: url(../images/button-copy@2x.png), url(../images/button-copied@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        border: none;
        border-radius: 5.5vw;
    }

    .promocode-text {
        position: absolute;
        width: 75%;
        left: 10.5%;
        top: 42%;
        text-align: center;
        color: #3521AC;
        font-size: calc(min(4.25vh, 4.25vw));
    }

    .promocode {
        position: absolute;
        right: 40%;
        top: 90%;
        width: fit-content;
        line-height: 0;
        color: #3521AC;
        font-size: calc(min(7vh, 7vw));
    }

    .button-close {
        position: relative;
        top: -5%;
        left: 40%;
        width: 17%;
        aspect-ratio: 1;
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
