import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes$ = new BehaviorSubject<Note[]>([]);
  apiUrl = environment.apiUrl + 'notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl).pipe(
      tap((notes) => this.notes$.next(notes)),
      catchError(this.handleError)
    );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note).pipe(
      tap((newNote) => this.notes$.next([...this.notes$.value, newNote])),
      catchError(this.handleError)
    );
  }

  deleteNoteById(id: string): Observable<void> {
    return this.http.delete<Note>(`${this.apiUrl}/${id}`).pipe(
      tap(() =>
        this.notes$.next(this.notes$.value.filter((note) => note.id !== id))
      ),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    alert(`Error Occurred: ${error.message}`);
    return of(error);
  }
}
