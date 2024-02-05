import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ba-manual-cut-document',
  templateUrl: './manual-cut-document.component.html',
  styleUrls: ['./manual-cut-document.component.scss'],
})
export class ManualCutDocumentComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas')
  canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  constructor() {}

  ngOnInit(): void {}

  draw(x: any, y: any) {
    const context = this.canvas.getContext;
    const centerX = x;
    const centerY = y;
    const radius = 10;
    context.beginPath();
    context.fillStyle = '#0077aa';
    context.strokeStyle = '#0077aa47';
    context.lineWidth = 2;

    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }

  showCoords(event: any) {
    var x = event.clientX;
    var y = event.clientY;
    var coor = 'X: ' + x + ', Y: ' + y;
    this.draw(x, y);
    console.log(coor);
  }
}
