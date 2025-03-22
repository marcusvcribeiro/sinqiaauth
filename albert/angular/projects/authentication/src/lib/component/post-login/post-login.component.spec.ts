import { LoaderModule } from '@albert/ui';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../../authentication.service';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { PostLoginComponent } from './post-login.component';

const mockService = {} as AuthenticationService;
describe('PostLoginComponent', () => {
  let component: PostLoginComponent;
  let fixture: ComponentFixture<PostLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostLoginComponent, LoadingPageComponent],
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
    fixture = TestBed.createComponent(PostLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir loading com texto : "Autenticando"', () => {
    const label = 'Autenticando';

    const description: HTMLElement = fixture.nativeElement.querySelector('.alb-loading-page');
    expect(description.textContent.trim()).toEqual(label);
  });
});
