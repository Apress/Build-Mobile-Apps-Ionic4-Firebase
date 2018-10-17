import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopStoriesRoutingModule } from './top-stories-routing.module';
import { TopStoriesComponent } from './top-stories.component';

import { reducers as topStoriesReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { TopStoriesEffects } from './effects/top-stories';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    TopStoriesRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('topStories', topStoriesReducers),
    EffectsModule.forFeature([TopStoriesEffects]),
  ],
  declarations: [TopStoriesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopStoriesModule { }
