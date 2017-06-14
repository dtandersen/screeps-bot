import {Expect, Test, TestCase, Setup} from "alsatian";
import {MockBot, MockUberBot} from "./mock.bot";
import {MockWorld} from "./mock.world";
import {World} from "../src/entity.world";
import {Harvester2, HarvesterComponent} from "../src/component.harvester2";
import {MoveComponent} from "../src/component.move";
import {MyRoomObject, UberBot} from "../src/entity.bot";
import {BotPosition} from "../src/entity.position";

export class ComponentHarvestTest
{
    private harvester: Harvester2;
    private world: MockWorld;
    private bot: MockUberBot;

    @Setup
    public setup()
    {
        this.world = new MockWorld();
        this.harvester = new Harvester2(this.world);
        this.bot = new MockUberBot(new MockBot());
    }

    @Test("move to spawn")
    public test1()
    {
        this.givenSpawnAt(5, 5);
        this.givenCreepAt(1, 1);
        this.bot.addComponent(HarvesterComponent, new HarvesterComponent());

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent(MoveComponent)).toEqual(new MoveComponent(5, 5));
    }

    @Test("move to another spawn")
    public test2()
    {
        this.givenSpawnAt(6, 6);
        this.givenCreepAt(1, 1);
        this.bot.addComponent(HarvesterComponent, new HarvesterComponent());
        Expect(this.bot.getComponent(HarvesterComponent)).toEqual({});

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent(MoveComponent)).toEqual(new MoveComponent(6, 6));
        Expect(this.bot.getComponent(HarvesterComponent)).toEqual({});
    }

    @TestCase({
      spawns: {"Spawn1": {x: 4, y: 4}},
      sources: [ {x: 7, y: 7}],
      creep: { Fred: {x:3, y: 3}}
    })
    @TestCase({
      spawns: {"Spawn1": {x: 5, y: 5}},
      sources: [ {x: 1, y: 1}],
      creep: { Fred: {x:4, y: 4}}
    })
    @Test("harvest from source")
    public harvest(env)
    {
        this.givenEnv(env);
        let spawn = env.spawns["Spawn1"];
        this.givenSpawns(env.spawns);
        this.givenCreepAt(env.creep.x, env.creep.y);
        this.bot.addComponent(MoveComponent, {x:spawn.x, y:spawn.y});
        this.bot.addComponent(HarvesterComponent, {state: "pickup"});
        // console.log("spawn b=" + JSON.stringify(spawn));

        this.harvester.process(this.bot);

        // console.log("spawn a=" + JSON.stringify(spawn));
        Expect(this.bot.getComponent(MoveComponent)).not.toBeDefined();
        Expect(this.bot.harvestAt).toEqual({pos: {x: spawn.x, y: spawn.y, roomName: ""}});
    }

    @Test("transfer to spawn")
    public test3()
    {
        this.givenSpawnAt(4, 4);
        this.givenCreepAt(3, 3);
        this.bot.addComponent(MoveComponent, {x:3, y:3});
        this.bot.addComponent(HarvesterComponent, {state: "deliver"});

        this.harvester.process(this.bot);

        Expect(this.bot.getComponent(MoveComponent)).not.toBeDefined();
        Expect(this.bot.transferAt).toEqual({pos: {x: 4, y: 4, roomName: ""}});
    }

    private givenCreepAt(x: number, y: number)
    {
        this.bot.setPosition(new BotPosition(x, y));
    }

    private givenSpawnAt(x: number, y: number)
    {
        this.world.addSpawn(x, y);
    }

    private givenSpawns(spawns)
    {
      console.log("given spawns=" + JSON.stringify(spawns));
      for (var id in spawns) {
        let spawn = spawns[id];
        // console.log("given=" + JSON.stringify(spawn));
        this.world.addSpawn(spawn.x, spawn.y);
      }
    }

    private givenEnv(env)
    {
      this.world.setEnv(env);
    }
}
