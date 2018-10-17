import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesListRoutingModule } from './favorites-list-routing.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ComponentsModule } from '../components/components.module';
import { FavoritesListComponent } from './favorites-list.component';

@NgModule({
  imports: [
    CommonModule,
    FavoritesListRoutingModule,
    FavoritesModule,
    ComponentsModule,
  ],
  declarations: [FavoritesListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FavoritesListModule { }
