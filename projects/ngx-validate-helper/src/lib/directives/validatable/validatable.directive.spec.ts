import {Component, DebugElement, OnInit} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {ValidatableDirective} from './validatable.directive';

describe('ValidatableDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputElEmail: DebugElement;
  let inputElPassword: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ValidatableDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputElEmail = fixture.debugElement.query(By.css('#email_control'));
  });

  it('should create an instance', () => {
    const directive = new ValidatableDirective();
    expect(directive).toBeTruthy();
  });

  it('should show required error if input value is empty', () => {
    component.form.patchValue({email: 'aleksey'});
    component.form.patchValue({email: ''});
  });
});

const messages = {
  email: {
    required: 'Вы не ввели email',
    email: 'email не соответствует паттерну'
  },
  password: {
    required: 'Вы не ввели пароль',
    minLength: 'Минимальная длинна пароля 8 символов',
    maxLength: 'Максимальная длинна пароля 16 символов'
  }
};

@Component({
  template: `
    <form [formGroup]="form">
      <div ngxValidatable>
        <input type="email" formControlName="email" id="email_control">
        <div *ngxValidator="'required'" id="email_required">${messages.email.required}</div>
        <div *ngxValidator="'email'" id="email_email">${messages.email.email}</div>
      </div>
      <div ngxValidatable>
        <input type="password" formControlName="password" id="password_control">
        <div *ngxValidator="'required'" id="password_required">${messages.password.required}</div>
        <div *ngxValidator="'maxLength'" id="password_max-length">${messages.password.maxLength}</div>
        <div *ngxValidator="'minLength'"  id="password_min-length">${messages.password.minLength}</div>
      </div>
    </form>
  `
})
export class TestComponent implements OnInit {
  public form: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }


}
