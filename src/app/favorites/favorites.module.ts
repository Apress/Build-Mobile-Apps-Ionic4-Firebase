import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesService } from './services/favorites.service';
import { reducer } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from './effects/favorites';
import { FavoriteToggleComponent } from './components/favorite-toggle/favorite-toggle.component';
import { FavoriteToggleContainerComponent } from './components/favorite-toggle-container/favorite-toggle-container.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('favorites', reducer),
    EffectsModule.forFeature([FavoritesEffects]),
  ],
  declarations: [FavoriteToggleComponent, FavoriteToggleContainerComponent],
  exports: [FavoriteToggleContainerComponent],
  providers: [FavoritesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavoritesModule { }
