import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    standalone: false
})
export class ListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private noteService: NoteService) {}

  get notes$() {
    return this.noteService.notes$;
  }

  ngOnInit() {
    this.noteService.getNotes().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemove(note: Note) {
    this.noteService
      .deleteNoteById(note.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
