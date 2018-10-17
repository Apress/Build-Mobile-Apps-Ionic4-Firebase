import { Component, Input, OnInit } from '@angular/core';
import * as fromFavorites from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Add, Remove } from '../../actions/favorites';

@Component({
  selector: 'app-favorite-toggle-container',
  templateUrl: './favorite-toggle-container.component.html',
  styleUrls: ['./favorite-toggle-container.component.scss']
})
export class FavoriteToggleContainerComponent implements OnInit {
  @Input() itemId: number;
  isLoggedIn$: Observable<boolean>;
  inFavorite$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromFavorites.State>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.inFavorite$ = this.store.pipe(select(fromFavorites.inFavorite(this.itemId)));
    this.loading$ = this.store.pipe(select(fromFavorites.getLoading(this.itemId)));
  }

  add() {
    this.store.dispatch(new Add(this.itemId));
  }

  remove() {
    this.store.dispatch(new Remove(this.itemId));
  }
}
