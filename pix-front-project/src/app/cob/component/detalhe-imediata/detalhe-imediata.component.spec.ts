import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheImediataComponent } from './detalhe-imediata.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultaCobrancaRoutingModule } from '../../consulta-cobranca-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegurancaModule } from 'src/app/seg/seguranca.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

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

fdescribe('DetalheImediataComponent', () => {
  let component: DetalheImediataComponent;
  let fixture: ComponentFixture<DetalheImediataComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ConsultaCobrancaRoutingModule, FormsModule, ReactiveFormsModule,
        SegurancaModule, NoopAnimationsModule],
      declarations: [DetalheImediataComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheImediataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
