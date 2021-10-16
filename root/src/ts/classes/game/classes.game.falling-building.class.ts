import { GAME_CONFIG } from "../../config/game-config.constant";
import { Button } from "../ui/classes.ui.button.class";

/** speciallised button to display buildings that fallover */
export class FallingBuilding extends Button{
    // use different hover states
    protected _hoverStates = {
        hover: 1.2,
        default: 1,
    }
    // use differnt enabled states
    protected _enabledStates = {
        enabled: 1,
        disabled: 1
    }

    /** index of this building (ball)*/
    private _index:number

    /** display of building number */
    private _text:PIXI.Text

    /** has this building been selected */
    private _selected: boolean = false

    /** all currently selected buildings */
    static _selectedBuildings = []

    constructor(index_:number, x_:number, y_:number){
        super("building", x_, y_, ()=>this.buildingClicked())
        const displayNumber = index_ + 1
        this._text =  new PIXI.Text(displayNumber.toString(), {fontSize: 18})
        this._text.anchor.set(0.5)
        this._text.y = 25
        this._text.visible = false
        this._index = index_
        this.asset.addChild(this._text)
    }

    /** handle click event on the building */
    buildingClicked(){
        if(!this._selected){
            if(FallingBuilding._selectedBuildings.length < GAME_CONFIG.pickAmount){
                this.selected = true
            }
        }else{
            this.selected = false
        }
    }

    /**
     * Display hover state of house
     * @param isHover_ - is mouse entering or leaving
     */
    hover(isHover_:boolean){
        super.hover(isHover_)
        // dont chnage text visiblity if selected building
        if(!this._selected){
            this._text.visible = isHover_
        }
    }

    /** toggle selection of house and remove/add to static */
    set selected(val_:boolean){
        this._text.visible = val_
        this._selected = val_
        if(val_){
            // build is selected add the the static
            FallingBuilding._selectedBuildings.push(this._index)
        }else{
            // building is delselected remove from static
            const selectedIndex = FallingBuilding._selectedBuildings.indexOf(this._index)
            if(selectedIndex !== -1) FallingBuilding._selectedBuildings.splice(selectedIndex, 1);
        }
    }

    /** animate the house falling over */
    fallOver(){
        this.asset.visible = false
    }
}