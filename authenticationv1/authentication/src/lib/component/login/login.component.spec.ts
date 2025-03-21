import { LoaderModule } from '@albert/ui';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../../authentication.service';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { LoginComponent } from './login.component';

const mockService = { login: () => null } as AuthenticationService;
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, LoadingPageComponent],
      providers: [
        { provide: AuthenticationService, useValue: mockService }
      ],
      imports: [
        LoaderModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir loading com texto : "Carregando"', () => {
    const label = 'Carregando';

    const description: HTMLElement = fixture.nativeElement.querySelector('.alb-loading-page');
    expect(description.textContent.trim()).toEqual(label);
  });
});
