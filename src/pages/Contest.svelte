<script lang="ts">
    import {Modal} from "sveltestrap"
    import ContestOnboardingDialog from "../components/ContestOnboardingDialog.svelte"
    import {navigate} from "svelte-routing"

    export let lastScore: number

    let isContestOnboardingOpen: boolean = true
</script>

<centered>
    <div class="background-main" style="position: absolute"></div>
</centered>

<Modal isOpen={isContestOnboardingOpen} toggle={() => isContestOnboardingOpen = false} backdrop='static'>
    <ContestOnboardingDialog close={() => {
        isContestOnboardingOpen = false
        navigate('/main')
    }}/>
</Modal>

<style>
    centered {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100vh;
        justify-content: center;
    }

    .background-main {
        width: 100vw;
        height: 100%;
        background: url('../images/background-main@2x.png') no-repeat center center;
        background-size: cover;
        background-color: rgb(0, 7, 46, 0.3);
        background-blend-mode: multiply;
    }
</style>
