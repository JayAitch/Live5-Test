import { Button } from "../classes/ui/classes.ui.button.class"
import { PreloadManager } from "./managers.preload.class"
import * as PIXI from 'pixi.js'
import { GAME_CONFIG } from "../config/game-config.constant"
import { FallingBuilding } from "../classes/game/classes.game.falling-building.class"
import { getRandomInt } from "../functions/functions.get-random-int.function"
import { getResult } from "../functions/functions.get-result.function"
import { BalanceHandler } from "./managers.balance-handler.class"
import { StakeAndBalanceDisplay } from "../classes/ui/classes.ui.stake-balance-display.class"
import { BuildingMask } from "../classes/game/classes.game.building-mask.class"

/** main game manager */
export class GameApplication extends PIXI.Application{

    // list of all buildings created
    private _buildings : FallingBuilding[] = []
    // dont allow user imputs whilst playing
    private _inPlay: boolean = false
    // tracks balance amount and stake
    private _balancehandler: BalanceHandler
    // display for stake and balance
    private _stakeBalanceDisplay: StakeAndBalanceDisplay

    constructor(options_:any){
        super(options_)
        this._balancehandler = new BalanceHandler()
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
        let {play, luckyDip, reset} = GAME_CONFIG.display.buttons
        // create all buttons reuqired
		let playBtn = new Button(play.asset, play.x, play.y, ()=>{this.playGame()})
		let luckDipBtn = new Button(luckyDip.asset, luckyDip.x, luckyDip.y, ()=>{this.selectRandomBuildings()})
        let resetBtn = new Button(reset.asset, reset.x, reset.y, ()=>{this.reset()})
        // enable all buttons
		playBtn.enable()
		luckDipBtn.enable()
        resetBtn.enable()

		this.stage.addChild(playBtn.asset, luckDipBtn.asset, resetBtn.asset)
        this._stakeBalanceDisplay  = new StakeAndBalanceDisplay(this._balancehandler)

        this.stage.addChild(...this._stakeBalanceDisplay.assets)
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
            const mask = new BuildingMask(this.stage, y -25)
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
        if(this._inPlay || !this._balancehandler.canAfford()) return

        // make sure the player has made enough picks
        if(FallingBuilding._selectedBuildings.length === GAME_CONFIG.pickAmount){
            this._inPlay = true
            // fake result 
            getResult(FallingBuilding._selectedBuildings).then(async result=>{
                this._balancehandler.deductStake()
                this._stakeBalanceDisplay.update()
                let {balls, win} = result
                // track all the knocking down animations
                let fallingPromises = []
                // list of functions to trigger win animations
                let winAnimations = []
                // go through the buildins and knock any down that wernt a win
                this._buildings.map((bld, index)=>{
                    if(balls.includes(index)){
                        // add as a promise returning function, dont animate yet
                        winAnimations.push(()=>bld.animateWin())
                    }else{
                        fallingPromises.push(bld.fallOver())
                    }

                })

                await Promise.all(fallingPromises)
                await Promise.all(winAnimations.map(func=>func()))

                if(win) this._balancehandler.increaseBalance(win)
                // reset the game after 2 seconds
                setTimeout(()=>{
                    this._inPlay = false
                    this.restoreBuildings()
                    this._stakeBalanceDisplay.update()
                }, 2000)
            })

        }else{
            // todo display error to user
        }
    }

    // reset game to inital state
    reset(){
        // dont allow resets during play
        if(this._inPlay) return
        this.restoreBuildings()
        this._balancehandler.reset()
        this._stakeBalanceDisplay.update()
    }

    // restore all buildings
    restoreBuildings(){
        FallingBuilding._selectedBuildings = []
        this._buildings.map(bld=>{ bld.reset()})
    }
}