import {Expect, Test} from "alsatian";
import {MockBot} from "./mock.bot";
import {MockWorld} from "./mock.world";
import {World} from "../src/entity.world";
import {Harvester2, HarvesterComponent} from "../src/component.harvester2";
import {MoveComponent} from "../src/component.move";

export class ComponentHarvestTest {
    @Test("move to source")
    public test1() {
      let world = new MockWorld();
        let harvester = new Harvester2(world);
        let bot = new MockBot();
        world.addSpawn(5, 5);
        bot.setPosition(1,1);
        bot.addComponent(new HarvesterComponent());
        harvester.process(bot);

        Expect(bot.getComponent<MoveComponent>()).toEqual(new MoveComponent(5, 5));
    }

    @Test("move to another source")
    public test2() {
    let world = new MockWorld();
        let harvester = new Harvester2(world);
        let bot = new MockBot();
        world.addSpawn(6, 6);
        bot.setPosition(1, 1);
        bot.addComponent(new HarvesterComponent());
        harvester.process(bot);

        Expect(bot.getComponent<MoveComponent>()).toEqual(new MoveComponent(6, 6));
    }
}
