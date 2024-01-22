import * as PIXI from "pixi.js";
import Player from "./player.js";
import Zoombie from "./zoombie.js";

const canvasSize = 256;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f
});

let player = new Player({ app });
let zoombie = new Zoombie({ app, player });



app.ticker.add((delta) => {
    player.update();
    zoombie.update();
});
