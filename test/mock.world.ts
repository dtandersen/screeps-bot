import {World, WorldData} from "../src/entity.world";
import {BotPosition} from "../src/entity.position";
import {MyRoomObject} from "../src/entity.bot";

export class MockWorld extends World
{
    constructor()
    {
        super(new WorldDataStub());
    }

    addSpawn(x: number, y: number): void
    {
        // console.log("add spawn " + x + ", " + y);
        this.worldData.setSpawn({pos: {x: x, y: y, roomName: ""}});
    }

    setEnv(env) {
      this.worldData = new WorldDataStub(env);
    }
}

export class WorldDataStub implements WorldData
{
    spawn: MyRoomObject;
    env: object;

    constructor(env?){
      this.env=env;
    }

    getSpawn(): MyRoomObject
    {
        return this.spawn;
    }

    setSpawn(spawn: MyRoomObject): void
    {
        this.spawn = spawn;
    }
}
