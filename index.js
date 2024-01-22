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
    bulletHitTest({
      bullets: player.shooting.bullets,
      zoombies: zSpawner.spawns,
      bulletRadius: 8,
      zombieRadius: 16});
});


function bulletHitTest({bullets, zoombies, bulletRadius, zombieRadius}){
  bullets.forEach(bullet => {
    zoombies.forEach((zombie, index) => {
      let dx = zombie.position.x - bullet.position.x;
      let dy = zombie.position.y - bullet.position.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if(distance < bulletRadius  + zombieRadius){
        zoombies.splice(index, 1)
        zombie.kill();
      }
    })
  })
}