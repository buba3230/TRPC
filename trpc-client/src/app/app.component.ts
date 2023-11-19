import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, take, tap } from 'rxjs';
import { HeroesService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  showOutlet: boolean;

  allHeroes$ = this.heroesService.updated$.pipe(
    switchMap(() => {
      return this.heroesService.getHeroes()
    })
  );

  constructor(private heroesService: HeroesService, private router: Router, private store: Store) {}

  createHero() {
    this.router.navigate(['/detail', 0]);
  }

  handleDeleteId(id: string): void {
    this.heroesService.deleteHeroById({ id }).pipe(take(1)).subscribe();
  }

  onActivate(event : any) {
    this.showOutlet = true;
  }

  onDeactivate(event : any) {
    this.showOutlet = false;
  }
}
