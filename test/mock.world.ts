import {World, WorldData} from "../src/entity.world";
import {BotPosition} from "../src/entity.position";
import {BotData, MyRoomObject, UberBot} from "../src/entity.bot";
import {MockBot, MockUberBot} from "./mock.bot";
import * as _ from "lodash";

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
        this.worldData.setSpawn({pos: {x: x, y: y, roomName: ""}});
    }

    setEnv(env)
    {
        this.worldData = new WorldDataStub(env);
    }

    getCreep(name: string): UberBot
    {
        return new MockUberBot(this.worldData.getCreep(name));
    }
}

export class WorldDataStub implements WorldData
{
    private spawn: MyRoomObject;
    private env: MyStuff;

    constructor(env?: MyStuff)
    {
        this.env = env;
    }

    getObjectById<T extends Identifiable>(id: string): T
    {
        return <T>_.find(this.env.sources, (o) => o.id === id);
    }

    getCreep(name: string): BotData
    {
        // let botData = new MockBot();
        // let pos = this.env.creep[name].pos;
        // botData.setPosition(new BotPosition(pos.x, pos.y));

        return new MockBot(this.env.creep[name]);
    }

    /**
     * @deprecated
     **/
    getSpawn(): MyRoomObject
    {
        return this.spawn;
    }

    getSpawnByName(name: string): Spawn
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
    creep: BotDef;
    sources: Identifiable[];
}

interface BotDef
{
    pos: BotPosition;
}

interface Identifiable
{
    id: string;
}