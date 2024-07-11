import {initializeEruda, initializePlaydeck} from "../include/engine"
import {initializeController} from "./scripts/Controller"
import {initializeLayout} from "./layout"
import {entryPoint} from "./scripts/Navigation"
import {loadResources} from "./scripts/Resources"

initializePlaydeck(async () => {
    initializeEruda({title: 'Papa Johns Squirrel', version: 243}, 'DzmitryKalesnikovich', 'artemiokost')
    loadResources()
    await initializeController()
    entryPoint()
    initializeLayout()
})
