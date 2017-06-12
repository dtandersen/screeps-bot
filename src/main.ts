import {Bot} from "./entity.bot";
import {Harvester} from "./component.harvester";
import {Spawner} from "./component.spawner";

export function loop() {
    let spawner = new Spawner();
    spawner.spawn();

    let harvester = new Harvester();
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let bot = new Bot(creep);
        harvester.process(bot);
    }
}
