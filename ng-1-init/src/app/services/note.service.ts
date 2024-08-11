import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { notes as notesData } from '../data';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = notesData;

  constructor() { }
}
