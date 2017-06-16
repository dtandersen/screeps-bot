"use strict";

import {BotData, Component, UberBot} from "./entity.bot";
import {ScreepsController} from "./controller.screeps";

export class Move implements ScreepsController
{
    process(bot: UberBot)
    {
        let moveComponent = bot.getComponent(MoveComponent);
        if (moveComponent === undefined)
        {
            return;
        }

        if (bot.isNear(moveComponent.x, moveComponent.y, 1))
        {
            bot.deleteComponent(MoveComponent);
        }
        else
        {
            bot.moveToXY(moveComponent.x, moveComponent.y);
        }
    }

    matches(bot: UberBot): boolean
    {
        return typeof bot.getComponent(MoveComponent) !== "undefined";
    }
}

export class MoveComponent implements Component
{
    x: number;
    y: number;
    roomName: string;
}
