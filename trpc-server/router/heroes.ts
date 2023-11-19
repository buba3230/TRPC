import { trpc } from "../trpc";
import * as HeroesModel from '../models/heroes';
import z from 'zod';
import { Hero } from "../types/heroes";

export const heroesRoter = trpc.router({
    all: trpc.procedure.query(() => {
        return HeroesModel.all();
    }),
    findById: trpc.procedure.input(z.string()).query(({input}) => {
        return  HeroesModel.findById(input);
    }),
    create: trpc.procedure.input(Hero).mutation(({input}) => {
        return HeroesModel.create(input);
    }),
    deleteById: trpc.procedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
        return HeroesModel.deleteById(input.id)
    }),
    update: trpc.procedure.input(Hero).mutation(({ input}) => {
        return HeroesModel.update(input.id, {
            id: input.id,
            name: input.name,
            localized_name: input.localized_name,
            type: input.type
        })
    })
})
