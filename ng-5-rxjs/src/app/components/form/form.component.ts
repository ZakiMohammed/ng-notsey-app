import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { v4 as uuid } from 'uuid';
import { LoaderService } from '../../services/loader.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  content: string = '';

  constructor(
    private noteService: NoteService,
    private loaderService: LoaderService
  ) {}

  onAdd(event: Event) {
    event.preventDefault();

    if (!this.content) {
      alert('Please fill the form');
      return;
    }

    const newNote: Note = {
      id: uuid(),
      content: this.content,
    };

    this.loaderService.show();
    this.noteService
      .addNote(newNote)
      .pipe(
        finalize(() => {
          this.loaderService.hide();
          this.content = '';
        })
      )
      .subscribe();
  }
}
