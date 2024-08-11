import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ListComponent } from '../../components/list/list.component';
import { EmptyComponent } from '../../components/empty/empty.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent, ListComponent, EmptyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
