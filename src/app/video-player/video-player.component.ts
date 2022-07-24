import { VideoPlayerService } from './../video-player.service';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FaceApiService } from './../face-api.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement: ElementRef | any;
  @Input() stream: any;
  @Input() width: any;
  @Input() height: any;
  public modelsReady: boolean = false;
  overcanvas: any;
  constructor(
    private rendered2: Renderer2,
    private elementRef: ElementRef,
    private faceApiService: FaceApiService,
    private videoPlayerService: VideoPlayerService
  ) {}

  private listEvent: Array<any> = [];

  ngOnInit(): void {
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
          this.drawFace(resizeDetections, displaySize, eyes);
        }
      }
    );

    this.listEvent = [observer1$, observer2$];
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
    }, 100);
  }

  public loadMetaData() {
    this.videoElement.nativeElement.play();
  }
  public listenerPlay() {
    const { globalFace } = this.faceApiService;
    let { left, top } = this.videoElement.nativeElement.getBoundingClientRect(); //Obtenemos la posicion del video
    this.overcanvas = globalFace.createCanvasFromMedia(
      this.videoElement.nativeElement
    );
    this.rendered2.setProperty(this.overcanvas, 'id', 'new-canvas-over');
    this.rendered2.setStyle(this.overcanvas, 'width', `${this.width}px`);
    this.rendered2.setStyle(this.overcanvas, 'height', `${this.height}px`);
    this.rendered2.setStyle(this.overcanvas, 'position', 'absolute');
    this.rendered2.appendChild(this.elementRef.nativeElement, this.overcanvas);
  }
}
