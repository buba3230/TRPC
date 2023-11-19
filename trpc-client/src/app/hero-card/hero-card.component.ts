import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IHero } from '../hero.interface';
import { HeroesService } from '../hero.service';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
@Input() hero: IHero | undefined;
@Output() deleteId: EventEmitter<string> = new EventEmitter();

constructor(private router: Router, private heroesService: HeroesService) {}

edit(id: string): void {
  this.router.navigate(['/detail', id]);
}

delete(id: string): void {
  this.deleteId.emit(id);
}
}
