import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutPhotoComponent } from './cut-photo.component';

describe('CutPhotoComponent', () => {
  let component: CutPhotoComponent;
  let fixture: ComponentFixture<CutPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CutPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
