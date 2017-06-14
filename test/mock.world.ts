import {World, WorldData} from "../src/entity.world";
import {BotPosition} from "../src/entity.position";
import {MyRoomObject} from "../src/entity.bot";

export class WorldDataStub implements WorldData
{
    spawn: MyRoomObject;

    getSpawn(): MyRoomObject
    {
        return this.spawn;
    }

    setSpawn(spawn: MyRoomObject): void
    {
        this.spawn = spawn;
    }
}

export class MockWorld extends World
{
    constructor()
    {
        super(new WorldDataStub());
    }

    addSpawn(x: number, y: number): void
    {
        this.worldData.setSpawn({pos: {x: x, y: y, roomName: ""}});
    }
}
