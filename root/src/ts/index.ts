import * as PIXI from 'pixi.js'
window.PIXI = PIXI
import { GameApplication } from "./managers/managers.game-manager.class";

/** when DOM is ready create game application */
window.onload = ()=>{
   	const app = new GameApplication({width:374, height: 667, backgroundColor: 0xffffff})

}