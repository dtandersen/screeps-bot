"use strict";

import {BotPosition} from "./entity.position";
import {BotData, MyRoomObject, ScreepsBotData} from "./entity.bot";

export class World
{
    protected worldData: WorldData;

    constructor(worldData: WorldData)
    {
        this.worldData = worldData;
    }

    getSpawnPosition(): MyRoomObject
    {
        return this.worldData.getSpawn();
    }

    getSpawn(name: string): Spawn
    {
        return this.worldData.getSpawnByName(name);
    }

    getObjectById<T>(id: string): T
    {
        return this.worldData.getObjectById<T>(id);
    }
}

interface WorldRepository
{
    getWorld(): World;
}

class ScreepsWorldRepository implements WorldRepository
{
    getWorld(): World
    {
        return new World(new ScreepsWorldData(Game));
    }
}

export interface WorldData
{
    getSpawn(): MyRoomObject;
    getSpawnByName(name: string): Spawn;
    setSpawn(spawn: MyRoomObject): void;
    getCreep(name: string): BotData;
    getObjectById<T>(id: string): T;
}

export class ScreepsWorldData implements WorldData
{
    private game: Game;

    constructor(game: Game)
    {
        this.game = game;
    }

    getObjectById<T>(id: string): T
    {
        return Game.getObjectById<T>(id);
    }

    getCreep(name: string): BotData
    {
        return new ScreepsBotData(this.game.creeps[name]);
    }

    /**
     * @deprecated use getSpawnByName
     */
    getSpawn(): MyRoomObject
    {
        let spawn = this.game.spawns["Spawn1"];

        return spawn;
    }

    getSpawnByName(name: string): Spawn
    {
        let spawn = this.game.spawns[name];

        return spawn;
    }

    setSpawn(position: MyRoomObject): void
    {
        throw new Error("Method not implemented.");
    }
}
