import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDocumentComponent } from './ocr-document.component';

describe('OcrDocumentComponent', () => {
  let component: OcrDocumentComponent;
  let fixture: ComponentFixture<OcrDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcrDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
