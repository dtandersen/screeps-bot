import {BaseBot, Component} from "./entity.bot";

export class Move {
    process(bot: BaseBot) {
        let moveComponent = bot.getComponent<MoveComponent>("MoveComponent");
        if (bot.isNear(moveComponent.x, moveComponent.y, 1)) {
            bot.deleteComponent("MoveComponent");
        } else {
            bot.moveToXY(moveComponent.x, moveComponent.y);
        }
    }

    matches(bot: BaseBot): boolean {
        return typeof bot.getComponent<MoveComponent>("MoveComponent") !== "undefined";
    }
}

export class MoveComponent implements Component {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
