import {Component, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgbNav, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNavModule, RouterLink, NgbNav],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bootstrap';
  active: WritableSignal<number> = signal(1);

  constructor() {

  }
}
