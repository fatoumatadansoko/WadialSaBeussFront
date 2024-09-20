import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {CarouselModule} from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CarouselModule,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WadialSaBeussFront';
}
