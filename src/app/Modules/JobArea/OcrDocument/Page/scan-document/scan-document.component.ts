import { Component, OnInit } from '@angular/core';
declare var loadImage: any;
@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.component.html',
  styleUrls: ['./scan-document.component.scss'],
})
export class ScanDocumentComponent implements OnInit {
  public imagen: string = '';
  constructor() {}

  ngOnInit(): void {}

  public getImagen(data: any) {
    console.log(data);
    loadImage();
  }
}
