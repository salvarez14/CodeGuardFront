import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './page/header/header.component';
import { RegisterComponent } from './page/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, RegisterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CodeGuardFront';
}
