import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  constructor(
    private noteService: NoteService,
    private loaderService: LoaderService
  ) {}

  get notes() {
    return this.noteService.notes;
  }

  set notes(value: Note[]) {
    this.noteService.notes = value;
  }

  ngOnInit() {
    this.loaderService.show();
    this.noteService.getNotes().subscribe({
      next: (notes) => (this.notes = notes),
      error: (error) => alert(`Error Occured: ${error.message}`),
      complete: () => this.loaderService.hide(),
    });
  }

  onRemove(note: Note) {
    this.loaderService.show();
    this.noteService.deleteNoteById(note.id).subscribe({
      next: () => (this.notes = this.notes.filter((n) => n.id !== note.id)),
      error: (error) => alert(`Error Occured: ${error.message}`),
      complete: () => this.loaderService.hide(),
    });
  }
}
