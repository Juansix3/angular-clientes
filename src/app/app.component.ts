import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // 👈 AÑADIR RouterModule
import { ClientFormComponent } from './client-form/client-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,         // 👈 IMPORTANTE para routerLinkActiveOptions
    ClientFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nombre-del-proyecto';
}
