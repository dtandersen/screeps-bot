import {BaseBot} from "./entity.bot";

export interface ScreepsController {
    process(bot: BaseBot): void;
}
