<script lang="ts">
    import ButtonBar from '../components/ButtonBar.svelte'
    import {Modal} from "sveltestrap"
    import InvitationDialog from "../components/InvitationDialog.svelte"
    import Results from "../components/Results.svelte"
    import {controller} from "../scripts/Controller"

    let isInviteOpen: boolean = false
</script>

<centered class="background-main">
    <div class="page-width">
        <Results />
    </div>
    <footer>
        <ButtonBar invite={() => isInviteOpen = true} closing={true}/>
    </footer>
</centered>

<Modal isOpen={isInviteOpen} toggle={() => isInviteOpen = false} backdrop='static'>
    <InvitationDialog close={() => isInviteOpen = false}/>
</Modal>

<style>
    centered {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;

        background-image: url('../images/background-main@2x.png');
        background-size: cover;
        background-color: rgb(0, 7, 46, 0.3);
        background-blend-mode: multiply;
    }

    .page-width {
        display: flex;
        flex-direction: column;
        width: min(calc(100vh / 16 * 9), 100%);
        height: calc(100% - 16px);
        margin: 8px;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
    }

    footer {
        width: min(calc(100vh / 16 * 9), 100%);
    }
</style>

{#if controller.user.isFirstTime}
    <style>
        .modal-open {
            --footer-height: 150px;
        }
    </style>
{:else}
    <style>
        .modal-open {
            --footer-height: 90px;
        }
    </style>
{/if}
