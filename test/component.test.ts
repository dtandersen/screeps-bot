"use strict";

import {Expect, Test} from "alsatian";
import {MoveComponent} from "../src/system.move";
import {MockBot, MockUberBot} from "./mock.bot";

export class MoveTest
{
    @Test("move to target")
    public test1()
    {
        let bot = new MockUberBot(new MockBot());

        Expect(bot.hasComponent(MoveComponent)).not.toBeTruthy();
    }
}
