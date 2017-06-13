import {World, WorldData} from "../src/entity.world";
import {BotPosition} from "../src/entity.position";

export class WorldDataStub implements WorldData {
  spawnPosition: BotPosition;

  getSpawnPosition(): BotPosition {
      return this.spawnPosition;
  }

  setSpawnPosition(position: BotPosition): void {
    this.spawnPosition = position;
  }
}

export class MockWorld extends World {
  constructor() {
    super(new WorldDataStub());
  }

  addSpawn(x: number, y: number): void {
    this.worldData.setSpawnPosition(new BotPosition(x, y));
  }
}
