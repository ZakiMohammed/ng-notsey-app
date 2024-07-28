import { Component } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private noteService: NoteService) {}

  get notes() {
    return this.noteService.notes;
  }

  set notes(value: Note[]) {
    this.noteService.notes = value;
  }

  onRemove(note: Note) {
    this.notes = this.notes.filter((n) => n.id !== note.id);
    console.log(this.noteService.notes);
  }
}
