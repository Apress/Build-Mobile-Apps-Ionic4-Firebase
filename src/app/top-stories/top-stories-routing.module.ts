import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopStoriesComponent } from './top-stories.component';

const routes: Routes = [
  { path: '', component: TopStoriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopStoriesRoutingModule { }
