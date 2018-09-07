"use strict";
// init the application
//import css from './assets/css/main.css'
//import createjs from 'createjs'
import Viewport from './Utilities/Viewport';
import './assets/css/main.scss';
class UI {
    static canvas : any = null
    static stage : any = null

    static init(id: string) {
        UI.canvas = document.querySelector(id)
        window.onresize = UI._onResize
        UI._initStage()
    }

    static _onResize() {
        UI.canvas.width = window.innerWidth;
        UI.canvas.height = window.innerHeight;
        UI.stage.update();
    }

    static _initStage() {

        UI.stage = new createjs.Stage(UI.canvas.id);
        UI._onResize();

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", () => {
            UI.stage.update();
        });
    }

    static addChild(element: any) {
        UI.stage.addChild(element)
    }
}

UI.init("#main_canvas")
const vp = new Viewport()
UI.addChild(vp)