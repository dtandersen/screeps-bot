/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('bot');
 * mod.thing == 'a thing'; // true
 */

export class Bot {
    creep: Creep;

    /**
     *
     * @param {Creep} creep
     */
    constructor(creep: Creep) {
        this.creep = creep;
    }

    name() {
        return this.creep.name;
    }

    /**
     *
     * @param {string} variable
     * @param value
     * @returns {*}
     */
    memory(variable: string, value?: object) {
        if (typeof value !== "undefined") {
            // console.log(this.name() + ": set " + variable + "=" + value);
            this.creep.memory[variable] = value;
            return value;
        }

        // console.log(this.name() + ": get " + variable + "=" + this.creep.memory[variable]);

        return this.creep.memory[variable];
    }

    propertyUndefined(variable) {
        return !this.creep.memory.hasOwnProperty(variable);
    }

    clearMemory(variable) {
        delete this.creep.memory[variable];
    }

    /**
     * @returns {int}
     */
    carryingEnergy() {
        return this.creep.carry.energy;
    }

    /**
     *
     * @returns {boolean}
     */
    carryingMaxEnergy() {
        return this.carryingEnergy() === this.creep.carryCapacity
    }

    /**
     *
     * @param {string} message
     */
    say(message) {
        this.creep.say(message);
    }

    /**
     *
     * @param {RoomPosition} target
     */
    moveTo(target) {
        let creep = this.creep;

        // if (this.propertyUndefined("lastPos")) {
        //     this.memory("lastPos", creep.pos);
        // }

        let lastPos = this.memory("lastPos");

        let repath = false;
        let blocked = false;
        if (typeof lastPos === "object" && (creep.pos.x === lastPos.x && creep.pos.y === lastPos.y)) {
            blocked = true;
            // console.log(this.name() + " blocked: " + this.blocked());
            if (this.blocked() >= 2) {
                repath = true;
            }
        } else {
            this.clearBlocked();
        }
        if (this.propertyUndefined("path")) {
            console.log(this.name() + " has no path");
            repath = true;
        }

        if (repath) {
            console.log(this.name() + " repathing");
            this.clearBlocked();
            creep.memory.path = creep.pos.findPathTo(target);
        }

        let result = creep.moveByPath(creep.memory.path);
        creep.memory.lastPos = creep.pos;

        if (result < 0) {
            if (result === -11)
                creep.say("tired");
            else
                creep.say("error: " + result);
        }

        if (blocked && result !== -11) {
            this.incrementBlocked();
            console.log(this.name() + " blocked: " + this.blocked());
        }
    }

    clearBlocked() {
        this.clearMemory("blocked");
    }

    blocked(value?: object) {
        if (typeof value !== "undefined") {
            return this.memory("blocked", value);
        }

        if (this.propertyUndefined("blocked")) {
            return 0;
        }

        return this.memory("blocked");
    }

    incrementBlocked() {
        this.blocked(this.blocked() + 1);
    }

    clearPath() {
        this.clearMemory("path");
    }

    /**
     *
     * @param {Source|Mineral} target
     * @returns {*}
     */
    harvest(target) {
        return this.creep.harvest(target);
    }

    /**
     *
     * @param {Creep|Structure} target
     * @returns {*}
     */
    transferEnergy(target) {
        return this.creep.transfer(target, RESOURCE_ENERGY);
    }

    /**
     * @param {number} type
     * @returns {*}
     */
    findClosestByPath(type) {
        return this.creep.pos.findClosestByPath(type);
    }
}
