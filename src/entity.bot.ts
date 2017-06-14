import {BotPosition} from "./entity.position";
import {deprecate} from "util";

export class UberBot
{
    protected botData: BotData;

    constructor(botData: BotData)
    {
        this.botData = botData;
    }

    name()
    {
        return this.botData.name();
    }

    addComponent<T extends Component>(t: new()=> T, component: T): void
    {
      // console.log("begin addComponent");
        let name = t["name"];
        //  console.log("name=" + name);
        //  console.log("component=" + JSON.stringify(component));
        if (name === "Object") {
          throw new Error("Component may not be Object: " + JSON.stringify(component));
        }

        if (typeof this.memory("components") === "undefined")
        {
            this.memory("components", {});
        }

        let components = this.memory<Component[]>("components");
        components[name] = component;
        // console.log("add " + name + "=" + JSON.stringify(component));
        // console.log("components=" + JSON.stringify(components));
        this.memory("components", components);
        // console.log("end addComponent");
    }

    getComponent<T extends Component>(t: new()=>T): T
    {
      // console.log("begin getComponent");
        let components = <Component[]>this.memory("components");
        let component = <T>components[t["name"]];
        // console.log("get component " + name + "=" + JSON.stringify(component));
        // console.log("end getComponent");
        return component;
    }

    deleteComponent<T extends Component>(t: new()=>T)
    {
      let name = t["name"];
      // console.log("begin deleteComponent");
        // console.log("delete component " + name);
        delete this.memory("components")[name];
        // console.log("components=" + JSON.stringify(this.memory("components")));
        // console.log("end deleteComponent");
    }

    /**
     * @param {string} variable
     * @param value
     * @returns {*}
     */
    memory<T>(variable: string, value?: T): T
    {
        return this.botData.memory(variable, value);
    }

    propertyUndefined(variable: string): boolean
    {
        return typeof this.botData.memory(variable) === "undefined";
    }

    clearMemory(variable: string): void
    {
        this.botData.clearMemory(variable);
    }

    /**
     * @returns {int}
     */
    carryingEnergy(): number
    {
        return this.botData.carryingEnergy();
    }

    /**
     *
     * @returns {boolean}
     */
    carryingMaxEnergy(): boolean
    {
        return this.carryingEnergy() === this.botData.getCarryCapacity();
    }

    /**
     *
     * @param {string} message
     */
    say(message: string): void
    {
        this.botData.say(message);
    }

    /**
     *
     * @param {RoomPosition} target
     */
    moveTo(target): void
    {
        let creep = this.botData;

        let lastPos = <BotPosition>this.memory("lastPos");

        let repath = false;
        let blocked = false;
        if (typeof lastPos === "object" && (creep.getPosition().x === lastPos.x && creep.getPosition().y === lastPos.y))
        {
            blocked = true;
            // console.log(this.name() + " blocked: " + this.blocked());
            if (this.blocked() >= 2)
            {
                repath = true;
            }
        }
        else
        {
            this.clearBlocked();
        }
        if (this.propertyUndefined("path"))
        {
            console.log(this.name() + " has no path");
            repath = true;
        }

        if (repath)
        {
            console.log(this.name() + " repathing");
            this.clearBlocked();
            creep.memory("path", creep.findPathTo(target));
        }

        let result = creep.moveByPath(<object[]>creep.memory("path"));
        creep.memory("lastPos", creep.getPosition());

        if (result < 0)
        {
            if (result === -11)
            {
                creep.say("tired");
            }
            else
            {
                creep.say("error: " + result);
            }
        }

        if (blocked && result !== -11)
        {
            this.incrementBlocked();
            console.log(this.name() + " blocked: " + this.blocked());
        }
    }

    moveToXY(x: number, y: number): number
    {
        return this.botData.moveToXY(x, y);
    }

    isNear(x: number, y: number, radius = 0): boolean
    {
        let dx = Math.abs(x - this.botData.getPosition().x);
        let dy = Math.abs(y - this.botData.getPosition().y);

        return dx <= radius && dy <= radius;
    }

    /**
     * @deprecated Move to MovementSystem
     *
     */
    clearBlocked()
    {
        this.clearMemory("blocked");
    }

    /**
     * @deprecated Move to MovementSystem
     *
     */
    blocked(value?: number): number
    {
        if (typeof value !== "undefined")
        {
            return this.memory("blocked", value);
        }

        if (this.propertyUndefined("blocked"))
        {
            return 0;
        }

        return this.memory<number>("blocked");
    }

    /**
     * @deprecated Move to MovementSystem
     *
     */
    incrementBlocked()
    {
        this.blocked(this.blocked() + 1);
    }

    /**
     * @deprecated Move to MovementSystem
     *
     */
    clearPath()
    {
        this.clearMemory("path");
    }

    /**
     *
     * @param {Source|Mineral} target
     * @returns {*}
     */
    harvest(target)
    {
        return this.botData.harvest(target);
    }

    /**
     *
     * @param {Creep|Structure} target
     * @returns {*}
     */
    transferEnergy(target: MyRoomObject): number
    {
        return this.botData.transferEnergy(target);
    }

    /**
     * @param {number} type
     * @returns {*}
     */
    findClosestByPath(type)
    {
        return this.botData.findClosestByPath(type);
    }
}

export interface Component
{
}

export interface BotData
{
    name(): string;

    memory<T>(variable: string, value?: T): T;

    carryingEnergy(): number;

    carryingMaxEnergy(): boolean;

    say(message: string): void;

    moveToXY(x: number, y: number): number;

    moveTo(target): number;

    harvest(target): number;

    transferEnergy(target: MyRoomObject): number;

    findClosestByPath(type);

    getPosition(): BotPosition;

    setPosition(position: BotPosition): void;

    moveByPath(any: object[] | string): number;

    getCarryCapacity(): number;

    findPathTo(target: BotPosition): object[];

    clearMemory(variable: string): void;
}

export class ScreepsBot implements BotData
{
    private creep: Creep;

    constructor(creep: Creep)
    {
        this.creep = creep;
    }

    name()
    {
        return this.creep.name;
    }

    getCarryCapacity(): number
    {
        return this.creep.carryCapacity;
    }

    getPosition(): BotPosition
    {
        return this.creep.pos;
    }

    setPosition(position: BotPosition): void
    {
        throw new Error("Method not implemented.");
    }

    moveByPath(path: string | MyPath[]): number
    {
        return this.creep.moveByPath(path);
    }

    findPathTo(target: BotPosition): object[]
    {
        return this.creep.pos.findPathTo(target.x, target.y);
    }

    /**
     *
     * @param {string} variable
     * @param value
     * @returns {*}
     */
    memory(variable: string, value?: object)
    {
        if (typeof value !== "undefined")
        {
            this.creep.memory[variable] = value;
            return value;
        }

        return this.creep.memory[variable];
    }

    clearMemory(variable: string): void
    {
        delete this.creep.memory[variable];
    }

    /**
     * @returns {int}
     */
    carryingEnergy(): number
    {
        return this.creep.carry.energy;
    }

    /**
     *
     * @returns {boolean}
     */
    carryingMaxEnergy(): boolean
    {
        return this.carryingEnergy() === this.creep.carryCapacity;
    }

    /**
     *
     * @param {string} message
     */
    say(message: string)
    {
        this.creep.say(message);
    }

    moveTo(target: BotPosition)
    {
        return this.creep.moveTo(<RoomPosition>target);
    }

    moveToXY(x: number, y: number): number
    {
        return this.creep.moveTo(x, y);
    }

    /**
     *
     * @param {Source|Mineral} target
     * @returns {*}
     */
    harvest(target)
    {
        return this.creep.harvest(target);
    }

    /**
     *
     * @param {Creep|Structure} target
     * @returns {*}
     */
    transferEnergy(target)
    {
        return this.creep.transfer(target, RESOURCE_ENERGY);
    }

    /**
     * @param {number} type
     * @returns {*}
     */
    findClosestByPath(type)
    {
        return this.creep.pos.findClosestByPath(type);
    }

    getCarriedEnergy(): number
    {
        return this.creep.carry.energy;
    }
}

export class MyRoomObject
{
    public pos: BotPosition;
}

interface MyPath extends PathStep
{
}
