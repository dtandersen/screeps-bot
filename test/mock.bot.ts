import {BotPosition} from "../src/entity.position";
import {BaseBot, Component} from "../src/entity.bot";

export class MockBot implements BaseBot {
    private component: Component;
    public movingTo: BotPosition;
    private position: BotPosition;

    addComponent(component: Component): void {
        this.component = component;
    }

    getComponent<T extends Component>(): T {
        return <T>this.component;
    }

    deleteComponent(): void {
        // this.component = null;
        delete this.component;
    }

    name() {
        throw new Error("Method not implemented.");
    }

    memory(variable: string, value?: object) {
        throw new Error("Method not implemented.");
    }

    propertyUndefined(variable: any) {
        throw new Error("Method not implemented.");
    }

    clearMemory(variable: any) {
        throw new Error("Method not implemented.");
    }

    carryingEnergy() {
        throw new Error("Method not implemented.");
    }

    carryingMaxEnergy() {
        throw new Error("Method not implemented.");
    }

    say(message: any) {
        throw new Error("Method not implemented.");
    }

    moveTo(target: any) {
        throw new Error("Method not implemented.");
    }

    moveToXY(x: number, y: number): number {
        this.movingTo = new BotPosition(x, y);

        return 0;
    }

    isNear(x: number, y: number, radius = 0): boolean {
        let dx = Math.abs(x - this.position.x);
        let dy = Math.abs(y - this.position.y);

        return dx <= radius && dy <= radius;
    }

    clearBlocked() {
        throw new Error("Method not implemented.");
    }

    blocked(value?: object) {
        throw new Error("Method not implemented.");
    }

    incrementBlocked() {
        throw new Error("Method not implemented.");
    }

    clearPath() {
        throw new Error("Method not implemented.");
    }

    harvest(target: any) {
        throw new Error("Method not implemented.");
    }

    transferEnergy(target: any) {
        throw new Error("Method not implemented.");
    }

    findClosestByPath(type: any) {
        throw new Error("Method not implemented.");
    }

    setPosition(x: number, y: number) {
        this.position = new BotPosition(x, y);
    }
}
