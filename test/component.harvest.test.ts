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
        sources: [{id: "abc", pos: {x: 7, y: 7}}],
        creep: {Fred: {pos: {x: 1, y: 1}}}
    })
    @Test("move to spawn")
    public test1(env: MyStuff)
    {
        this.givenEnv(env);
        let bot = this.world.getCreep("Fred");
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", roomName: "ROOM"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).toEqual({x: 5, y: 5, roomName: "ROOM"});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 6, y: 6}}},
        sources: [{id: "abc", pos: {x: 7, y: 7}}],
        creep: {Fred: {pos: {x: 1, y: 1}}}
    })
    @Test("move to another spawn")
    public test2(env: MyStuff)
    {
        this.givenEnv(env);
        let bot = this.world.getCreep("Fred");
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", roomName: "ROOM"});
        Expect(bot.getComponent(HarvesterComponent)).toEqual({spawn: "Spawn1", roomName: "ROOM"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).toEqual({x: 6, y: 6, roomName: "ROOM"});
        Expect(bot.getComponent(HarvesterComponent)).toEqual({spawn: "Spawn1", roomName: "ROOM"});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 4, y: 4}}},
        sources: [{id: "abc", pos: {x: 7, y: 7, roomName: "ROOM"}}],
        creep: {
            Fred: {
                pos: {x: 6, y: 6},
                carryEnergy: 0,
                carryCapacity: 50
            }
        }
    })
    @TestCase({
        spawns: {"Spawn1": {pos: {x: 5, y: 5}}},
        sources: [{id: "abc", pos: {x: 1, y: 1, roomName: "ROOM"}}],
        creep: {
            Fred: {
                pos: {x: 1, y: 1},
                carryEnergy: 0,
                carryCapacity: 50
            }
        }
    })
    @Test("harvest from source")
    public harvest(env: MyStuff)
    {
        this.givenEnv(env);
        let source = <Source>env.sources[0];
        let spawn = env.spawns["Spawn1"];
        let bot = <MockUberBot>this.world.getCreep("Fred");
        console.log("fred=" + JSON.stringify(bot));
        bot.addComponent(MoveComponent, {x: spawn.x, y: spawn.y, roomName: "ROOM"});
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", state: "pickup", source: "abc", roomName: "ROOM"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
        Expect(bot.harvestAt).toEqual({id: "abc", pos: {x: source.pos.x, y: source.pos.y, roomName: "ROOM"}});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 4, y: 4, roomName: "ROOM"}}},
        sources: [{id: "abc", pos: {x: 7, y: 7}}],
        creep: {Fred: {pos: {x: 3, y: 3}}}
    })
    @Test("transfer to spawn")
    public test3(env: MyStuff)
    {
        this.givenEnv(env);
        let bot = <MockUberBot>this.world.getCreep("Fred");
        bot.addComponent(MoveComponent, {x: 3, y: 3, roomName: "ROOM"});
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", state: "deliver", roomName: "ROOM"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).not.toBeDefined();
        Expect(bot.transferAt).toEqual({pos: {x: 4, y: 4, roomName: "ROOM"}});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 5, y: 5}}},
        sources: [{id: "abc", pos: {x: 1, y: 1}}],
        creep: {
            Fred: {
                pos: {x: 3, y: 3},
                carryEnergy: 50,
                carryCapacity: 50
            }
        }
    })
    @Test("full; deliver to spawn")
    public full(env: MyStuff)
    {
        this.givenEnv(env);
        let spawn = env.spawns["Spawn1"];
        let bot = <MockUberBot>this.world.getCreep("Fred");
        console.log("fred=" + JSON.stringify(bot));
        // bot.addComponent(MoveComponent, {x: spawn.x, y: spawn.y});
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", state: "pickup", roomName: "ROOM"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).toEqual({x: 5, y: 5, roomName: "ROOM"});
        Expect(bot.getComponent(HarvesterComponent)).toEqual({spawn: "Spawn1", state: "deliver", roomName: "ROOM"});
    }

    @TestCase({
        spawns: {"Spawn1": {pos: {x: 5, y: 5}}},
        sources: [
            {
                id: "abc",
                pos: {x: 1, y: 1}
            }
        ],
        creep: {
            Fred: {
                pos: {x: 3, y: 3},
                carryEnergy: 0,
                carryCapacity: 50
            }
        }
    })
    @Test("empty; switch to pickup")
    public empty(env: MyStuff)
    {
        this.givenEnv(env);
        let spawn = env.spawns["Spawn1"];
        let bot = <MockUberBot>this.world.getCreep("Fred");
        console.log("fred=" + JSON.stringify(bot));
        bot.addComponent(HarvesterComponent, {spawn: "Spawn1", state: "deliver", source: "abc", roomName: "ROOM"});

        this.harvester.process(bot);

        Expect(bot.getComponent(MoveComponent)).toEqual({x: 1, y: 1, roomName: "ROOM"});
        Expect(bot.getComponent(HarvesterComponent)).toEqual({
            spawn: "Spawn1",
            state: "pickup",
            source: "abc",
            roomName: "ROOM"
        });
    }

    private givenEnv(env)
    {
        this.world.setEnv(env);
    }
}
