import { DisplayObject } from "pixi.js"
import { GAME_CONFIG } from "../../config/game-config.constant"


export class BuildingMask extends PIXI.Graphics{
    constructor(container: PIXI.Container, y_){
        super()
        let {buildings, app} = GAME_CONFIG.display
        this.beginFill(0x000000, 1)
        this.drawRect(0, y_, app.width, buildings.yGap)
        this.endFill()
        container.addChild(this)
    }

    public maskAsset(asset_:DisplayObject){
       asset_.mask = this
    }
}

