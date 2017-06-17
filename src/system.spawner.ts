"use strict";

import {ScreepsSystem} from "./engine";

export class SpawnerSystem extends ScreepsSystem
{
    constructor()
    {
        super();
    }

    process(): void
    {
        let creepCount = Object.keys(Game.creeps).length;
        if (creepCount < 6)
        {
            let result = Game.spawns["Spawn1"].createCreep([WORK, WORK, CARRY, MOVE], undefined,
                {
                    role: "harvester",
                    working: false,
                    components: {
                        "HarvesterComponent": {
                            source: Game.spawns["Spawn1"].room.find<Source>(FIND_SOURCES)[0].id,
                            spawn: "Spawn1",
                            state: "pickup",
                            roomName: Game.spawns["Spawn1"].pos.roomName
                        }
                    }
                });

            if (typeof result === "string")
            {
                console.log("Spawned " + result);
            }
        }
    }
}
