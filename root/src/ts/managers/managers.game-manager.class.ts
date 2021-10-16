import { Button } from "../classes/ui/classes.ui.button.class"
import { PreloadManager } from "./managers.preload.class"
import * as PIXI from 'pixi.js'
import { GAME_CONFIG } from "../config/game-config.constant"
import { FallingBuilding } from "../classes/game/classes.game.falling-building.class"
import { getRandomInt } from "../functions/functions.get-random-int.class"

/** main game manager */
export class GameApplication extends PIXI.Application{
    private _buildings : FallingBuilding[] = []

    constructor(options_:any){
        super(options_)
        // add canvas to the page
        document.body.appendChild(this.view)
        const loader = new PreloadManager()
        // trigger loading and create the game
        loader.load(()=>{
            this.createUIObjects()
            this.createGameObjects()
        })    
        
    }
    /** create any UI objects */
    createUIObjects(){
        // destructure config for button display
        let {play, luckyDip} = GAME_CONFIG.display.buttons
        // create all buttons reuqired
		let playBtn = new Button(play.asset, play.x, play.y, ()=>{this.playGame()})
		let luckDipBtn = new Button(luckyDip.asset, luckyDip.x, luckyDip.y, ()=>{this.selectRandomBuildings()})
        // enable all buttons
		playBtn.enable()
		luckDipBtn.enable()

		this.stage.addChild(playBtn.asset, luckDipBtn.asset)
    }

    /** generate any game objects required */
    createGameObjects(){
        const ballAmt = GAME_CONFIG.balls
        // destructure config
        let {colCount, rowCount, xGap, yGap, startX, startY} = GAME_CONFIG.display.buildings
        let index = 0

        // generate a row and colum as the layout defined by config
        for(let i = 0; rowCount > i; i++){
            let y =  (yGap * i) + startY
            for(let j = 0; colCount > j; j++){
                // enough building have been made stop making them 
                if(index + 1 === ballAmt) break
                let x = (xGap * j) + startX
                // create  new bulding to represent a ball
                const building = new FallingBuilding(index, x, y)
                index++
                // make clickable
                building.enable()
                this.stage.addChild(building.asset)
                this._buildings.push(building)
            }
        }
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

    /** place bet and play a round */
    playGame(){
        // todo check enough balance
        // make sure the player has made enough picks
        if(FallingBuilding._selectedBuildings.length === GAME_CONFIG.pickAmount){
            // fake result 
            const result = [0,1,2,3,4,5]
            this._buildings.map((bld, index)=>{
                if(!result.includes(index))
                    bld.fallOver()
            })
        }else{
            // todo display error to user
        }
    }
}