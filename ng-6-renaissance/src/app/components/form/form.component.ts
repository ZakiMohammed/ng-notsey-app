import { Component, OnDestroy } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { v4 as uuid } from 'uuid';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form',
    imports: [FormsModule],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent implements OnDestroy {
  content: string = '';
  private destroy$ = new Subject<void>();

  constructor(private noteService: NoteService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

    this.noteService
      .addNote(newNote)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.content = ''))
      )
      .subscribe();
  }
}
