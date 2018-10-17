import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as fromFavorites from '../favorites/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Items } from '../models/items';
import { Load } from '../favorites/actions/favorites';

@Component({
  selector: 'app-favorites-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  items$: Observable<Items>;

  constructor(private store: Store<fromFavorites.State>) {
    this.items$ = store.pipe(select(fromFavorites.getFavoriteItems));
  }

  ngOnInit() {
    this.store.dispatch(new Load());
  }
}
