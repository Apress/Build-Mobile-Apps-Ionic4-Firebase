import { Component, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() item: Item;
}
