import { Button } from "../classes/ui/classes.ui.button.class"
import { PreloadManager } from "./managers.preload.class"
import * as PIXI from 'pixi.js'
import { GAME_CONFIG } from "../config/game-config.constant"
import { FallingBuilding } from "../classes/game/classes.game.falling-building.class"
import { getResult } from "../functions/functions.get-result.function"
import { BalanceHandler } from "./managers.balance-handler.class"
import { StakeAndBalanceDisplay } from "../classes/ui/classes.ui.stake-balance-display.class"
import { BuildingManager } from "./managers.building-manager.class"
import { FloatingMessage } from "../classes/game/classes.game.floating-message.class"

/** main game manager */
export class GameApplication extends PIXI.Application{

    // dont allow user imputs whilst playing
    private _inPlay: boolean = false
    // tracks balance amount and stake
    private _balancehandler: BalanceHandler
    // display for stake and balance
    private _stakeBalanceDisplay: StakeAndBalanceDisplay
    // manager to handle building logic
    private _buildingManager: BuildingManager

    /**
     * Create a new application of this game
     * @param options_ - PIXI app options
     */
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
        this._buildingManager = new BuildingManager(this.stage)
    }


    /** select the amount of random buildings defined by the config */
    selectRandomBuildings(){
        this._buildingManager.selectRandomBuildings()
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

                await this._buildingManager.animateRound(balls)
                if(win){ 
                    this._balancehandler.increaseBalance(win)
                    this.winAmountMessage(win)
                }
                // reset the game after 2 seconds
                setTimeout(()=>{
                    this._inPlay = false
                    this._buildingManager.restoreBuildings()
                    this._stakeBalanceDisplay.update()
                }, 2000)
            })

        }else{
            this.selectBuildingsMessage()
        }
    }

    // reset game to inital state
    reset(){
        // dont allow resets during play
        if(this._inPlay) return
        this._buildingManager.restoreBuildings()
        this._balancehandler.reset()
        this._stakeBalanceDisplay.update()
    }

    selectBuildingsMessage(){
        const message = `Please select ${GAME_CONFIG.pickAmount} buildings`
        const floatingText = new FloatingMessage(message, this.stage, this.center[0], 500)
    }

    winAmountMessage(val_:number){
        const message = `you won FUN${val_}`
        const floatingText = new FloatingMessage(message, this.stage, this.center[0], 500)
    }

    get center() : [number, number]{
        let {app} = GAME_CONFIG.display
        return [app.width/2, app.height/2]
    }
}