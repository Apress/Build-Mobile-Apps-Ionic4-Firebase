import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss']
})
export class FavoriteToggleComponent {
  @Input() itemId: number;
  @Input() inFavorite: boolean;
  @Input() loading: boolean;
  @Output() toAdd = new EventEmitter<number>();
  @Output() toRemove = new EventEmitter<number>();

  constructor() { }

  add() {
    this.toAdd.emit(this.itemId);
  }

  remove() {
    this.toRemove.emit(this.itemId);
  }
}
