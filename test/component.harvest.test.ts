import {Expect, Test, TestCase, Setup} from "alsatian";
import {MockBot, MockUberBot} from "./mock.bot";
import {MockWorld, MyStuff} from "./mock.world";
import {World} from "../src/entity.world";
import {Harvester2, HarvesterComponent} from "../src/component.harvester2";
import {MoveComponent} from "../src/component.move";
import {MyRoomObject, UberBot} from "../src/entity.bot";
import {BotPosition} from "../src/entity.position";

export class ComponentHarvestTest
{
    private harvester: Harvester2;
    private world: MockWorld;

    @Setup
    public setup()
    {
        this.world = new MockWorld();
        this.harvester = new Harvester2(this.world);
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 5, y: 5}}},
        sources: [{x: 7, y: 7}],
        creep: {Fred: {x: 1, y: 1}}
    })
    @Test("move to spawn")
    public test1(env: MyStuff)
    {
        this.givenEnv(env);
        let bot = this.world.getCreep("Fred");
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).toEqual(new MoveComponent(5, 5));
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 6, y: 6}}},
        sources: [{x: 7, y: 7}],
        creep: {Fred: {x: 1, y: 1}}
    })
    @Test("move to another spawn")
    public test2(env: MyStuff)
    {
        this.givenEnv(env);
        let bot = this.world.getCreep("Fred");
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1"});
        Expect(bot.getComponent(HarvesterComponent)).toEqual({spawn: "Spawn1"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).toEqual(new MoveComponent(6, 6));
        Expect(bot.getComponent(HarvesterComponent)).toEqual({spawn: "Spawn1"});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 4, y: 4}}},
        sources: [{x: 7, y: 7}],
        creep: {Fred: {x: 3, y: 3}}
    })
    @TestCase({
        spawns: {"Spawn1": {pos: {x: 5, y: 5}}},
        sources: [{x: 1, y: 1}],
        creep: {Fred: {x: 4, y: 4}}
    })
    @Test("harvest from source")
    public harvest(env: MyStuff)
    {
        this.givenEnv(env);
        let spawn = env.spawns["Spawn1"];
        let bot = <MockUberBot>this.world.getCreep("Fred");
        console.log("fred=" + JSON.stringify(bot));
        bot.addComponent(MoveComponent, {x: spawn.x, y: spawn.y});
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", state: "pickup"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
        Expect(bot.harvestAt).toEqual({pos: {x: spawn.pos.x, y: spawn.pos.y, roomName: ""}});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 4, y: 4, roomName: ""}}},
        sources: [{x: 7, y: 7}],
        creep: {Fred: {x: 3, y: 3}}
    })
    @Test("transfer to spawn")
    public test3(env: MyStuff)
    {
        this.givenEnv(env);
        let bot = <MockUberBot>this.world.getCreep("Fred");
        bot.addComponent(MoveComponent, {x: 3, y: 3});
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", state: "deliver"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
        Expect(bot.transferAt).toEqual({pos: {x: 4, y: 4, roomName: ""}});
    }

    private givenEnv(env)
    {
        this.world.setEnv(env);
    }
}
