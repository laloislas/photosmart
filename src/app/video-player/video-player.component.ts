import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef | any;
  @Input() stream: any;
  @Input() width: any;
  @Input() height: any;

  constructor(private rendered2: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {}

  public loadMetaData() {
    this.videoElement.nativeElement.play();
  }
  public listenerPlay() {}
}
