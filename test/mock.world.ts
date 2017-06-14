import {World, WorldData} from "../src/entity.world";
import {BotPosition} from "../src/entity.position";
import {MyRoomObject} from "../src/entity.bot";

export class MockWorld extends World
{
    constructor()
    {
        super(new WorldDataStub());
    }

    /**
     * @deprecated
     **/
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
    env: MyStuff;

    constructor(env?: MyStuff){
      this.env=env;
    }

    /**
     * @deprecated
     **/
    getSpawn(): MyRoomObject
    {
        return this.spawn;
    }

    getSpawnByName(name: string): MyRoomObject
    {
        return this.env.spawns[name];
    }

    setSpawn(spawn: MyRoomObject): void
    {
        this.spawn = spawn;
    }
}

export interface MyStuff
{
    spawns: MyRoomObject[];
    creep: BotPosition;
}
