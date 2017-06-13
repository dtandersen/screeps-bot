import {BotPosition} from "./entity.position";

export class World {
    private worldData: WorldData;

    constructor(worldData: WorldData) {
        this.worldData = worldData;
    }

    getSpawnPosition(): BotPosition {
        return this.worldData.getSpawnPosition();
    }
}

export interface WorldData {
    getSpawnPosition(): BotPosition;
}

interface WorldRepository {
    getWorld(): World;
}

class ScreepsWorldRepository implements WorldRepository {
    getWorld(): World {
        return new World(new ScreepsWorldData(Game));
    }
}

class ScreepsWorldData implements WorldData {
    private game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    getSpawnPosition(): BotPosition {
        let pos = this.game.spawns["Spawn1"].pos;

        return new BotPosition(pos.x, pos.y);
    }
}
