import * as PIXI from 'pixi.js';
import Victor from "victor";

export default class Zoombie{
    constructor({ app, player }){
        this.app = app;
        this.player = player;

        
        const radius = 16;
        this.speed = 2;
        this.zoombie = new PIXI.Graphics();
        let r = this.randomSpawnPoint();
        this.zoombie.position.set(r.x, r.y);
        this.zoombie.beginFill(0xff0000, 1);
        this.zoombie.drawCircle(0, 0, radius);
        this.zoombie.endFill();
        app.stage.addChild(this.zoombie);


    }

    attackPlayer(){
        if(this.attacking) return;
        this.attacking = true;
        this.interval = setInterval(() => this.player.attack(), 500);
    }

    update(){
        let e = new Victor(this.zoombie.position.x, this.zoombie.position.y);
        let s = new Victor(this.player.position.x, this.player.position.y);

        if(e.distance(s) < this.player.width / 2){
            this.attackPlayer();
            return;
        }

        let d = s.subtract(e);
        let v = d.normalize().multiplyScalar(this.speed);
        this.zoombie.position.set(this.zoombie.position.x + v.x, this.zoombie.position.y + s.y);
    }
    
    kill(){
        this.app.stage.removeChild(this.zoombie);
        clearInterval(this.interval);
    }

    get position(){
        return this.zoombie.position;
    }

    randomSpawnPoint(){
        let edge = Math.floor(Math.random() * 4); //random int between 0 and 3
        let spawnPoint = new Victor(0, 0);

        let canvasSize = this.app.screen.width;

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

}