import {Expect, Test} from "alsatian";
import {Move, MoveComponent} from "../src/component.move";
import {BotPosition} from "../src/entity.position";
import {MockBot, MockUberBot} from "./mock.bot";

export class MoveTest
{
    @Test("move to target")
    public test1()
    {
        let m = new Move();
        let bot = new MockUberBot(new MockBot());
        bot.setPosition(new BotPosition(0, 0));
        bot.addComponent(MoveComponent, new MoveComponent(2, 2));
        m.process(bot);

        Expect(bot.movingTo).toEqual(new BotPosition(2, 2));
    }

    @Test("stop at target")
    public test2()
    {
        let m = new Move();
        let bot = new MockUberBot(new MockBot());
        bot.setPosition(new BotPosition(1, 1));
        bot.addComponent(MoveComponent, new MoveComponent(1, 1));
        m.process(bot);

        Expect(bot.movingTo).not.toBeDefined();
        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
    }

    @Test("stop near target")
    public nearTarget()
    {
        let m = new Move();
        let bot = new MockUberBot(new MockBot());
        bot.setPosition(new BotPosition(2, 2));
        bot.addComponent(MoveComponent, {x:3, y:3});
        m.process(bot);

        Expect(bot.movingTo).not.toBeDefined();
        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
    }
}
