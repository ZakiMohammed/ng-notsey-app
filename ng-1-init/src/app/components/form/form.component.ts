import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { v4 as uuid } from 'uuid';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  content = '';

  constructor(private noteService: NoteService) {}

  add(event: Event) {
    event.preventDefault();

    if (!this.content) {
      alert('Please enter a note');
      return;
    }

    const newNote: Note = {
      id: uuid(),
      content: this.content,
    };

    this.noteService.notes.push(newNote);
    this.content = '';
  }
}
