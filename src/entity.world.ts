import {BotPosition} from "./entity.position";
import {MyRoomObject} from "./entity.bot";

export class World {
    protected worldData: WorldData;

    constructor(worldData: WorldData) {
        this.worldData = worldData;
    }

    getSpawnPosition(): MyRoomObject {
        return this.worldData.getSpawn();
    }

    getSpawn(name:string ): MyRoomObject {
        return this.worldData.getSpawnByName(name);
    }
}


interface WorldRepository {
    getWorld(): World;
}

class ScreepsWorldRepository implements WorldRepository {
    getWorld(): World {
        return new World(new ScreepsWorldData(Game));
    }
}

export interface WorldData {
    getSpawn(): MyRoomObject;
    getSpawnByName(name: string): MyRoomObject;
    setSpawn(spawn: MyRoomObject): void;
}

class ScreepsWorldData implements WorldData {
    private game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    /**
     * @deprecated use getSpawnByName
     */
    getSpawn(): MyRoomObject {
        let spawn = this.game.spawns["Spawn1"];

        return spawn;
    }

    getSpawnByName(name: string): MyRoomObject {
        let spawn = this.game.spawns[name];

        return spawn;
    }

    setSpawn(position: MyRoomObject): void {
      throw new Error("Method not implemented.");
    }
}
