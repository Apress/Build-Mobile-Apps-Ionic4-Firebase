import { Component, Input } from '@angular/core';
import { Items } from '../../models/items';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() items: Items;
}
