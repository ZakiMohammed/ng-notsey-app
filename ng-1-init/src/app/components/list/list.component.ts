import { Component } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
    this.notes = this.noteService.notes;
  }

  remove(note: Note) {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.notes = this.notes;
  }
}
