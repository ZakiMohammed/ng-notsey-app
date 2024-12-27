import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
    selector: 'app-home',
    imports: [FormComponent, ListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
