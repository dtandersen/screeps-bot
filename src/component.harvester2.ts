import {ScreepsController} from "./controller.screeps";
import {BotData, Component, UberBot} from "./entity.bot";
import {MoveComponent} from "./component.move";
import {World} from "./entity.world";
import {BotPosition} from "../src/entity.position";

export class Harvester2 implements ScreepsController
{
    private world: World;

    constructor(world: World)
    {
        this.world = world;
    }

    process(bot: UberBot): void
    {
        let spawn = this.world.getSpawnPosition();
        let harv = bot.getComponent(HarvesterComponent);

        if (harv.state==="pickup")
        {
          // console.log("process spawn=" + JSON.stringify(spawn));
          bot.harvest({pos:{x:spawn.pos.x, y:spawn.pos.y, roomName:""}});
          bot.deleteComponent(MoveComponent);
          return;
        }

        if (bot.isNear(spawn.pos.x, spawn.pos.y, 1))
        {
            bot.deleteComponent(MoveComponent);
            bot.transferEnergy(spawn);
        }
        else
        {
            bot.addComponent(MoveComponent, new MoveComponent(spawn.pos.x, spawn.pos.y));
        }
    }
}

export class HarvesterComponent implements Component
{
  public state:string;
}
