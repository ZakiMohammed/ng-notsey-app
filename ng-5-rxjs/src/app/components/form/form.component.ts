import { Component, OnDestroy } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { v4 as uuid } from 'uuid';
import { LoaderService } from '../../services/loader.service';
import { finalize, Subject, takeLast, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnDestroy {
  content: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private noteService: NoteService,
    private loaderService: LoaderService
  ) {}

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

    this.loaderService.show();
    this.noteService
      .addNote(newNote)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loaderService.hide();
          this.content = '';
        })
      )
      .subscribe();
  }
}
