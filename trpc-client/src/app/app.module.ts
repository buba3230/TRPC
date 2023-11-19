import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroCardComponent,
    HeroDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([])
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
