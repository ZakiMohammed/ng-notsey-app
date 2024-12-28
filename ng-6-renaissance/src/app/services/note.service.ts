import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note.model';
import { LoaderService } from './loader.service';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderConstant } from '../constants/loader.constant';
import { NoteApiService } from '../http/note-api.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes$ = signal<Note[]>([]);

  constructor(
    private loaderService: LoaderService,
    private noteApiService: NoteApiService
  ) {}

  getNotes(): Observable<Note[]> {
    this.loaderService.show(LoaderConstant.GET_NOTES);
    return this.noteApiService.getNotes().pipe(
      tap((notes) => this.notes$.set(notes)),
      catchError(this.handleError),
      finalize(() => this.loaderService.hide(LoaderConstant.GET_NOTES))
    );
  }

  addNote(note: Note): Observable<Note> {
    this.loaderService.show(LoaderConstant.ADD_NOTE);
    return this.noteApiService.addNote(note).pipe(
      tap((newNote) => this.notes$.set([...this.notes$(), newNote])),
      catchError(this.handleError),
      finalize(() => this.loaderService.hide(LoaderConstant.ADD_NOTE))
    );
  }

  deleteNoteById(id: string): Observable<void> {
    this.loaderService.show(LoaderConstant.DELETE_NOTE);
    return this.noteApiService.deleteNoteById(id).pipe(
      tap(() =>
        this.notes$.set(this.notes$().filter((note) => note.id !== id))
      ),
      catchError(this.handleError),
      finalize(() => this.loaderService.hide(LoaderConstant.DELETE_NOTE))
    );
  }

  handleError(error: any) {
    alert(`Error Occurred: ${error.message}`);
    return of(error);
  }
}
