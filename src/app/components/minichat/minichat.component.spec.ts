import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinichatComponent } from './minichat.component';

describe('MinichatComponent', () => {
  let component: MinichatComponent;
  let fixture: ComponentFixture<MinichatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinichatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinichatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
