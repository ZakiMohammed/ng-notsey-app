import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { LoaderService } from '../../services/loader.service';
import { finalize } from 'rxjs';

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

  ngOnInit() {
    this.loaderService.show();
    this.noteService
      .getNotes()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe();
  }

  onRemove(note: Note) {
    this.loaderService.show();
    this.noteService
      .deleteNoteById(note.id)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe();
  }
}
