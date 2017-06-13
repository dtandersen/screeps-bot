import {Expect, Test} from "alsatian";
import {MockBot} from "./mock.bot";
import {Harvester2, HarvesterComponent} from "../src/component.harvester2";

export class ComponentHarvestTest {
    @Test("move to target")
    public test1() {
        let harvester = new Harvester2();
        let bot = new MockBot();
        let world = new MockWorld();
        bot.setPosition(1,1);
        bot.addComponent(new HarvesterComponent());
        harvester.process(bot);
    }
}
