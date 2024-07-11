<script lang="ts">
    import Countdown from '../components/Countdown.svelte'
    import ButtonBar from '../components/ButtonBar.svelte'
    import {Modal} from "sveltestrap"
    import {navigate} from "svelte-routing"
    import InvitationDialog from "../components/InvitationDialog.svelte"
    import PromocodeDialog from "../components/PromocodeDialog.svelte"
    import {controller} from "../scripts/Controller"

    let isInviteOpen: boolean = false
    let isPromocodeOpen: boolean = false
    let code: string

    if (controller.user.attempts === 0) {
        isInviteOpen = true
    }
</script>

<centered>
    <img class="background-main"/>
    <div class="page-width">
        <Countdown open={() => navigate('/contest')} showScoreDialog={() => navigate(`/score/17`)}/>
    </div>
    <footer>
        <ButtonBar invite={() => isInviteOpen = true} promocode={(codeParameter) => {
            code = codeParameter
            isPromocodeOpen = true
        }} closing={false}/>
    </footer>
</centered>

<Modal isOpen={isInviteOpen} toggle={() => isInviteOpen = false} backdrop='static'>
    <InvitationDialog close={() => isInviteOpen = false}/>
</Modal>

<Modal isOpen={isPromocodeOpen} toggle={() => isPromocodeOpen = false} backdrop='static'>
    <PromocodeDialog close={() => isPromocodeOpen = false} code={code}/>
</Modal>

<style>
    centered {
        display: flex;
        justify-content: center;
    }

    .page-width {
        position: absolute;
        width: min(calc(100vh / 16 * 9), 100%);
    }

    .background-main {
        width: 100%;
        height: 100vh;
        background-image: url('../images/background-main@2x.png');
        background-size: cover;
        background-color: rgb(0, 7, 46, 0.3);
        background-blend-mode: multiply;
    }

    footer {
        position: absolute;
        bottom: 0;
        width: min(calc(100vh / 16 * 9), 100%);
    }
</style>
