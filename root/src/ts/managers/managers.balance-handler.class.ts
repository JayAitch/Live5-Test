import { GAME_CONFIG } from "../config/game-config.constant";

export class BalanceHandler{
    // store instance of this class so only one can be made
    static _instance: BalanceHandler
    // amount currently being staked
    private _stake: number
    // current balance of the player
    private _balance
    // balance to reset to
    private _originalBalance

    /** creates or returns existing balance handler, only one of these can exist */
    constructor(){
        // make this a singleton
        if(BalanceHandler._instance) return BalanceHandler._instance
        BalanceHandler._instance = this
        this._stake = GAME_CONFIG.stake
        this._balance = GAME_CONFIG.balance
        this._originalBalance = GAME_CONFIG.balance
    }

    // deduct the amount staked by the player
    public deductStake(){
        if(this.canAfford()){
            this._balance -= this._stake
        }
    }

    // increase balance by amount pased in
    public increaseBalance(amnt_:number){
        this._balance += amnt_
    }

    // reset to original balance amount
    public reset(){
        this._balance = this._originalBalance
    }

    // work out if the player can aford to bet
    public canAfford():boolean{
        return (this._balance - this._stake > 0)
    }
    // give read access to balance
    get balance():number{return this._balance}
    //give read access to stake
    get stake():number{return this._stake}
}