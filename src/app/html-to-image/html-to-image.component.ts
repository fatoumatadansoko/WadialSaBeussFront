import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-html-to-image',
  standalone: true,
  imports: [],
  templateUrl: './html-to-image.component.html',
  styleUrl: './html-to-image.component.scss'
})
export class HtmlToImageComponent {
  @ViewChild('htmlContent', { static: false }) htmlContent!: ElementRef;

  ngOnInit(): void {
    this.autoClick();
  }

  autoClick(): void {
    const downloadLink = document.getElementById('download');
    if (downloadLink) {
      downloadLink.click();
    }
  }

  downloadImage(): void {
    const element = this.htmlContent.nativeElement;

    html2canvas(element).then((canvas) => {
      const imageData = canvas.toDataURL("image/jpg");
      const newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
      const downloadLink = document.getElementById('download') as HTMLAnchorElement;
      downloadLink.download = 'image.jpg';
      downloadLink.href = newData;
    });
  }


}
