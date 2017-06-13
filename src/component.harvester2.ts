import {ScreepsController} from "./controller.screeps";
import {BaseBot, Component} from "./entity.bot";
import {MoveComponent} from "./component.move";
import {World} from "./entity.world";

export class Harvester2 implements ScreepsController {
  private world: World;

  constructor(world: World) {
    this.world = world;
  }
    process(bot: BaseBot): void {
      let spawnPos = this.world.getSpawnPosition();
      bot.addComponent(new MoveComponent(spawnPos.x, spawnPos.y));
    }
}

export class HarvesterComponent implements Component {
}
