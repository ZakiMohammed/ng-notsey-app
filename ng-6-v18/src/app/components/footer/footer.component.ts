import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year = new Date().getFullYear();

  constructor(private router: Router) {}

  gotoAbout() {
    this.router.navigate(['/about']);
  }
}