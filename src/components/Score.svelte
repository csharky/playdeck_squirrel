<script lang="ts">
    import {Modal} from "sveltestrap"
    import ScoreDialog from "./ScoreDialog.svelte"

    export let roundScore: number | undefined
    $: isScoreDialogVisible = roundScore != undefined // quickfix todo research

    function close() {
        roundScore = undefined
    }
</script>

<Modal isOpen={isScoreDialogVisible} backdrop='static'>
    <ScoreDialog {roundScore} {close}/>
</Modal>
