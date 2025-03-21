import { LoaderModule } from '@albert/ui';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../../authentication.service';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { PostLogoutComponent } from './post-logout.component';

const mockService = {} as AuthenticationService;
describe('PostLogoutComponent', () => {
  let component: PostLogoutComponent;
  let fixture: ComponentFixture<PostLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostLogoutComponent, LoadingPageComponent],
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
    fixture = TestBed.createComponent(PostLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir loading com texto : "Saindo"', () => {
    const label = 'Saindo';

    const description: HTMLElement = fixture.nativeElement.querySelector('.alb-loading-page');
    expect(description.textContent.trim()).toEqual(label);
  });
});
