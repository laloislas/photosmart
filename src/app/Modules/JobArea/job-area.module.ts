import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCheckComponent } from './ControlAccess/Page/video-check/video-check.component';
import { VideoPlayerComponent } from './ControlAccess/Components/video-player/video-player.component';
import { OcrDocumentComponent } from './OcrDocument/Page/ocr-document/ocr-document.component';
import { ScanDocumentComponent } from './OcrDocument/Page/scan-document/scan-document.component';
import { TakePhotoComponent } from './OcrDocument/Components/take-photo/take-photo.component';
import { ShowPhotoComponent } from './OcrDocument/Components/show-photo/show-photo.component';
import { CutPhotoComponent } from './OcrDocument/Components/cut-photo/cut-photo.component';
import {WebcamModule} from 'ngx-webcam';
import { ManualCutDocumentComponent } from './OcrDocument/Components/manual-cut-document/manual-cut-document.component';

@NgModule({
  declarations: [
    VideoCheckComponent,
    VideoPlayerComponent,
    OcrDocumentComponent,
    ScanDocumentComponent,
    TakePhotoComponent,
    ShowPhotoComponent,
    CutPhotoComponent,
    ManualCutDocumentComponent,
  ],
  imports: [CommonModule,WebcamModule],
  exports: [VideoCheckComponent, ScanDocumentComponent],
})
export class JobAreaModule {}
