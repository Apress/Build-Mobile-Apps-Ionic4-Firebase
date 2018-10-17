import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemsComponent } from './items/items.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { RouterModule } from '@angular/router';
import { FavoritesModule } from '../favorites/favorites.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FavoritesModule,
  ],
  exports: [ItemsComponent, CommentsComponent],
  declarations: [ItemComponent, ItemsComponent, CommentComponent, CommentsComponent, TimeAgoPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
