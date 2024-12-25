import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {
  constructor(private noteService: NoteService) {}

  get notes$() {
    return this.noteService.notes$;
  }
}
