import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'photo-smart';
  public currentStream: any;
  public dimentions: any;
  ngOnInit() {
    this.checkMediaSource();
    this.getSizeCam();
  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .then((stream: any) => {
          this.currentStream = stream;
        })
        .catch(() => {
          console.log('No dio permisos');
        });
    } else {
      console.log('No tienes camara');
    }
  }; //Revisamos permisos y que podemos usar video

  private getSizeCam = () => {
    const elementCam: HTMLElement = document.querySelector('.cam')!;
    const { width, height } = elementCam.getBoundingClientRect();
    console.log(width, height);
    this.dimentions = { width, height };
  };
}
