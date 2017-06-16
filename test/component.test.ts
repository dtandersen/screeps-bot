import {Expect, Test} from "alsatian";
import {Move, MoveComponent} from "../src/component.move";
import {BotPosition} from "../src/entity.position";
import {MockBot, MockUberBot} from "./mock.bot";

export class MoveTest
{
    @Test("move to target")
    public test1()
    {
        let bot = new MockUberBot(new MockBot());

        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
    }
}
