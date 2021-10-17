import { DisplayObject } from "pixi.js";
import { GAME_CONFIG } from "../../config/game-config.constant";
import { BalanceHandler } from "../../managers/managers.balance-handler.class";

/** class to handle display of balance and stake */
export class StakeAndBalanceDisplay{
    /** local reference to where balance and stakes are saved */
    private _balanceHandler: BalanceHandler
    /** text to display the stake */
    private _stakeText: PIXI.Text
    /** text to display the balance */
    private _balanceText: PIXI.Text
    /** graphic for the footer background */
    private _footerBG: PIXI.Graphics

    /**
     * Create footer display for balance and stake
     * @param balanceHandler_ - singleton that contains ballance and stake data
     */
    constructor(balanceHandler_: BalanceHandler){
        // destructure configuration
        let {x,y,width,height,colour, balanceText, stakeText} = GAME_CONFIG.display.footer
        // crete text objects
        this._stakeText = new PIXI.Text("FUN" + balanceHandler_.stake, {fill: 0xffffff})
        this._balanceText = new PIXI.Text("FUN" + balanceHandler_.balance, {fill: 0xffffff})

        // set properties of stake text
        this._stakeText.x = stakeText.x
        this._stakeText.y = stakeText.y
        this._stakeText.anchor.set(0.5)

        // set properties of balance text
        this._balanceText.x = balanceText.x
        this._balanceText.y = balanceText.y
        this._balanceText.anchor.set(0.5)

        // crete graphical geometry to underlay the footer
        this._footerBG = new PIXI.Graphics()
        this._footerBG.beginFill(colour, 1)                                   
        this._footerBG.drawRect(x,y,width,height)
        this._footerBG.endFill()
        this._balanceHandler = balanceHandler_
    }

    // get all assets on this object
    get assets():DisplayObject[]{
        return [this._footerBG, this._stakeText, this._balanceText]
    }

    // update values from the balance handler
    public update(){
        this._stakeText.text = "FUN" + this._balanceHandler.stake
        this._balanceText.text = "FUN" + this._balanceHandler.balance
    }
}
