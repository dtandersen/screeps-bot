import {BotPosition} from "../src/entity.position";
import {BotData, Component, MyRoomObject, UberBot} from "../src/entity.bot";

export class MockUberBot extends UberBot
{
    harvestAt: BotPosition;
    transferAt: MyRoomObject;
    movingTo: BotPosition;

    setPosition(position: BotPosition): void
    {
        this.botData.setPosition(position);
    }

    transferEnergy(target: MyRoomObject): number
    {
        this.transferAt = target;
        return super.transferEnergy(target);
    }

    moveToXY(x: number, y: number): number
    {
        this.movingTo = new BotPosition(x, y);
        return this.botData.moveToXY(x, y);
    }

    harvest(target: BotPosition): number
    {
        this.harvestAt = target;
        return super.harvest(target);
    }
}

export class MockBot implements BotData
{
    private pos: BotPosition;
    //[memory: string]: any;
    private carryEnergy: number;
    private carryCapacity: number;
    private mem: object;

    constructor(data?: MockBot)
    {
        if (typeof data !== "undefined")
        {
            this.pos = data.pos;
            //this.mem = data.mem;
            this.carryEnergy = data.carryEnergy;
            this.carryCapacity = data.carryCapacity;
        }
        else
        {
        }
        this.mem = {};
    }

    name(): string
    {
        throw new Error("Method not implemented.");
    }

    getPosition(): BotPosition
    {
        return this.pos;
    }

    setPosition(position: BotPosition): void
    {
        this.pos = position;
    }

    moveByPath(any: string | object[]): number
    {
        throw new Error("Method not implemented.");
    }

    carryingEnergy(): number
    {
        return this.carryEnergy;
    }

    getCarryCapacity(): number
    {
        return this.carryCapacity;
    }

    findPathTo(target: BotPosition): object[]
    {
        throw new Error("Method not implemented.");
    }

    memory<T>(variable: string, value?: T): T
    {
        if (typeof value !== "undefined")
        {
            this.mem[variable] = value;
            return;
        }

        return <T>this.mem[variable];
    }

    clearMemory(variable: string): void
    {
        delete this.mem[variable];
    }

    carryingMaxEnergy(): boolean
    {
        throw new Error("Method not implemented.");
    }

    say(message: string)
    {
        throw new Error("Method not implemented.");
    }

    moveTo(target: any): number
    {
        throw new Error("Method not implemented.");
    }

    moveToXY(x: number, y: number): number
    {
        // this.movingTo = new BotPosition(x, y);

        return 0;
    }

    isNear(x: number, y: number, radius = 0): boolean
    {
        let dx = Math.abs(x - this.pos.x);
        let dy = Math.abs(y - this.pos.y);

        return dx <= radius && dy <= radius;
    }

    harvest(target: any): number
    {
        return 0;
    }

    transferEnergy(target: RoomObject): number
    {
        // this.transferAt = target;

        return 0;
    }

    findClosestByPath(type: any)
    {
        throw new Error("Method not implemented.");
    }
}
