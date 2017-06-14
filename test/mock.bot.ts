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
}

export class MockBot implements BotData
{
    private position: BotPosition;
    [memory: string]: Object;

    name()
    {
        throw new Error("Method not implemented.");
    }

    getPosition(): BotPosition
    {
        return this.position;
    }

    setPosition(position: BotPosition): void
    {
        this.position = position;
    }

    moveByPath(any: string | object[]): number
    {
        throw new Error("Method not implemented.");
    }

    getCarryCapacity(): number
    {
        throw new Error("Method not implemented.");
    }

    findPathTo(target: BotPosition): object[]
    {
        throw new Error("Method not implemented.");
    }

    getCarriedEnergy(): number
    {
        throw new Error("Method not implemented.");
    }

    memory(variable: string, value?: object)
    {
        if (typeof value !== "undefined")
        {
            this.memory[variable] = value;
            return;
        }

        return this.memory[variable];
    }

    clearMemory(variable: string): void
    {
        delete this.memory[variable];
    }

    carryingEnergy()
    {
        throw new Error("Method not implemented.");
    }

    carryingMaxEnergy()
    {
        throw new Error("Method not implemented.");
    }

    say(message: string)
    {
        throw new Error("Method not implemented.");
    }

    moveTo(target: any)
    {
        throw new Error("Method not implemented.");
    }

    moveToXY(x: number, y: number): number
    {
        this.movingTo = new BotPosition(x, y);

        return 0;
    }

    isNear(x: number, y: number, radius = 0): boolean
    {
        let dx = Math.abs(x - this.position.x);
        let dy = Math.abs(y - this.position.y);

        return dx <= radius && dy <= radius;
    }

    harvest(target: any)
    {
        throw new Error("Method not implemented.");
    }

    transferEnergy(target: RoomObject): number
    {
        this.transferAt = target;

        return 0;
    }

    findClosestByPath(type: any)
    {
        throw new Error("Method not implemented.");
    }
}
