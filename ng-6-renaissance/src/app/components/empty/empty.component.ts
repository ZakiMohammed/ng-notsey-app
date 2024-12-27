import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {
  constructor(private noteService: NoteService) {}

  get notes$() {
    return this.noteService.notes$;
  }
}
