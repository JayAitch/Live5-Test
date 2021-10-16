import * as PIXI from 'pixi.js'
import { GAME_CONFIG } from './config/game-config.constant';
window.PIXI = PIXI
import { GameApplication } from "./managers/managers.game-manager.class";

/** when DOM is ready create game application */
window.onload = ()=>{
	const appConfig = GAME_CONFIG.display.app
	let {width, height, bg} = appConfig
   	const app = new GameApplication({width:width, height: height, backgroundColor: bg})
}