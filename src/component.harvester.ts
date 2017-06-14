export class Harvester {
    /**
     *
     * @param {Creep} creep
     */
    constructor() {
    }

    /**
     *
     * @param {ScreepsBot} bot
     */
    process(bot) {
        if (bot.propertyUndefined("working")) {
            bot.memory("working", false);
        }

        if (Harvester.working(bot) && !bot.carryingEnergy()) {
            // switch state
            bot.memory("working", false);
        }
        // if botData is harvesting carryingEnergy but is full
        else if (!Harvester.working(bot) && bot.carryingMaxEnergy()) {
            // switch state
            bot.memory("working", true);
        }

        // if botData is supposed to transferEnergy carryingEnergy to the spawn
        if (bot.memory("working") === true) {
            // try to transferEnergy carryingEnergy, if the spawn is not in range
            let spawn = Game.spawns["Spawn1"];
            if (bot.transferEnergy(spawn) === ERR_NOT_IN_RANGE) {
                // move towards the spawn
                bot.say("➤ spawn (" + bot.carryingEnergy() + ")");
                bot.moveTo(spawn);
            } else {
                bot.say("transfer (" + bot.carryingEnergy() + ")");
                bot.clearPath();
            }
        }
        // if botData is supposed to harvest carryingEnergy from source
        else {
            // find closest source
            let source = bot.findClosestByPath(FIND_SOURCES);
            // try to harvest carryingEnergy, if the source is not in range
            if (bot.harvest(source) === ERR_NOT_IN_RANGE) {
                // move towards the source
                bot.say("➤ source");
                bot.moveTo(source);
            } else {
                bot.say("harvest (" + bot.carryingEnergy() + ")");
                bot.clearPath();
            }
        }
    }

    /**
     *
     * @param {ScreepsBot} bot
     * @returns {*}
     */
    static working(bot) {
        return bot.memory("working");
    }
}
