import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemListaComponent } from './elem-lista.component';

describe('ElemListaComponent', () => {
  let component: ElemListaComponent;
  let fixture: ComponentFixture<ElemListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElemListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElemListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
