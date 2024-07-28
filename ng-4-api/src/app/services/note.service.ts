import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [];
  apiUrl = environment.apiUrl + 'notes';

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: Note) {
    return this.http.post(this.apiUrl, note);
  }

  deleteNoteById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
