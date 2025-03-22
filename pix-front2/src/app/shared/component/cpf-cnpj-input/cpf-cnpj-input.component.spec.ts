import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfCnpjInputComponent } from './cpf-cnpj-input.component';
import { By } from '@angular/platform-browser';
import { UiModule } from '@albert/ui';

describe('CpfCnpjInputComponent', () => {
  let component: CpfCnpjInputComponent;
  let fixture: ComponentFixture<CpfCnpjInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [ CpfCnpjInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfCnpjInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // CPF
  const casosValorMenorOnze = [
    {
      valor: '111',
      esperado: '111'
    },
    {
      valor: '111111',
      esperado: '111.111'
    },
    {
      valor: '1111111',
      esperado: '111.111.1'
    },
    {
      valor: '11111111',
      esperado: '111.111.11'
    },
    {
      valor: '111111111',
      esperado: '111.111.111'
    },
    {
      valor: '1111111111',
      esperado: '111.111.111-1'
    },
    {
      valor: '11111111111',
      esperado: '111.111.111-11'
    },

  ];

  casosValorMenorOnze.forEach((caso) => {
    it(`Deve setar mascara de cpf quando valor de tamanho ${caso.valor.length} é setado no input`, () => {
      component.value = caso.valor;

      fixture.detectChanges();

      const valorInput = fixture.debugElement.query(By.css('input')).nativeElement.value;

      expect(component.mask).toEqual({ mask: '000.000.000-00' });
      expect(valorInput).toBe(caso.esperado);
    });
  });

  // CNPJ
  const casosValorMaiorOnze = [
    {
      valor: '111111111111',
      esperado: '11.111.111/1111'
    },
    {
      valor: '1111111111111',
      esperado: '11.111.111/1111-1'
    },
    {
      valor: '11111111111111',
      esperado: '11.111.111/1111-11'
    },
  ];

  casosValorMaiorOnze.forEach((caso) => {
    it(`Deve setar mascara de cpnj quando valor de tamanho de ${caso.valor.length} é setado no input`, () => {
      component.value = caso.valor;

      fixture.detectChanges();

      const valorInput = fixture.debugElement.query(By.css('input')).nativeElement.value;

      expect(component.mask).toEqual({ mask: '00.000.000/0000-00' });
      expect(valorInput).toBe(caso.esperado);
    });
  });

});
