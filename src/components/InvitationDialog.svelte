<script lang="ts">
    import {getTimeToCompleteInSeconds} from "../scripts/Timer";

    export let close: Function

    import {Sounds} from "../scripts/Sounds"
    import {context} from "../../include/engine"
    import copyTextToClipboard from "../../include/engine/Clipboard.js"
    import {sendAnalyticsClickEvent} from "../scripts/Analytics.js"


    import {controller} from "../scripts/Controller";

    let isCopied: boolean = false
    const shareLink: string = context.playdeck.shareLink
    const active: boolean = getTimeToCompleteInSeconds() > 0
</script>

<centered>
    <div class="page-width">
        <div class="content">
            <div class="invitation-background">
                <img src="./images/button-close@2x.png" class="button-close" on:click={() => {
                    Sounds.playSoundButtonClick()
                    close()
                }}/>
                <div style="display: flex; flex-direction: row; position: relative; left: 7%; top: 57%;">
                    <div style="white-space: nowrap; width: 71%">
                        <div class="referral-link">{shareLink}</div>
                    </div>
                    <button class="button-copy clickable" style="background-size: {isCopied ? '0%, contain' : 'contain, 0%'}" on:click={() => {
                        Sounds.playSoundButtonClick()

                        const text = active ? "Укради как можно больше пицц и выиграй iPhone 15!" : "Укради как можно больше пицц и накорми летягу!"
                        copyTextToClipboard(`${text}\n\n${shareLink}`)
                        isCopied = true
                        if (!controller.isCopied) {
                            sendAnalyticsClickEvent('game_shared')
                            controller.isCopied = true
                        }
                    }}></button>
                </div>
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

    .invitation-background {
        width: 90%;
        aspect-ratio: 1.46;
        background: url(../images/invitation-background.png) no-repeat center center;
        background-size: contain;

        display: flex;
        flex-direction: column;
    }

    .button-copy {
        position: absolute;
        width: 13.5vw;
        aspect-ratio: 1.045;
        right: 13vw;
        top: -6.5vw;
        background: url(../images/button-copy@2x.png), url(../images/button-copied@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        border: none;
        border-radius: 5.5vw;
    }

    .referral-link {
        color: #858A96;
        overflow-x: scroll;
        font-size: calc(min(3vw, 3vh));
    }

    .button-close {
        position: relative;
        top: -6%;
        left: 80%;
        width: 18%;
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
