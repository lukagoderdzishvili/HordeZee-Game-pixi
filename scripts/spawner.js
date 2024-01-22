export default class Spawner{
    constructor({app, create }){
        this.app = app;
        const spawnInterval = 1000; //MS
        this.maxSpwans = 40;
        this.create = create; 
        this.spawns = [];
        setInterval(() => this.spawn(), spawnInterval);
    }

    spawn(){ 
        if(!this.app.gameStarted)return;
        if(this.spawns.length >= this.maxSpwans)return;
        let s = this.create();
        this.spawns.push(s);
    }
}