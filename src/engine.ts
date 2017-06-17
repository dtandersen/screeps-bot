"use strict";

import {Component, UberBot} from "./entity.bot";
import {World} from "./entity.world";

export class Engine
{
    private systems: ScreepsSystem[] = [];

    register(system: ScreepsSystem)
    {
        this.systems.push(system);
    }

    run()
    {
        for (let system of this.systems)
        {
            system.process();
        }
    }
}

export abstract class ScreepsSystem
{
    abstract process(): void;
}

export abstract class ScreepsEntitySystem implements ScreepsSystem
{
    constructor(readonly resolver: EntityResolver)
    {
    }

    process(): void
    {
        for (let bot of this.resolver.getEntities())
        {
            this.processEntity(bot);
        }
    }

    abstract processEntity(bot: UberBot): void;
}

export class EntityResolver
{
    constructor(readonly world: World, readonly filter: { new(): Component }[])
    {
    }

    getEntities(): UberBot[]
    {
        let entities: UberBot[] = [];

        let allBots = this.world.getEntities();
        for (let key in allBots)
        {
            let bot = allBots[key];
            for (let componentName of this.filter)
            {
                if (bot.hasComponent(componentName))
                {
                    entities.push(bot);
                }
            }
        }

        return entities;
    }
}
