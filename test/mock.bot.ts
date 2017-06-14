import {BotPosition} from "../src/entity.position";
import {BaseBot, Component, MyRoomObject} from "../src/entity.bot";

export class MockBot implements BaseBot
{
    private component: Component;
    public movingTo: BotPosition;
    private position: BotPosition;
    transferAt: MyRoomObject;
    harvestAt: MyRoomObject;
    [memory: string]: Object;

    addComponent<T extends Component>(component: T): void
    {
        //this.component = component;
        if (typeof this.memory["components"] === "undefined")
        {
            this.memory["components"] = {};
        }

        console.log(component.constructor["name"]);
        this.memory["components"][component.constructor["name"]] = component;
    }

    getComponent<T extends Component>(name: string): T
    {
        return <T>this.memory["components"][name];
    }

    deleteComponent(name: string): void
    {
        // this.component = null;
        delete this.memory["components"][name];
    }

    name()
    {
        throw new Error("Method not implemented.");
    }

    memory(variable: string, value?: object)
    {
        throw new Error("Method not implemented.");
    }

    propertyUndefined(variable: any)
    {
        throw new Error("Method not implemented.");
    }

    clearMemory(variable: any)
    {
        throw new Error("Method not implemented.");
    }

    carryingEnergy()
    {
        throw new Error("Method not implemented.");
    }

    carryingMaxEnergy()
    {
        throw new Error("Method not implemented.");
    }

    say(message: any)
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

    clearBlocked()
    {
        throw new Error("Method not implemented.");
    }

    blocked(value?: object)
    {
        throw new Error("Method not implemented.");
    }

    incrementBlocked()
    {
        throw new Error("Method not implemented.");
    }

    clearPath()
    {
        throw new Error("Method not implemented.");
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

    setPosition(x: number, y: number)
    {
        this.position = new BotPosition(x, y);
    }
}
