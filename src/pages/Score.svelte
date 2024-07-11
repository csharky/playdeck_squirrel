<script lang="ts">
    import {Modal} from "sveltestrap"
    import ScoreDialog from "./ScoreDialog.svelte"

    export let lastScore: number

    let isScoreOpen: boolean = true
</script>

<centered>
    <div class="background-main" style="position: absolute"></div>
</centered>

<Modal isOpen={isScoreOpen} toggle={() => isScoreOpen = false} backdrop='static'>
    <ScoreDialog close={() => isScoreOpen = false} {lastScore}/>
</Modal>

<style>
    centered {
        display: flex;
        flex-direction: row;
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
