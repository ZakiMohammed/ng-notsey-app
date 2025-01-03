import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    standalone: false
})
export class FormComponent {
  content: string = '';

  constructor(private noteService: NoteService) {}

  onAdd(event: Event) {
    try {
      event.preventDefault();

      if (!this.content) {
        alert('Please fill the form');
        return;
      }

      const newNote: Note = {
        id: uuid(),
        content: this.content,
      };

      this.noteService.notes.push(newNote);
      
    } catch (error: any) {
      alert(`Error Occurred: ${error.message}`);
    } finally {
      this.content = '';
    }
  }
}
