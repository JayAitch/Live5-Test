import * as PIXI from 'pixi.js'
/** manager to generate assets from */
export class AssetManager{
    /** reference to all preloaded assets */
    _resources: PIXI.IResourceDictionary
    
    constructor(){
        this._resources = PIXI.Loader.shared.resources
    }
    /**
     * Create a sprite from the key
     * @param key_ - asset key reference
     * @param x_ - horizontal position (defaults to 0)
     * @param y_ - vertical position (defaults to 0)
     * @returns pixi sprite object
     */
    public sprite(key_:string, x_:number = 0, y_:number = 0): PIXI.Sprite{
        const text = this._resources[key_].texture
        const sprite = new PIXI.Sprite(text)
        sprite.x = x_
        sprite.y = y_
        return sprite
    }
}