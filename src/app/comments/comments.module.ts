import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsListComponent } from './comments-list.component';
import { ComponentsModule } from '../components/components.module';
import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommentsEffects } from './effects/comments';

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('comments', reducers),
    EffectsModule.forFeature([CommentsEffects]),
  ],
  declarations: [CommentsListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommentsModule { }
