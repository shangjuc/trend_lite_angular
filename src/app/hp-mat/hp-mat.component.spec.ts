import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpMatComponent } from './hp-mat.component';

describe('HpMatComponent', () => {
  let component: HpMatComponent;
  let fixture: ComponentFixture<HpMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
