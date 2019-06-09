import {NgxValidatorDirective} from '../ngx-validator/ngx-validator.directive';
import {
  Directive,
  OnInit,
  ContentChildren,
  ViewChild,
  ViewChildren,
  QueryList,
  Optional,
  Self,
  Host,
  AfterViewInit,
} from '@angular/core';
import {
  NgControl,
  FormControl,
  FormControlName,
  FormControlDirective,
} from '@angular/forms';

@Directive({
  selector: '[ngxValidatable]',
})
export class ValidatableDirective implements OnInit, AfterViewInit {
  @ContentChildren(NgControl) controls: QueryList<NgControl>;
  @ContentChildren(NgxValidatorDirective) validatorItems: QueryList<NgxValidatorDirective>;

  ngAfterViewInit(): void {
    this.controls.forEach((control: NgControl) => {
      control.valueChanges.subscribe((data) => {
        this.toggleAllValidatorItems(control);
      });
    });
  }

  public toggleAllValidatorItems(control: NgControl) {
    this.validatorItems.forEach((validatorItem: NgxValidatorDirective) => {
      if (validatorItem.validator) {
        this.ToggleValidateItem(validatorItem, control);
      }
    });
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  private ToggleValidateItem(validatorItem: NgxValidatorDirective, control: NgControl) {
    if (control && control.dirty) {
      const error = control.getError(validatorItem.validator.toLowerCase());
      if (error) {
        validatorItem.showError(error);
      } else {
        validatorItem.hideErrors();
      }
    }
  }
}
