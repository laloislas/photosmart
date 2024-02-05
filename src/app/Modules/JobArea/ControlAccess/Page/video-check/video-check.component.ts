import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-video-check',
  templateUrl: './video-check.component.html',
  styleUrls: ['./video-check.component.scss'],
})
export class VideoCheckComponent implements OnInit, OnChanges {
  @Output() photo = new EventEmitter<any>();
  @Input() width: number = 400;
  @Input() time: number = 3;
  @Input() actionSection: boolean = true;

  @Input() height: number = 500;

  public instruction: string = 'Ingresar';
  public currentStream: any;
  public dimentions: any;
  public capturedImage: any;

  public cameraAllow: boolean = true; //El usuario permitio usar camara
  public scoreFace: boolean = false; //Se encontro un rostro alineado

  //Variables de contador
  public counter = 3; //Contador para tomar foto
  private conteo: any;
  private counting: boolean = false;

  constructor(private rendered2: Renderer2) {}

  ngOnInit(): void {
    this.checkMediaSource();
  }

  ngOnChanges() {
    //this.getSizeCam(this.containerClass);
    this.counter = this.time;
  }

  private checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .then((stream: any) => {
          this.currentStream = stream;
          this.cameraAllow = true;
        })
        .catch(() => {
          this.cameraAllow = false;
          this.instruction = 'El usuario no permitio usar la camara';
        });
    } else {
      this.cameraAllow = false;
      this.instruction = 'El usuario no cuenta con camara';
    }
  };

  private getSizeCam = (container: string) => {
    const elementCam: HTMLElement = document.querySelector('.' + container)!;
    const { width, height } = elementCam.getBoundingClientRect();
    console.log(width, height);
    this.dimentions = { width, height };
  };

  public getPhoto(data: any) {
    //console.log(data);
  }

  public foundFace(data: any) {
    this.scoreFace = data;
    if (this.scoreFace) {
      this.startCounter();
    } else {
      this.resetCounter();
    }
  }

  private takePicture() {
    const element: HTMLElement = document.querySelector('.video')!;
    html2canvas(element).then((canvas: any) => {
      this.capturedImage = canvas.toDataURL();
      console.log(this.capturedImage)
      if (!this.actionSection) {
        this.photo.emit(this.capturedImage);
      }
    });
  }

  private startCounter() {
    if (!this.counting && !this.capturedImage) {
      this.counting = true;
      this.conteo = setInterval(() => {
        if (this.counter <= 1) {
          this.stopCounter();
        }
        this.counter--;
      }, 1000);
    }
  }

  private stopCounter() {
    clearInterval(this.conteo);
    this.takePicture();
  }

  private resetCounter() {
    clearInterval(this.conteo);
    this.counting = false;
    this.counter = this.time;
  }

  public reintentCapture() {
    this.capturedImage = null;
    this.counting = false;
    this.counter = this.time;
  }

  public saveCapture() {
    this.photo.emit(this.capturedImage);
  }
}
