"use strict";

import {Component, UberBot} from "./entity.bot";
import {World} from "./entity.world";
import {EntityResolver, ScreepsEntitySystem} from "./engine";

export class MoveEntitySystem extends ScreepsEntitySystem
{
    constructor(readonly world: World)
    {
        super(new EntityResolver(world, [MoveComponent]));
    }

    processEntity(bot: UberBot)
    {
        let moveComponent = bot.getComponent(MoveComponent);

        if (bot.isNear(moveComponent.x, moveComponent.y, 1))
        {
            bot.deleteComponent(MoveComponent);
        }
        else
        {
            bot.moveToXY(moveComponent.x, moveComponent.y);
        }
    }
}

export class MoveComponent implements Component
{
    x: number;
    y: number;
    roomName: string;
}
