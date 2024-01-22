export default class Spawner{
    constructor({ create }){
        const spawnInterval = 1000; //MS
        this.maxSpwans = 1;
        this.create = create; 
        this.spawns = [];
        setInterval(() => this.spawn(), spawnInterval);
    }

    spawn(){ 
        if(this.spawns.length >= this.maxSpwans)return;
        let s = this.create();
        this.spawns.push(s);
    }
}