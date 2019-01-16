import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmHomeComponent } from './bm-home.component';

describe('BmHomeComponent', () => {
  let component: BmHomeComponent;
  let fixture: ComponentFixture<BmHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
