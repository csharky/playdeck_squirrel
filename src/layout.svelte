<script lang="ts" context="module">
    import 'bootstrap/dist/css/bootstrap.css'
    import {Route, Router} from 'svelte-routing'
    import Score from "./components/Score.svelte"
    import StartMenu from "./components/StartMenu.svelte"
</script>

<div id="meta" class="layer" style="display: block">
    <Router>
        <Route path="/score/:roundScore" let:params>
            <Score roundScore="{params.roundScore}"/>
        </Route>
        <Route component={StartMenu} path="/startMenu"/>
    </Router>
</div>
