import { Component } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { LoaderService } from '../../services/loader.service';
import { finalize } from 'rxjs';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
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
