import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrl: './item.component.scss',
    standalone: false
})
export class ItemComponent {
  @Input({ required: true }) note!: Note;
  @Output() onRemove = new EventEmitter<Note>();

  remove() {
    this.onRemove.emit(this.note);
  }
}
