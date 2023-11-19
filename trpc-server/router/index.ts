import { trpc } from "../trpc";
import { heroesRoter } from "./heroes";

export const appRouter = trpc.router({
    heroes: heroesRoter,
});
  
export type AppRouter = typeof appRouter;
