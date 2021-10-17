import { DisplayObject } from "pixi.js"
import { GAME_CONFIG } from "../../config/game-config.constant"

// mask component for buildings
export class BuildingMask extends PIXI.Graphics{
    /**
     * Create a mask the full width of the screen at with the same height as buildings
     * @param container - parent container to add mask to
     * @param y_ - y position of the mask
     */
    constructor(container: PIXI.Container, y_){
        super()
        let {buildings, app} = GAME_CONFIG.display
        this.beginFill(0x000000, 1)
        this.drawRect(0, y_, app.width, buildings.yGap)
        this.endFill()
        container.addChild(this)
    }

    /**
     * mask an asset
     * @param asset_ - asset to be masked
     */
    public maskAsset(asset_:DisplayObject){
       asset_.mask = this
    }
}

