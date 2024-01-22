import * as PIXI from "pixi.js";
import Player from "./player.js";
import Zoombie from "./zoombie.js";
import Spawner from "./spawner.js";

const canvasSize = Math.min(innerWidth, innerHeight);
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f
});

let player = new Player({ app });
let zSpawner = new Spawner({app: app, create: () => new Zoombie({ app, player}) });

let gameStartScene = createScene("Click to Start");
let gameOverScene = createScene("Game Over");
app.gameStarted = false;

app.ticker.add((delta) => {
  gameOverScene.visible = player.dead;
  gameStartScene.visible = !app.gameStarted;
  if(!app.gameStarted)return;
  player.update(delta);
  zSpawner.spawns.forEach((zoombie) => zoombie.update(delta));
  bulletHitTest({
    bullets: player.shooting.bullets,
    zoombies: zSpawner.spawns,
    bulletRadius: 8,
    zombieRadius: 16
  });
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

function createScene(sceneText){
  const sceneContainer = new PIXI.Container();
  const text = new PIXI.Text(sceneText);
  text.x = app.screen.width / 2;
  text.y = 0;
  text.anchor.set(0.5, 0);
  sceneContainer.zIndex = 1;
  sceneContainer.addChild(text);
  app.stage.addChild(sceneContainer);
  return sceneContainer;
}

function startGame(){
  app.gameStarted = true;
}

document.addEventListener("click", startGame);