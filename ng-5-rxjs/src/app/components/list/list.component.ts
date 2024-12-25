import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { LoaderService } from '../../services/loader.service';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private noteService: NoteService,
    private loaderService: LoaderService
  ) {}

  get notes$() {
    return this.noteService.notes$;
  }

  ngOnInit() {
    this.loaderService.show();
    this.noteService
      .getNotes()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemove(note: Note) {
    this.loaderService.show();
    this.noteService
      .deleteNoteById(note.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }
}
