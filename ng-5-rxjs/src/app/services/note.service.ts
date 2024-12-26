import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  tap,
} from 'rxjs';
import { LoaderConstant } from '../constants/loader.constant';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes$ = new BehaviorSubject<Note[]>([]);
  apiUrl = environment.apiUrl + 'notes';

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getNotes(): Observable<Note[]> {
    this.loaderService.show(LoaderConstant.GET_NOTES);
    return this.http.get<Note[]>(this.apiUrl).pipe(
      tap((notes) => this.notes$.next(notes)),
      catchError(this.handleError),
      finalize(() => this.loaderService.hide(LoaderConstant.GET_NOTES))
    );
  }

  addNote(note: Note): Observable<Note> {
    this.loaderService.show(LoaderConstant.ADD_NOTE);
    return this.http.post<Note>(this.apiUrl, note).pipe(
      tap((newNote) => this.notes$.next([...this.notes$.value, newNote])),
      catchError(this.handleError),
      finalize(() => this.loaderService.hide(LoaderConstant.ADD_NOTE))
    );
  }

  deleteNoteById(id: string): Observable<void> {
    this.loaderService.show(LoaderConstant.DELETE_NOTE);
    return this.http.delete<Note>(`${this.apiUrl}/${id}`).pipe(
      tap(() =>
        this.notes$.next(this.notes$.value.filter((note) => note.id !== id))
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
