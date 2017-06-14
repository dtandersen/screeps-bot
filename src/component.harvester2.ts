import {ScreepsController} from "./controller.screeps";
import {BotData, Component, UberBot} from "./entity.bot";
import {MoveComponent} from "./component.move";
import {World} from "./entity.world";

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
        if (bot.isNear(spawn.pos.x, spawn.pos.y, 1))
        {
            bot.deleteComponent("MoveComponent");
            bot.transferEnergy(spawn);
        }
        else
        {
            bot.addComponent(new MoveComponent(spawn.pos.x, spawn.pos.y));
        }
    }
}

export class HarvesterComponent implements Component
{
}
