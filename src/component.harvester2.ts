"use strict";

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
        if (harv === undefined)
        {
            return;
        }

        let spawn = this.world.getSpawn(harv.spawn);

        if (harv.state === "pickup" && bot.carryingMaxEnergy())
        {
            harv.state = "deliver";
        }
        else if (harv.state === "deliver" && bot.carryingEnergy() == 0)
        {
            harv.state = "pickup";
        }

        if (harv.state === "pickup")
        {
            let source = this.world.getObjectById<Source>(harv.source);
            // console.log("source=" + JSON.stringify(source));
            if (bot.isNear(source.pos.x, source.pos.y, 1))
            {
                console.log("harvest");
                let h = {pos: {x: source.pos.x, y: source.pos.y, roomName: harv.roomName}};
                bot.harvest(source);
                console.log(JSON.stringify(h));
                bot.deleteComponent(MoveComponent);
            }
            else
            {
                bot.addComponent(MoveComponent, {x: source.pos.x, y: source.pos.y, roomName: harv.roomName});
            }
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
                bot.addComponent(MoveComponent, {x: spawn.pos.x, y: spawn.pos.y, roomName: harv.roomName});
            }
        }
    }
}

export class HarvesterComponent implements Component
{
    public state: string;
    public spawn: string;
    public source: string;
    public roomName: string;
}

class MySource implements Source
{
    prototype: Source;
    energy: number;
    energyCapacity: number;
    id: string;
    ticksToRegeneration: number;
    pos: RoomPosition;
    room: Room;
}
