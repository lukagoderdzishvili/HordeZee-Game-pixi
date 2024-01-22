import * as PIXI from "pixi.js";
import Player from "./player.js";
import Zoombie from "./zoombie.js";
import Spawner from "./spawner.js";

const canvasSize = 516;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f
});

let player = new Player({ app });
let zSpawner = new Spawner({ create: () => new Zoombie({ app, player}) });
// let zoombie = new Zoombie({ app, player });



app.ticker.add((delta) => {
    player.update();
    zSpawner.spawns.forEach((zoombie) => zoombie.update());
});
