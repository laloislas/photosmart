import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCutDocumentComponent } from './manual-cut-document.component';

describe('ManualCutDocumentComponent', () => {
  let component: ManualCutDocumentComponent;
  let fixture: ComponentFixture<ManualCutDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualCutDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCutDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
