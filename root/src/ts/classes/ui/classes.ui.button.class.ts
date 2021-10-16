import { ASSET_MANAGER } from "../../constants/constants.asset-manager.constant";

/** sprite based button */
export class Button{
    private _icon: PIXI.Sprite
    /** callback to fire when button is pressed */
    private _callBack: ()=> void
    private _hoverStates = {
        hover: 1.1,
        default: 1,
    }

    private _enabledStates = {
        enabled: 1,
        disabled: 0.5
    }


    constructor(key_:string, x_:number, y_:number, callback_: ()=> void){
        this._callBack = callback_
        this._icon = ASSET_MANAGER.sprite(key_,x_, y_)
        this._icon.anchor.set(0.5)
        this.addHandlers()
    }


    /** add all event handlers required to get the button to fire */
    private addHandlers(){
        // work out what event to use based on device
        let clickEndEvent   =  PIXI.utils.isMobile.any?   'touchstart' : 'mouseup'

        // add all events required 
        this._icon.on(clickEndEvent,  ()=>this.click())
        this._icon.on("mouseover", ()=>this.hover(true))
        this._icon.on("mouseout",  ()=>this.hover(false))
    }

    /** enable interactivity on the button */
    public enable(){
        this.setEnabledState(true)
    }

    /** disable interactivity on the button */
    public disable(){
        this.setEnabledState(false)
    }

    /**
     * Set sprite states and display 
     * @param isEnabled_ - whether to enable or disable the button
     */
    private setEnabledState(isEnabled_:boolean){
        this._icon.interactive  = isEnabled_
        this._icon.buttonMode   = isEnabled_
        const alpha = isEnabled_ ? this._enabledStates.enabled: this._enabledStates.disabled  
        this.asset.alpha = alpha   
    }


    /** called by mouse up event, click has ended, fire callback */
    private click(){
        this._callBack()
    }

    /** called by hover in out events */
    private hover(isHover_: boolean){
        const scale = isHover_ ? this._hoverStates.hover: this._hoverStates.default
        this._icon.scale.set(scale)
    }

    /**give external read access to sprite asset */
    get asset(): PIXI.Sprite{ return this._icon}
}