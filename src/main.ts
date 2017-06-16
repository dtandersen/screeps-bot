"use strict";

import {ScreepsBotData, UberBot} from "./entity.bot";
import {Harvester} from "./component.harvester";
import {Spawner} from "./component.spawner";
import {Move} from "./component.move";
import {Harvester2} from "./component.harvester2";
import {ScreepsWorldData, World} from "./entity.world";

export function loop()
{
    let spawner = new Spawner();
    spawner.spawn();

    let world = new World(new ScreepsWorldData(Game));
    let harvester = new Harvester2(world);
    let mover = new Move();
    for (let name in Game.creeps)
    {
        let creep = Game.creeps[name];
        let bot = new UberBot(new ScreepsBotData(creep));

        harvester.process(bot);

        if (mover.matches(bot))
        {
            mover.process(bot);
        }
    }
}
