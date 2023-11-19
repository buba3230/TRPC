import { Injectable } from '@angular/core';
import { IHero } from './hero.interface';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';

import { AppRouter } from '../../../trpc-server/router';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';


const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8800/trpc',
    })
  ]
});

@Injectable()
export class HeroesService {
  updated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getHeroes(): Observable<IHero[]> {
    return from(trpcClient.heroes.all.query());
  }

  getHeroById(id: string): Observable<IHero> {
    const encodedURI = encodeURIComponent(JSON.stringify(id));
    return from(trpcClient.heroes.findById.query(id));
  }

  createHero(hero: IHero): Observable<any> {
    return from(trpcClient.heroes.create.mutate(hero)).pipe(
      tap(() => this.updated$.next(true))
    );
  }

  deleteHeroById(obj: { id: string }): Observable<any> {
    return from(trpcClient.heroes.deleteById.mutate(obj)).pipe(
      tap(() => this.updated$.next(true))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    return from(trpcClient.heroes.update.mutate(hero)).pipe(
      tap(() => this.updated$.next(true))
    );
  }
}