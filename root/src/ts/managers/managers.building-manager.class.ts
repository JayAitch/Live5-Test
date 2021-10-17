import { BuildingMask } from "../classes/game/classes.game.building-mask.class"
import { FallingBuilding } from "../classes/game/classes.game.falling-building.class"
import { GAME_CONFIG } from "../config/game-config.constant"
import { getRandomInt } from "../functions/functions.get-random-int.function"

// Manager to handle displaying and acting on buildings
export class BuildingManager{
    // reference to parent container to add assests to
    private _container: PIXI.Container
    // array of buildings that falldown
    private _buildings: FallingBuilding[] = []

    /**
     * Manager to handle display and logic of buildings
     * @param container_ - parent container to add assets to
     */
    constructor(container_: PIXI.Container){
        this._container = container_
        this.createBuildings()
    }

    /** create buildings as defined by config */
    createBuildings(){
        const ballAmt = GAME_CONFIG.balls
        // destructure config
        let {colCount, rowCount, xGap, yGap, startX, startY} = GAME_CONFIG.display.buildings
        let index = 0

        // generate a row and colum as the layout defined by config
        for(let i = 0; rowCount > i; i++){
            let y =  (yGap * i) + startY
            const mask = new BuildingMask(this._container, y -20)
            for(let j = 0; colCount > j; j++){
                // enough building have been made stop making them 
                if(index === ballAmt) break
                let x = (xGap * j) + startX
                // create  new bulding to represent a ball
                const building = new FallingBuilding(index, x, y)
                mask.maskAsset(building.asset)
                index++
                // make clickable
                building.enable()
                this._container.addChild(building.asset)
                this._buildings.push(building)
            }
        }
    }

    /**
     * Animate the game round by distroying buildings and displaying win
     * @param balls_ - winning balls 
     * @returns promise indicating animations have complete 
     */
    animateRound(balls_: number[]): Promise<void>{
        return new Promise<void>(async (res_)=>{
            // track all the knocking down animations
            let fallingPromises = []
            // list of functions to trigger win animations
            let winAnimations = []
            // go through the buildins and knock any down that wernt a win
            this._buildings.map((bld, index)=>{
                if(balls_.includes(index)){
                    // add as a promise returning function, dont animate yet
                    winAnimations.push(()=>bld.animateWin())
                }else{
                    fallingPromises.push(bld.fallOver())
                }

            })

            await Promise.all(fallingPromises)
            await Promise.all(winAnimations.map(func=>func()))
            res_()
        })
    }

    /** select the amount of random buildings defined by the config */
    selectRandomBuildings(){
        /** deselect any buildings already picked */
        FallingBuilding._selectedBuildings = []
        this._buildings.map(bld=> bld.selected = false)
        /** track current selections to avoid duplicates */
        const selected = []
        for(let i = 0; GAME_CONFIG.pickAmount > i; i++){
            let picked = false
            // search for a new number
            while(!picked){
                const int = getRandomInt(0, this._buildings.length - 1)
                if(!selected.includes(int)){
                    picked = true
                    selected.push(int)
                    this._buildings[int].selected = true
                }
            }          
        }
    }
    // restore all buildings
    restoreBuildings(){
        FallingBuilding._selectedBuildings = []
        this._buildings.map(bld=>{ bld.reset()})
    }
}