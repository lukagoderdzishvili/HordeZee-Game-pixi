import * as PIXI from "pixi.js";
import Victor from "victor";
//import Matter from "matter-js";

let canvasSize = 256;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f
});

let squareWidth = 32;
const square = new PIXI.Sprite(PIXI.Texture.WHITE);
square.anchor.set(0.5);
square.position.set(app.screen.width / 2, app.screen.height / 2);
square.width = square.height = squareWidth;
square.tint = 0xea985d;

app.stage.addChild(square);

let enemyRadius = 16;
const enemy = new PIXI.Graphics();
let r = randomSpawnPoint();
enemy.position.set(r.x, r.y);
enemy.beginFill(0xff0000, 1);
enemy.drawCircle(0, 0, enemyRadius);
enemy.endFill();
app.stage.addChild(enemy);



app.ticker.add((delta) => {
    const cursorPosition = app.renderer.plugins.interaction.mouse.global;
    let angle = 
        Math.atan2(
            cursorPosition.y - square.position.y,
            cursorPosition.x - square.position.x
        ) + 
        Math.PI / 2;
    square.rotation = angle;
});

function randomSpawnPoint(){
    let edge = Math.floor(Math.random() * 4); //random int between 0 and 3
    let spawnPoint = new Victor(0, 0);
    switch(edge){
        case 0: //TOP
            spawnPoint.x = canvasSize  * Math.random();
            break;
        case 1: //RIGHT
            spawnPoint.x = canvasSize;
            spawnPoint.y = canvasSize * Math.random();
            break;
        case 2: //BOTTOM
            spawnPoint.x = canvasSize * Math.random();
            spawnPoint.y = canvasSize;
            break;
        default: //LEFT
            spawnPoint.x = 0;
            spawnPoint.y = canvasSize * Math.random();
            break;
    }
    return spawnPoint;
}