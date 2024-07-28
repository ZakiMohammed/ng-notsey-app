import { Injectable } from '@angular/core';
import { notes as notesData } from '../data';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes = notesData;

  constructor() { }
}
