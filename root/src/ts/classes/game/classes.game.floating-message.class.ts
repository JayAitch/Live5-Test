import gsap from "gsap/all"
// Text to display floating messages
export class FloatingMessage extends PIXI.Text{
    /**
     * Create a floating text to display message to the player
     * @param text_ - string of text to display
     * @param container_ - parent container to add to
     * @param x_ - intial x position
     * @param y_ - inital y position
     */
    constructor(text_:string, container_:PIXI.Container, x_:number, y_:number){
        super(text_)
        this.x = x_
        this.y = y_
        this.anchor.set(0.5)
        this.floatAway()
        container_.addChild(this)
        console.log(this)
    }
    // tweeen text up and fade out
    floatAway(){
        gsap.to(this, {duration: 2, y:"-=40", alpha:0, onComplete:()=>this.destroy()})
    }
}