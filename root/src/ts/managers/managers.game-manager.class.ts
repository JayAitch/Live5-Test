import { Button } from "../classes/ui/classes.ui.button.class"
import { PreloadManager } from "./managers.preload.class"
import * as PIXI from 'pixi.js'

/** main game manager */
export class GameApplication extends PIXI.Application{
    static _instance: GameApplication
    constructor(options_:any){
        super(options_)
        // add canvas to the page
        document.body.appendChild(this.view)
        const loader = new PreloadManager()
        // trigger loading and create the game
        loader.load(()=>{
            this.createUIObjects()
        })    
        
    }
    /** create any UI objects */
    createUIObjects(){
		let playBtn = new Button("play_icon", 50, 567, ()=>{console.log("play clicked")})
		let luckDipBtn = new Button("dice_icon", 324, 567, ()=>{console.log("play clicked")})

		playBtn.enable()
		luckDipBtn.enable()

		this.stage.addChild(playBtn.asset, luckDipBtn.asset)
    }


}