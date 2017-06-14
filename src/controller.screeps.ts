import {BotData, UberBot} from "./entity.bot";

export interface ScreepsController
{
    process(bot: UberBot): void;
}
