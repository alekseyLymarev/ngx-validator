import { NgModule } from '@angular/core';
import { ValidatableDirective } from './directives/validatable/validatable.directive';
import { NgxValidatorDirective } from './directives/ngx-validator/ngx-validator.directive';

@NgModule({
  declarations: [ValidatableDirective, NgxValidatorDirective],
  imports: [],
  exports: [ValidatableDirective, NgxValidatorDirective],
})
export class NgxValidateHelperModule {}
