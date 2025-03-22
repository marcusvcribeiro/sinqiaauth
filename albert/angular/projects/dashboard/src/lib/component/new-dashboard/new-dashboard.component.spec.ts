import { ButtonModule, InputModule } from '@albert/ui';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NewDashboardComponent } from './new-dashboard.component';


describe('NewDashboardComponent', () => {
  let component: NewDashboardComponent;
  let fixture: ComponentFixture<NewDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InputModule,
        ButtonModule,
        ReactiveFormsModule
      ],
      declarations: [
        NewDashboardComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve possuir Input e Button', () => {
    const input = fixture.debugElement.query(By.css('.input'));
    const button = fixture.debugElement.query(By.css('button'));

    expect(input.nativeElement).toBeTruthy();
    expect(button.nativeElement).toBeTruthy();
  });

  it('Deve emitir valor digitado', (done) => {
    component.dashboardName.subscribe(v => {
      expect(v).toBe('test');
      done();
    });

    component.form.get('dashboardName').setValue('test');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();
    fixture.detectChanges();
  });
});
