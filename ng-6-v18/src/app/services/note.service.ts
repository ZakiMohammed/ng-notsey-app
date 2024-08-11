import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [];
  apiUrl = environment.apiUrl + 'notes';

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get<Note[]>(this.apiUrl).pipe(
      map((notes) => (this.notes = notes)),
      catchError(this.handleError)
    );
  }

  addNote(note: Note) {
    return this.http.post<Note>(this.apiUrl, note).pipe(
      map((newNote) => this.notes.push(newNote)),
      catchError(this.handleError)
    );
  }

  deleteNoteById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => this.notes = this.notes.filter((note) => note.id !== id)),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    alert(`Error Occurred: ${error.message}`);
    return error;
  }
}
