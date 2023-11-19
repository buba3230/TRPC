import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, take, tap } from 'rxjs';
import { IHero } from '../hero.interface';
import { HeroesService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {
  id: string = '';
  hero$: Observable<IHero> = of({
    id: '',
    name: '',
    localized_name: '',
    type: ''
  });

  idControl: FormControl = new FormControl('');
  nameControl: FormControl = new FormControl('');
  localizedNameControl: FormControl = new FormControl('');
  typeControl: FormControl = new FormControl('');

  heroForm = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    localized_name: this.localizedNameControl,
    type: this.typeControl,
  })

  constructor(private heroesService: HeroesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id === '0') {
      this.hero$ = of({
        id: '',
        name: '',
        localized_name: '',
        type: ''
      }).pipe(tap(hero => {
        this.heroForm.get('id')?.patchValue(hero.id);
        this.heroForm.get('name')?.patchValue(hero.name);
        this.heroForm.get('localized_name')?.patchValue(hero.localized_name);
        this.heroForm.get('type')?.patchValue(hero.type);
      }));
    } else {
      this.hero$ = this.heroesService.getHeroById(this.id).pipe(tap(hero => {
        this.heroForm.get('id')?.patchValue(hero.id);
        this.heroForm.get('name')?.patchValue(hero.name);
        this.heroForm.get('localized_name')?.patchValue(hero.localized_name);
        this.heroForm.get('type')?.patchValue(hero.type);
      }));
    }
    
  }

  onSubmit() {
    if (this.id === '0') {
      this.heroesService.createHero(this.heroForm.value as IHero).pipe(take(1)).subscribe( () => {
        this.router.navigate(['/']);
      });
    } else {
      this.heroesService.updateHero(this.heroForm.value as IHero).pipe(take(1)).subscribe( (r) => {
        this.router.navigate(['/']);
      });
    }
    
  }
}
