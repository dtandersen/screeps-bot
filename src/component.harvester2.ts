import {ScreepsController} from "./controller.screeps";
import {Component, UberBot, MyRoomObject} from "./entity.bot";
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
        let harv = bot.getComponent(HarvesterComponent);
        let spawn = <MyRoomObject>this.world.getSpawn(harv.spawn);

        if (harv.state === "pickup" && bot.carryingMaxEnergy())
        {
            harv.state = "deliver";
        }

        if (harv.state === "pickup")
        {
            console.log("harvest");
            bot.harvest({pos: {x: spawn.pos.x, y: spawn.pos.y, roomName: ""}});
            bot.deleteComponent(MoveComponent);
        }
        else
        {
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
}

export class HarvesterComponent implements Component
{
    public state: string;
    public spawn: string;
    public source: string;
}
