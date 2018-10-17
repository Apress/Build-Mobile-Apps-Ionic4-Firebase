import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';

const routes: Routes = [
  { path: 'top-stories', loadChildren: 'app/top-stories/top-stories.module#TopStoriesModule' },
  { path: 'comments/:id', loadChildren: 'app/comments/comments.module#CommentsModule' },
  { path: 'favorites', loadChildren: 'app/favorites-list/favorites-list.module#FavoritesListModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: '/top-stories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
