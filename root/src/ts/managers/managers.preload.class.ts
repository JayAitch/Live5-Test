import { ASSETS_CONFIG } from "../config/asset-config.constant";
import { PreloadPayload } from "../types/types.preload.type";

/** manager to control preloading assets */
export class PreloadManager{
    private _assetConfig: PreloadPayload[]
    constructor(){
        this._assetConfig = ASSETS_CONFIG
    }

    /**
     * load all assets defined and fire callback when complete
     * @param cb_ - function to call when preload is complete
     */
    public load(cb_:Function){
        this.addAssets()
        PIXI.Loader.shared.load(()=>cb_())
    }

    /** add assets to be preloaded */
    private addAssets(){
        this._assetConfig.map(payload=>{
            let {key, dir, ext} = payload
            PIXI.Loader.shared.add(key, `${dir}.${ext}`)
        })
    }
}