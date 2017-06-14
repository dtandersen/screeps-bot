import {Expect, Test, SetupFixture} from "alsatian";
import {MockBot} from "./mock.bot";
import {MockWorld} from "./mock.world";
import {World} from "../src/entity.world";
import {Harvester2, HarvesterComponent} from "../src/component.harvester2";
import {MoveComponent} from "../src/component.move";

export class ComponentHarvestTest
{
    private harvester: Harvester2;
    private world: MockWorld;
    private bot: MockBot;

    @SetupFixture
    public setupFixture()
    {
        this.world = new MockWorld();
        this.harvester = new Harvester2(this.world);
        this.bot = new MockBot();
    }

    @Test("move to spawn")
    public test1()
    {
        this.givenSpawnAt(5, 5);
        this.givenCreepAt(1, 1);
        this.bot.addComponent(new HarvesterComponent());

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent<MoveComponent>("MoveComponent")).toEqual(new MoveComponent(5, 5));
    }

    @Test("move to another spawn")
    public test2()
    {
        this.givenSpawnAt(6, 6);
        this.givenCreepAt(1, 1);
        this.bot.addComponent(new HarvesterComponent());

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent<MoveComponent>("MoveComponent")).toEqual(new MoveComponent(6, 6));
    }

    @Test("transfer to spawn")
    public test3()
    {
        this.givenSpawnAt(4, 4);
        this.givenCreepAt(3, 3);
        this.bot.addComponent(<MoveComponent>{x: 3, y: 3});
        this.bot.addComponent(new HarvesterComponent());

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent<MoveComponent>("MoveComponent")).not.toBeDefined();
        Expect(this.bot.transferAt).toEqual({pos: {x: 4, y: 4, roomName: ""}});
    }

    // @Test("harvest from source")
    // @testi
    public harvest()
    {
        this.givenSpawnAt(4, 4);
        this.givenCreepAt(3, 3);
        this.bot.addComponent({x: 3, y: 3});
        this.bot.addComponent(new HarvesterComponent());

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent<MoveComponent>("MoveComponent")).not.toBeDefined();
        Expect(this.bot.harvestAt).toEqual({pos: {x: 4, y: 4, roomName: ""}});
    }

    private givenCreepAt(x: number, y: number)
    {
        this.bot.setPosition(x, y);
    }

    private givenSpawnAt(x: number, y: number)
    {
        this.world.addSpawn(x, y);
    }
}
