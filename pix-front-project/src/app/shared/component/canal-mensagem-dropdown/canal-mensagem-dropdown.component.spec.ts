import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiModule } from '@albert/ui';
import { CanalMensagemDropdownComponent } from './canal-mensagem-dropdown.component';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
const translateServiceSpy = jasmine.createSpyObj(
  'TranslateService',
  [
    'instant',
    'get'
  ],
  {
    'onTranslationChange': of({}),
    'onLangChange': of({}),
    'onDefaultLangChange': of({})
  }
);
translateServiceSpy.get.and.returnValue(of('abc'));
fdescribe('CanalMensagemDropdownComponent', () => {
  let component: CanalMensagemDropdownComponent;
  let fixture: ComponentFixture<CanalMensagemDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [CanalMensagemDropdownComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalMensagemDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
