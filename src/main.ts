import {ScreepsBot, UberBot} from "./entity.bot";
import {Harvester} from "./component.harvester";
import {Spawner} from "./component.spawner";
import {Move} from "./component.move";

export function loop()
{
    let spawner = new Spawner();
    spawner.spawn();

    let harvester = new Harvester();
    let mover = new Move();
    for (let name in Game.creeps)
    {
        let creep = Game.creeps[name];
        let bot = new UberBot(new ScreepsBot(creep));

        if (mover.matches(bot))
        {
            mover.process(bot);
        }

        harvester.process(bot);
    }
}
