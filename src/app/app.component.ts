  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';
  import { Component } from '@angular/core';
  import { RouterLink, RouterOutlet } from '@angular/router';
  import { CarouselModule } from 'ngx-owl-carousel-o';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CarouselModule, HttpClientModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
    title = 'WadialSaBeussFront';
  }
