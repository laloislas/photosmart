import { FaceApiService } from './face-api.service';
import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class VideoPlayerService {
  cbAI: EventEmitter<any> = new EventEmitter<any>();

  constructor(private faceApiService: FaceApiService) {}

  public async getLandMark(videoElement: ElementRef) {
    const { globalFace } = this.faceApiService;
    if (videoElement) {
      const { videoWidth, videoHeight } = videoElement.nativeElement;
      const displaySize = { width: videoWidth, height: videoHeight };
      //console.log(displaySize);
      const detectionFaces = await globalFace
        .detectAllFaces(videoElement.nativeElement)
        .withFaceLandmarks()
        .withFaceExpressions();

      const landmark = detectionFaces[0]?.landmarks || null;
      const expressions = detectionFaces[0]?.expressions || null;
      const eyeLeft = landmark?.getLeftEye();
      const eyeRight = landmark?.getRightEye();
      const eyes = {
        left: [_.head(eyeLeft), _.last(eyeLeft)],
        right: [_.head(eyeRight), _.last(eyeRight)],
      };

      const resizeDetections = globalFace.resizeResults(
        detectionFaces,
        displaySize
      );
      this.cbAI.emit({
        resizeDetections,
        displaySize,
        expressions,
        eyes,
      });
    }
  }

  public isMovil() {
    if (
      navigator.userAgent.toLowerCase().match(/mobile/) ||
      navigator.userAgent.toLowerCase().match(/tablet/)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
