import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FaceApiService } from './../../Services/face-api.service';
import html2canvas from 'html2canvas';
import { VideoPlayerService } from '../../Services/video-player.service';
@Component({
  selector: 'ngx-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement: ElementRef | any;
  @Input() stream: any;
  @Input() width: any;
  @Input() height: any;
  @Input() onlyMovil?: Boolean = false;
  @Output() foundFace = new EventEmitter<boolean>();

  public modelsReady: boolean = false; //Bandera para indicar si los modelos se han cargado

  overcanvas: any;
  public videoPlayerView: Boolean = true;
  public colorScore: boolean = false; //Indicador si hay un rostro y centrado

  //Variables para tomar fotografia
  public startTakePhoto: boolean = false;
  public photo: any;
  public capturedImage: any;

  private listEvent: Array<any> = [];

  constructor(
    private rendered2: Renderer2,
    private elementRef: ElementRef,
    private faceApiService: FaceApiService,
    private videoPlayerService: VideoPlayerService
  ) {}

  ngOnInit(): void {
    if (this.onlyMovil) {
      this.videoPlayerView = this.videoPlayerService.isMovil();
    }
  }

  ngAfterViewInit() {
    this.listenerEvents();
  }

  ngOnDestroy(): void {
    this.listEvent.forEach((event) => event.unsubscribe());
  }

  private listenerEvents() {
    const observer1$ = this.faceApiService.cbModels.subscribe((res: any) => {
      this.modelsReady = true;
      console.log('Modelos cargados');
      this.checkFace();
    });

    const observer2$ = this.videoPlayerService.cbAI.subscribe(
      ({ resizeDetections, displaySize, expressions, eyes }) => {
        resizeDetections = resizeDetections[0] || null;
        //Revisamos que haya un rostro
        if (resizeDetections) {
          const withFrame = resizeDetections.alignedRect._box;
          this.colorScore = this.getColorScore(
            resizeDetections.detection._score,
            withFrame
          );
          this.foundFace.emit(this.colorScore);
          this.drawFace(resizeDetections, displaySize, eyes);
        }
      }
    );

    this.listEvent = [observer1$, observer2$];
  }

  private takePicture() {
    if (!this.capturedImage) {
      this.startTakePhoto = true;
      const element: HTMLElement = document.querySelector('.video')!;
      html2canvas(element).then((canvas: any) => {
        this.capturedImage = canvas.toDataURL();
        console.log('canvas.toDataURL() -->' + this.capturedImage);
      });
    }
  }

  private getColorScore(score: any, mark: any): boolean {
    if (score > 0.9) {
      if (this.checkFaceInsideFrame(mark)) {
        return true;
      }
    }
    return false;
  }

  private checkFaceInsideFrame_old(marks: any): Boolean {
    const element: HTMLElement = document.querySelector(
      '.videoCheck__container__video'
    )!;
    const padre: HTMLElement = document.querySelector(
      '.videoCheck__container'
    )!;

    let coordenadasPadre = padre.getBoundingClientRect(); //Obtenemos del marco padre (FP)
    let coordenadas = element.getBoundingClientRect(); //Obtenemos del marco redondeado(FA)

    //Obtenemos coordenadas absolutas de marco (FA)
    /*
        a-------------b
        |             |
        |             |
        |             |
        c-------------d
      */

    const FAAX = coordenadas.left - coordenadasPadre.left;
    const FAAY = coordenadas.top - coordenadasPadre.top;
    const FA = {
      a: {
        x: FAAX,
        y: FAAY,
      },
      b: {
        x: FAAX + coordenadas.width,
        y: FAAY,
      },
      c: {
        x: FAAX,
        y: FAAY + coordenadas.height,
      },
      d: {
        x: FAAX + coordenadas.width,
        y: FAAY + coordenadas.height,
      },
    };

    const FB = {
      a: {
        x: marks._x,
        y: marks._y,
      },
      b: {
        x: marks._x + marks._width / 2,
        y: marks._y,
      },
      c: {
        x: marks._x,
        y: marks._y + marks._height / 2,
      },
      d: {
        x: marks._x + marks._width / 2,
        y: marks._y + marks._height / 2,
      },
    };

    //Revisamos si no sale a la izquierda
    if (FA.a.x < FB.a.x) {
      //Revisamos si no sale por arriba
      if (FA.a.y < FB.a.y) {
        //Revisamos si no sale a la derecha
        if (FA.b.x > FB.b.x) {
          //Revisamos si no sale por abajo

          if (FA.c.y > FB.c.y) {
            //Revisamos si no sale por abajo
            return true;
          }
        }
      }
    }

    return false;
  }

  private checkFaceInsideFrame(marks: any): Boolean {
    const element: HTMLElement = document.querySelector(
      '.videoCheck__container__video'
    )!;
    const padre: HTMLElement = document.querySelector('.video')!;

    let coordenadasPadre = padre.getBoundingClientRect(); //Obtenemos del marco padre (FP)
    let coordenadas = element.getBoundingClientRect(); //Obtenemos del marco redondeado(FA)

    //Obtenemos coordenadas absolutas de marco (FA)
    /*
        a-------------b
        |             |
        |             |
        |             |
        c-------------d
      */

    const FAAX = coordenadas.left - coordenadasPadre.left;
    const FAAY = coordenadas.top - coordenadasPadre.top;
    const FA = {
      a: {
        x: FAAX,
        y: FAAY,
      },
      b: {
        x: FAAX + coordenadas.width,
        y: FAAY,
      },
      c: {
        x: FAAX,
        y: FAAY + coordenadas.height,
      },
      d: {
        x: FAAX + coordenadas.width,
        y: FAAY + coordenadas.height,
      },
    };

    const FB = {
      a: {
        x: marks._x,
        y: marks._y,
      },
      b: {
        x: marks._x + marks._width,
        y: marks._y,
      },
      c: {
        x: marks._x,
        y: marks._y + marks._height,
      },
      d: {
        x: marks._x + marks._width / 2,
        y: marks._y + marks._height / 2,
      },
    };

    //Revisamos si no sale a la izquierda
    if (FA.a.x < FB.a.x) {
      //Revisamos si no sale por arriba
      if (FA.a.y < FB.a.y) {
        //Revisamos si no sale a la derecha
        if (FA.b.x > FB.b.x) {
          //Revisamos si no sale por abajo

          if (FA.c.y > FB.c.y) {
            //Revisamos si no sale por abajo
            return true;
          }
        }
      }
    }

    return false;
  }

  private drawFace(resizeDetections: any, displaySize: any, eyes: any) {
    const { globalFace } = this.faceApiService;
    this.overcanvas
      .getContext('2d')
      .clearRect(0, 0, displaySize.width, displaySize.height);
    globalFace.draw.drawDetections(this.overcanvas, resizeDetections);
  }

  public checkFace() {
    setInterval(async () => {
      await this.videoPlayerService.getLandMark(this.videoElement);
    }, 50);
  }

  public loadMetaData() {
    this.videoElement.nativeElement.play();
  }

  public listenerPlay() {
    const { globalFace } = this.faceApiService;
    let { left, top } = this.videoElement.nativeElement.getBoundingClientRect(); //Obtenemos la posicion del video
    console.log(left, top);
    this.overcanvas = globalFace.createCanvasFromMedia(
      this.videoElement.nativeElement
    );
    this.rendered2.setProperty(this.overcanvas, 'id', 'new-canvas-over');
    this.rendered2.setStyle(this.overcanvas, 'width', `${this.width/2}px`);
    this.rendered2.setStyle(this.overcanvas, 'height', `${this.height}px`);
    this.rendered2.setStyle(this.overcanvas, 'position', 'absolute');
    this.rendered2.setStyle(this.overcanvas, 'display', 'none');
    this.rendered2.appendChild(this.elementRef.nativeElement, this.overcanvas);
  }
}
