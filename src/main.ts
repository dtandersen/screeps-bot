"use strict";

import {SpawnerSystem} from "./system.spawner";
import {MoveEntitySystem} from "./system.move";
import {HarvesterEntitySystem} from "./system.harvester";
import {ScreepsWorldData, World} from "./entity.world";
import {Engine} from "./engine";

export function loop()
{
    let world = new World(new ScreepsWorldData(Game));

    let engine = new Engine();
    engine.register(new SpawnerSystem());
    engine.register(new HarvesterEntitySystem(world));
    engine.register(new MoveEntitySystem(world));

    engine.run();
}
