import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalError } from './global-error';

describe('GlobalErrorService', () => {
  let component: GlobalError;
  let fixture: ComponentFixture<GlobalError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
