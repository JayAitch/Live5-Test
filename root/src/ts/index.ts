import * as PIXI from 'pixi.js'

window.onload = ()=>{
   	const app = new PIXI.Application({width:400, height: 400})
  	document.body.appendChild(app.view)
	var masker = new PIXI.Graphics();
	masker.beginFill(0xffffff, 1);                                     
	masker.drawRect(100, 100, 100, 100)
	masker.endFill();
	app.stage.addChild(masker);
}