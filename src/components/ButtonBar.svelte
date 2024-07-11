<script lang="ts">
    export let invite: Function
    export let promocode: Function
    export let closing: boolean

    import {sendAnalyticsClickEvent} from "../scripts/Analytics.js"
    import {timeToRechargeInSeconds} from "../scripts/Timer"
    import {spring} from "svelte/motion"
    import {markAsViewed, rechargeAttempts} from "../scripts/Client.js"
    import {getRechargeTimeInSeconds} from "../scripts/Timer.js"
    import {convertTimeInSecondsToDdHhMmSs} from "../../include/engine/Time"
    import {controller} from "../scripts/Controller"
    import {navigateGamePage} from "../scripts/Navigation.js"
    import {Sounds} from "../scripts/Sounds"
    import {context} from "../../include/engine"

    const {user} = controller

    $: attempts = user.attempts // 0, 1..998, 999
    $: timeToRecharge = $timeToRechargeInSeconds
    $: timeToRechargeText = formatTimeToRecharge(timeToRecharge) // 0, 1..600

    function formatTimeToRecharge(timeInSeconds: number): string {
        const {hh, mm, ss} = convertTimeInSecondsToDdHhMmSs(timeInSeconds)
        return /*isLocalhost ? `${mm}:${ss}` : */`${hh}:${mm}`
    }

    function resetScore() {
        score = user.score
        scoreAnimation.set(score)
    }

    function setupScore() {
        if (user.score >= user.previousScore) {
            resetScore()
        } else {
            score = user.scoreThreshold
            scoreAnimation.set(score)
        }
        user.previousScore = user.score // IMPORTANT
    }

    function updatePromocodeAppeared() {
        promocodeAppeared = promocodeExist
        if (promocodeExist) {
            Sounds.playSoundNewPromocode()
        }
    }

    let promocodeAppeared: boolean = false
    let score: number = user.previousScore
    const scoreAnimation = spring(score, {damping: 1, stiffness: 0.2})
    const promocodeExist: boolean = user.promoList.find((promo) => !promo.viewed) !== undefined
    const promocodeCount: number = user.promoList.filter((promo) => !promo.viewed).length
    setTimeout(() => {
        setupScore()
        if (controller.isFirstTime || promocodeCount > 1) {
            controller.isFirstTime = false
            updatePromocodeAppeared()
        } else {
            setTimeout(updatePromocodeAppeared, 220)
        }
    }, 290)

    function claim(complete?: Function) {
        // fixme no need to return whole user from server
        rechargeAttempts().then((recharged) => {
            if (!recharged) return
            user.attempts = recharged.attempts
            user.lastSession = recharged.lastSession
            if (complete) complete()
        })
        timeToRecharge = getRechargeTimeInSeconds() // IMPORTANT
    }

    const message: string = "Та-дам! Вот промокод на пиццу Пепперони 23 см от Papa John's! 🍕 \n" +
        "Заказывай от 1599р на papajohns.ru или в приложении. \n" +
        "Действует с 03.01.2024 по 17.01.2024."
</script>

<div class="content">
    <div class="buttons" style="background-size: {closing ? '0%, contain': 'contain, 0%'}; aspect-ratio: {closing ? 2.4 : 1.748};">
        {#if !closing}
            {#if promocodeAppeared}
                <div class="buttonbar-progress-container">
                    <img src="./images/buttonbar-new-promocode@2x.png" class="buttonbar-new-promocode"/>
                    <button class="button-take clickable" on:click={() => {
                        Sounds.playSoundButtonClick()

                        resetScore()
                        const promos = user.promoList.filter((promo) => !promo.viewed)
                        markAsViewed(promos)
                        const codes = promos.map((promo) => "<code>" + promo.code + "</code>").join("\n")
                        context.playdeck.pushMessage('Выиграть ещё промокод', message + "\n\n" + codes, context.playdeck.user.telegramId)
                        promocodeAppeared = false
                        sendAnalyticsClickEvent('get_promo_code')
                        promocode(promos[0].code)
                    }}></button>
                </div>
            {:else}
                <div style="width: 100%; height: 26%; margin-top: 4%; line-height: 0;">
                    <div class="buttonbar-progress-title">
                        До нового промокода:
                    </div>
                    <div class="buttonbar-progress-background">
                        <img src="./images/buttonbar-progress-left@2x.png" style="width: 10%"/>
                        <img src="./images/buttonbar-progress-center@2x.png"
                             style="aspect-ratio: 3; width: {$scoreAnimation / user.scoreThreshold * 70 + 10}%;"/>
                        <img src="./images/buttonbar-progress-right@2x.png" style="width: 10%"/>
                        <div class="buttonbar-progress-score" style="width: {$scoreAnimation / user.scoreThreshold * 70 + 30}%;">
                            {score}/{user.scoreThreshold}<img src="./images/buttonbar-progress-pizza@2x.png" style="height: 50%"/>
                        </div>
                    </div>
                </div>
            {/if}

        {/if}
        <div class="line" style="height: {closing ? 40 : 28}%;">
            <div class="button-share-container">
                <div style="width: 100%; display: flex; flex-direction: column; height: 100%; justify-content: space-evenly;">
                    <div class="button-share-title">Ваши попытки</div>
                    <div class="button-share-attempts">
                        <img src="./images/button-share-heart@2x.png" style="width: calc(min(8vh, 8vw));"/>
                        {attempts}
                    </div>
                </div>
                <button class="button-share clickable" on:click={() => {
                    Sounds.playSoundButtonClick()
                    invite()
                }}></button>
            </div>
            {#if timeToRecharge > 0}
                <div class="button-recharge-container">
                    <div class="button-recharge-title">Новые через</div>
                    <div class="button-recharge-time">
                        {timeToRechargeText}
                        <img src="./images/button-share-heart@2x.png" style="width: calc(min(8vh, 8vw)); object-fit: contain"/>
                    </div>
                </div>
            {:else}
                <div class="button-recharge-button-container">
                    <button class="button-recharge clickable" on:click={() => {
                        Sounds.playSoundButtonClick()
                        claim()
                    }}></button>
                </div>
            {/if}
        </div>
        <button class="button-play-blue clickable" style="opacity: {attempts <= 0 ? 0.5 : 1}" on:click="{() => {
            Sounds.playSoundButtonClick()
            if (attempts > 0) {
                navigateGamePage()
            } else if(timeToRecharge === 0) {
                claim(() => {
                    navigateGamePage()
                })
            }else {
                invite()
            }
        }}"></button>
    </div>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    .buttons {
        width: 100%;
        background: url(../images/buttonbar-background-main@2x.png), url(../images/buttonbar-background-closing@2x.png);
        background-position-x: center;
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: contain;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left: 4%;
        padding-right: 4%;
    }

    .line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .button-play-blue {
        width: 100%;
        aspect-ratio: 6.5;
        background: url(../images/button-play-blue@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
        border-radius: 5vh;
    }

    .button-share-container {
        display: flex;
        flex-direction: row;
        width: 60%;
        height: 100%;
        align-items: center;
        padding-left: 3.5%;
        padding-right: 2%;
        background-color: #3271EA44;
        border-radius: calc(min(4.5vw, 3vh));
    }

    .button-share {
        height: 80%;
        width: fit-content;
        aspect-ratio: 1;
        border: none;
        background: url(../images/button-share@2x.png) no-repeat center center;
        background-size: contain;
        border-radius: calc(min(5.7vw, 3.8vh));
    }

    .button-share-title {
        flex-grow: 0.3;
        height: 20%;
        text-align: left;
        font-size: calc(min(2.8vw, 2.8vh));
        color: #FFFFFF;

        margin-top: 5%;
    }

    .button-share-attempts {
        display: flex;
        flex-direction: row;
        height: 60%;
        align-items: center;
        font-size: calc(min(4.8vw, 3.2vh));
        color: #154389;
    }

    .button-recharge-container {
        display: flex;
        flex-direction: column;
        width: 38%;
        height: 100%;
        justify-content: space-evenly;
        padding-left: 3.5%;
        padding-right: 2%;
        background-color: #3271EA99;
        border-radius: calc(min(4.5vw, 3vh));
    }

    .button-recharge-button-container {
        display: flex;
        width: 38%;
        height: 100%;
        justify-content: end;
    }

    .button-recharge-title {
        flex-grow: 0.3;
        height: 20%;
        font-size: calc(min(2.8vw, 2.8vh));
        color: #FFFFFF;

        margin-top: 5%;
    }

    .button-recharge-time {
        display: flex;
        flex-direction: row;
        height: 60%;
        justify-content: space-between;
        align-items: center;
        font-size: calc(min(4.8vw, 3.2vh));
        color: #FFFFFF;
    }

    .button-recharge {
        width: fit-content;
        height: 100%;
        aspect-ratio: 2.1;
        background: url(../images/button-recharge-background@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
        border-radius: calc(min(3.3vw, 3.3vh));
    }

    .buttonbar-progress-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 26%;
        justify-content: space-between;
        align-items: center;
    }

    .buttonbar-progress-background {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 72%;
        aspect-ratio: 8.68;
        background: url(../images/buttonbar-progress-background@2x.png) no-repeat center center;
        background-size: contain;
        position: relative;
        margin-top: 4%;
    }

    .buttonbar-progress-score {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: calc(min(3vw, 2vh));
        color: white;
    }

    .buttonbar-progress-title {
        margin-left: 2%;
        margin-bottom: 1%;
        font-size: calc(min(2.8vw, 2.8vh));
        color: white;
    }

    .buttonbar-new-promocode {
        width: 65%;
        margin-left: -2%;
    }

    .button-take {
        width: 35%;
        aspect-ratio: 3.18;
        background: url(../images/button-take@2x.png) no-repeat center center;
        background-size: contain;
        border: none;
        border-radius: 5vh;
    }
</style>
